import {
    Sparkles,
    Briefcase,
    Gauge,
    Clock,
    Play,
    Layers,
    X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import SystemStatus from "../components/interview/SystemStatus";
import AIInstructions from "../components/interview/AIInstructions";
import { getPreferences } from "../api/preferences.api";
import { useAuthStore } from "../stores/auth.store";

interface InterviewForm {
    role: string;
    difficulty: string;
    type: string;
    duration: string;
    description: string;
}

interface StartInterviewResponse {
    message: string;
    interview: {
        id: number;
        role: string;
        difficulty: string;
        interviewType: string;
        duration: number;
        startedAt: string;
        status: string;
    };
    question: {
        id: number;
        questionNumber: number;
        question: string;
        type: string;
    };
}

const API_URL = "http://localhost:5000/api/interviews/v1";

export default function Interview() {
    const navigate = useNavigate();

    const [showPreferenceDialog, setShowPreferenceDialog] = useState(true);
    const [loadingPreferences, setLoadingPreferences] = useState(false);
    const [startingInterview, setStartingInterview] = useState(false);
    const [error, setError] = useState("");

    const { token } = useAuthStore();

    const { register, handleSubmit, reset } = useForm<InterviewForm>({
        defaultValues: {
            role: "",
            difficulty: "",
            type: "",
            duration: "",
            description: "",
        },
    });

    const usePreferences = async () => {
        try {
            setLoadingPreferences(true);
            setError("");

            const preferences = await getPreferences();

            reset({
                role:
                    preferences.role === "Select Role!"
                        ? ""
                        : preferences.role,
                difficulty: preferences.difficulty || "",
                type: preferences.interviewType || "",
                duration: preferences.duration
                    ? `${preferences.duration} Minutes`
                    : "",
                description: "",
            });

            setShowPreferenceDialog(false);
        } catch (error) {
            console.error("Failed to load interview preferences:", error);
            setError("Failed to load your interview preferences.");
        } finally {
            setLoadingPreferences(false);
        }
    };

    const useCustomInterview = () => {
        setShowPreferenceDialog(false);
    };

    const onSubmit = async (data: InterviewForm) => {
        try {
            setStartingInterview(true);
            setError("");

            if (!token) {
                setError("You are not authenticated. Please log in again.");
                return;
            }

            const duration = Number.parseInt(data.duration, 10);

            const response = await fetch(`${API_URL}/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role: data.role,
                    difficulty: data.difficulty,
                    interviewType: data.type,
                    duration,
                }),
            });

            const result: StartInterviewResponse | { message: string } =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    "message" in result
                        ? result.message
                        : "Failed to start interview",
                );
            }

            const interviewResult = result as StartInterviewResponse;

            console.log("Interview started:", interviewResult);

            navigate("/interview/start", {
                state: {
                    interview: interviewResult.interview,
                    question: interviewResult.question,
                },
            });
        } catch (error) {
            console.error("Failed to start interview:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to start interview. Please try again.",
            );
        } finally {
            setStartingInterview(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-10">
            {/* Preference Dialog */}
            {showPreferenceDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                    >
                        <button
                            type="button"
                            onClick={useCustomInterview}
                            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <div className="mb-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                                <Sparkles
                                    size={24}
                                    className="text-indigo-400"
                                />
                            </div>

                            <h2 className="text-xl font-semibold text-white">
                                Use Your Interview Preferences?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Would you like us to automatically fill this
                                interview setup using your saved preferences?
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={usePreferences}
                                disabled={loadingPreferences}
                                className="flex-1 rounded-xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loadingPreferences
                                    ? "Loading..."
                                    : "Use My Preferences"}
                            </button>

                            <button
                                type="button"
                                onClick={useCustomInterview}
                                disabled={loadingPreferences}
                                className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                            >
                                Custom Interview
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-4 flex items-center gap-2 text-indigo-400">
                    <Sparkles size={20} />

                    <span className="text-sm">
                        AI Interview Assistant
                    </span>
                </div>

                <h1 className="text-4xl font-bold text-white">
                    Prepare for your next interview
                </h1>

                <p className="mt-3 max-w-2xl text-slate-400">
                    Configure your interview preferences and let AI create a
                    personalized interview experience.
                </p>
            </motion.div>

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Main Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* LEFT SIDE FORM */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl lg:col-span-2"
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Job Role */}
                        <div>
                            <label className="mb-3 flex items-center gap-2 font-medium text-white">
                                <Briefcase
                                    size={18}
                                    className="text-indigo-400"
                                />
                                Job Role
                            </label>

                            <input
                                type="text"
                                {...register("role", {
                                    required: "Job role is required",
                                })}
                                placeholder="e.g. Frontend Developer"
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Difficulty + Type */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Difficulty */}
                            <div>
                                <label className="mb-3 flex items-center gap-2 font-medium text-white">
                                    <Gauge
                                        size={18}
                                        className="text-indigo-400"
                                    />
                                    Difficulty
                                </label>

                                <select
                                    {...register("difficulty", {
                                        required:
                                            "Difficulty is required",
                                    })}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Select Difficulty
                                    </option>

                                    <option value="Beginner">
                                        Beginner
                                    </option>

                                    <option value="Intermediate">
                                        Intermediate
                                    </option>

                                    <option value="Advanced">
                                        Advanced
                                    </option>
                                </select>
                            </div>

                            {/* Interview Type */}
                            <div>
                                <label className="mb-3 flex items-center gap-2 font-medium text-white">
                                    <Layers
                                        size={18}
                                        className="text-indigo-400"
                                    />
                                    Interview Type
                                </label>

                                <select
                                    {...register("type", {
                                        required:
                                            "Interview type is required",
                                    })}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Select Type
                                    </option>

                                    <option value="Technical">
                                        Technical
                                    </option>

                                    <option value="Behavioral">
                                        Behavioral
                                    </option>

                                    <option value="HR">HR</option>

                                    <option value="Mixed">
                                        Mixed
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="mb-3 flex items-center gap-2 font-medium text-white">
                                <Clock
                                    size={18}
                                    className="text-indigo-400"
                                />
                                Interview Duration
                            </label>

                            <select
                                {...register("duration", {
                                    required:
                                        "Interview duration is required",
                                })}
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                            >
                                <option value="">
                                    Select Duration
                                </option>

                                <option value="10 Minutes">
                                    10 Minutes
                                </option>

                                <option value="20 Minutes">
                                    20 Minutes
                                </option>

                                <option value="30 Minutes">
                                    30 Minutes
                                </option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-3 block font-medium text-white">
                                Job Description (Optional)
                            </label>

                            <textarea
                                rows={5}
                                {...register("description")}
                                placeholder="Paste job description here..."
                                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={startingInterview}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-500 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Play size={20} />

                            {startingInterview
                                ? "Starting Interview..."
                                : "Start AI Interview"}
                        </button>
                    </form>
                </motion.div>

                {/* RIGHT SIDE */}
                <div className="space-y-8">
                    <SystemStatus />
                    <AIInstructions />
                </div>
            </div>
        </div>
    );
}