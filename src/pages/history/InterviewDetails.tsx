
import {
    ArrowLeft,
    Calendar,
    Clock,
    TrendingUp,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getInterviewDetails,
    type InterviewDetails as InterviewDetailsData,
} from "../../api/interview.api";

export default function InterviewDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [interview, setInterview] =
        useState<InterviewDetailsData | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInterviewDetails = async () => {
            if (!id) {
                setError("Interview ID is missing");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await getInterviewDetails(Number(id));

                setInterview(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load interview details",
                );
            } finally {
                setLoading(false);
            }
        };

        loadInterviewDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-16 text-center">
                <p className="text-slate-400">
                    Loading interview details...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto py-16 text-center">
                <p className="text-red-400">
                    {error}
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-5 text-indigo-400 hover:text-indigo-300"
                >
                    Back to History
                </button>
            </div>
        );
    }

    if (!interview) {
        return null;
    }

    const feedback = interview.feedback;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Back Button */}

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
                <ArrowLeft size={18} />
                Back to History
            </button>

            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >
                <h1 className="text-3xl font-bold text-white">
                    {interview.role} Interview
                </h1>

                <div className="flex flex-wrap gap-3 mt-5">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                        {interview.difficulty}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                        {interview.interviewType}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                        {interview.status}
                    </span>
                </div>

                <div className="flex flex-wrap gap-6 mt-5 text-slate-400 text-sm">
                    <span className="flex items-center gap-2">
                        <Calendar size={16} />

                        {new Date(
                            interview.startedAt,
                        ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>

                    <span className="flex items-center gap-2">
                        <Clock size={16} />

                        {interview.duration} Minutes
                    </span>
                </div>

                <div className="mt-6">
                    <p className="text-slate-400">
                        Overall Score
                    </p>

                    <p className="text-5xl font-bold text-green-400">
                        {interview.overallScore !== null
                            ? `${interview.overallScore}/10`
                            : "N/A"}
                    </p>
                </div>
            </motion.div>

            {/* Evaluation Scores */}

            {feedback && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <TrendingUp className="text-indigo-400" />

                        <h2 className="text-xl font-semibold text-white">
                            Performance Overview
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">
                                Technical Score
                            </p>

                            <p className="text-3xl text-white font-bold mt-1">
                                {feedback.technicalScore}/10
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">
                                Communication Score
                            </p>

                            <p className="text-3xl text-white font-bold mt-1">
                                {feedback.communicationScore}/10
                            </p>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">
                                Problem Solving
                            </p>

                            <p className="text-3xl text-white font-bold mt-1">
                                {feedback.problemSolvingScore}/10
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Overall Feedback */}

            {feedback && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-2xl font-bold text-white">
                        Overall AI Feedback
                    </h2>

                    <p className="text-slate-400 mt-4 leading-7">
                        {feedback.feedback}
                    </p>
                </div>
            )}

            {/* Strengths & Weaknesses */}

            {feedback && (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Strengths */}

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Strengths
                        </h2>

                        <div className="mt-5 space-y-3">
                            {feedback.strengths.map(
                                (strength, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400 mt-0.5 shrink-0"
                                        />

                                        <p className="text-slate-400">
                                            {strength}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Weaknesses */}

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Areas for Improvement
                        </h2>

                        <div className="mt-5 space-y-3">
                            {feedback.weaknesses.map(
                                (weakness, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <AlertCircle
                                            size={20}
                                            className="text-yellow-400 mt-0.5 shrink-0"
                                        />

                                        <p className="text-slate-400">
                                            {weakness}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Recommendations */}

            {feedback && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-2xl font-bold text-white">
                        Recommendations
                    </h2>

                    <div className="mt-5 space-y-3">
                        {feedback.recommendations.map(
                            (recommendation, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-indigo-400 font-bold">
                                        {index + 1}.
                                    </span>

                                    <p className="text-slate-400">
                                        {recommendation}
                                    </p>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}

            {/* Questions */}

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">
                    Questions & AI Feedback
                </h2>

                {interview.questions.map(
                    (item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.05,
                            }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-white font-semibold">
                                    Question{" "}
                                    {item.questionNumber}
                                </h3>

                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                                    {item.type}
                                </span>
                            </div>

                            <p className="text-slate-300 mt-4 leading-7">
                                {item.question}
                            </p>

                            {/* Answer */}

                            <div className="mt-6">
                                <p className="text-sm text-indigo-400">
                                    Your Response
                                </p>

                                <p className="text-slate-400 mt-2 leading-7 whitespace-pre-line">
                                    {item.answer ||
                                        "No response provided."}
                                </p>
                            </div>

                            {/* AI Feedback */}

                            {item.feedback && (
                                <div className="mt-6">
                                    <p className="text-sm text-green-400">
                                        AI Feedback
                                    </p>

                                    <p className="text-slate-400 mt-2 leading-7">
                                        {item.feedback}
                                    </p>
                                </div>
                            )}

                            {/* Score */}

                            <div className="mt-6 flex items-center gap-2">
                                {item.score !== null &&
                                    item.score >= 8 ? (
                                    <CheckCircle className="text-green-400" />
                                ) : (
                                    <AlertCircle className="text-yellow-400" />
                                )}

                                <span className="text-white">
                                    Score:{" "}
                                    {item.score !== null
                                        ? `${item.score}/10`
                                        : "Not evaluated"}
                                </span>
                            </div>
                        </motion.div>
                    ),
                )}
            </div>
        </div>
    );
}
