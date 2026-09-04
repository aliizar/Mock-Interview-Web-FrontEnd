/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Bot,
    Clock,
    Mic,
    MicOff,
    Send,
    LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import {
    endInterview,
    evaluateInterview,
    submitInterviewAnswer,
} from "../api/interview.api";
import { useAuthStore } from "../stores/auth.store";

interface Interview {
    id: number;
    role: string;
    difficulty: string;
    interviewType: string;
    duration: number;
    startedAt: string;
    status: string;
}

interface InterviewQuestion {
    id: number;
    questionNumber: number;
    question: string;
    type: string;
}

interface LocationState {
    interview: Interview;
    question: InterviewQuestion;
}

const FAILURE_MESSAGE =
    "Sorry for the inconvenience. Your interview could not be completed. Please try again later.";

export default function StartInterview() {
    const location = useLocation();
    const navigate = useNavigate();

    const { token } = useAuthStore();

    const state = location.state as LocationState | null;

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const recognitionRef = useRef<any>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const finishingRef = useRef(false);

    const [currentQuestion, setCurrentQuestion] =
        useState<InterviewQuestion | null>(
            state?.question || null,
        );

    const [answer, setAnswer] = useState("");
    const [listening, setListening] = useState(false);
    const [time, setTime] = useState(
        state?.interview.duration
            ? state.interview.duration * 60
            : 0,
    );
    const [cameraReady, setCameraReady] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [finishing, setFinishing] = useState(false);
    const [failed, setFailed] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!state?.interview || !state?.question) {
            navigate("/interview", { replace: true });
        }
    }, [state, navigate]);

    const finishInterview = useCallback(async () => {
        if (!state?.interview || !token) {
            setFailed(true);
            setError(FAILURE_MESSAGE);
            return;
        }

        if (finishingRef.current) {
            return;
        }

        try {
            finishingRef.current = true;

            setFinishing(true);
            setError("");

            window.speechSynthesis.cancel();
            recognitionRef.current?.stop();
            recognitionRef.current = null;
            setListening(false);

            await endInterview(state.interview.id);

            navigate(`/interviews/${state.interview.id}`, {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Failed to finish interview:",
                error,
            );

            setFailed(true);
            setError(FAILURE_MESSAGE);

            finishingRef.current = false;
            setFinishing(false);
        }
    }, [state, token, navigate]);

    useEffect(() => {
        if (
            !state?.interview ||
            finishing ||
            failed ||
            submitting
        ) {
            return;
        }

        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [
        state?.interview,
        finishing,
        failed,
        submitting,
        finishInterview,
    ]);

    useEffect(() => {
        async function startCamera() {
            try {
                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true,
                    });

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                setCameraReady(true);
            } catch (error) {
                console.error(
                    "Camera permission denied:",
                    error,
                );
            }
        }

        startCamera();

        return () => {
            streamRef.current?.getTracks().forEach((track) =>
                track.stop(),
            );
        };
    }, []);

    useEffect(() => {
        if (!currentQuestion || failed) {
            return;
        }

        const speech = new SpeechSynthesisUtterance(
            currentQuestion.question,
        );

        speech.rate = 0.9;
        speech.pitch = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [currentQuestion, failed]);

    function startListening() {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError(
                "Speech recognition is not supported. Please use Chrome.",
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
            let transcript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                transcript +=
                    event.results[i][0].transcript;
            }

            setAnswer(transcript);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();

        recognitionRef.current = recognition;
        setListening(true);
    }

    function stopListening() {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setListening(false);
    }

    async function submitAnswer() {
        if (
            !state?.interview ||
            !currentQuestion ||
            failed
        ) {
            return;
        }

        if (!answer.trim()) {
            setError(
                "Please provide an answer before submitting.",
            );
            return;
        }

        if (!token) {
            setFailed(true);
            setError(FAILURE_MESSAGE);
            return;
        }

        if (finishingRef.current) {
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            stopListening();

            const remainingSeconds = time;

            const result = await submitInterviewAnswer(
                state.interview.id,
                answer.trim(),
                remainingSeconds,
            );

            if (result.interviewEnded) {
                try {
                    await evaluateInterview(state.interview.id);

                    navigate(`/interviews/${state.interview.id}`, {
                        replace: true,
                    });
                } catch (error) {
                    console.error(
                        "Failed to evaluate completed interview:",
                        error,
                    );

                    setFailed(true);
                    setError(FAILURE_MESSAGE);
                }

                return;
            }

            if (result.question) {
                setCurrentQuestion(result.question);
                setAnswer("");
            }
        } catch (error) {
            console.error(
                "Failed to submit interview answer:",
                error,
            );

            setFailed(true);
            setError(FAILURE_MESSAGE);

            window.speechSynthesis.cancel();
            recognitionRef.current?.stop();
            recognitionRef.current = null;
            setListening(false);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleEndInterview() {
        if (submitting || finishing || failed) {
            return;
        }

        await finishInterview();
    }

    function handleExit() {
        navigate("/dashboard", {
            replace: true,
        });
    }

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${minutes
            .toString()
            .padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`;
    }

    if (!state?.interview || !currentQuestion) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            <div className="flex h-20 items-center justify-between border-b border-slate-800 px-8">
                <div>
                    <h1 className="text-xl font-semibold">
                        {state.interview.role} Interview
                    </h1>

                    <p className="text-sm text-slate-400">
                        AI {state.interview.interviewType} Interview
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Clock size={18} />
                        {formatTime(time)}
                    </div>

                    <div className="rounded-xl bg-indigo-500/20 px-4 py-2 text-indigo-400">
                        Question{" "}
                        {currentQuestion.questionNumber}
                    </div>

                    {failed ? (
                        <button
                            type="button"
                            onClick={handleExit}
                            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500/20"
                        >
                            <LogOut size={18} />
                            Exit
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleEndInterview}
                            disabled={
                                submitting || finishing
                            }
                            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <LogOut size={18} />

                            {finishing
                                ? "Ending..."
                                : "End Interview"}
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="mx-8 mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            <div className="grid flex-1 gap-8 p-8 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
                >
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600">
                            <Bot size={30} />
                        </div>

                        <div>
                            <h2 className="font-semibold">
                                AI Interviewer
                            </h2>

                            <p className="text-sm text-slate-400">
                                {failed
                                    ? "Interview failed"
                                    : "Asking Question..."}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-slate-800 p-6">
                        <p className="mb-3 text-sm text-slate-400">
                            Question{" "}
                            {currentQuestion.questionNumber}
                        </p>

                        <h2 className="text-xl leading-relaxed">
                            {currentQuestion.question}
                        </h2>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
                >
                    <div className="h-64 overflow-hidden rounded-xl bg-slate-800">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                        {cameraReady
                            ? "Camera Active"
                            : "Camera Loading..."}
                    </p>

                    <textarea
                        value={answer}
                        onChange={(event) =>
                            setAnswer(event.target.value)
                        }
                        placeholder="Your answer will appear here..."
                        disabled={
                            submitting ||
                            finishing ||
                            failed
                        }
                        className="mt-5 h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500 disabled:opacity-60"
                    />

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={
                                listening
                                    ? stopListening
                                    : startListening
                            }
                            disabled={
                                submitting ||
                                finishing ||
                                failed
                            }
                            className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {listening ? (
                                <MicOff />
                            ) : (
                                <Mic />
                            )}

                            {listening
                                ? "Stop"
                                : "Start Answer"}
                        </button>

                        <button
                            type="button"
                            onClick={submitAnswer}
                            disabled={
                                submitting ||
                                finishing ||
                                failed ||
                                !answer.trim()
                            }
                            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={18} />

                            {submitting
                                ? "Processing..."
                                : "Submit"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}