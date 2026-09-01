
import {
    Search,
    Calendar,
    Clock,
    ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getInterviewHistory,
    type InterviewHistoryItem,
} from "../../api/interview.api";

export default function InterviewHistory() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [interviews, setInterviews] = useState<InterviewHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getInterviewHistory();

                setInterviews(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load interview history",
                );
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    const filteredInterviews = interviews.filter((interview) =>
        interview.role.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}

            <div>
                <h1 className="text-4xl font-bold text-white">
                    Interview History
                </h1>

                <p className="mt-3 text-slate-400">
                    Review your previous interviews, feedback, and progress.
                </p>
            </div>

            {/* Search */}

            <div className="relative">
                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by job role..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
                />
            </div>

            {/* Loading */}

            {loading && (
                <div className="text-center py-16 text-slate-400">
                    Loading interview history...
                </div>
            )}

            {/* Error */}

            {!loading && error && (
                <div className="text-center py-16 text-red-400">
                    {error}
                </div>
            )}

            {/* Empty State */}

            {!loading && !error && filteredInterviews.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-slate-400">
                        {search
                            ? "No interviews found matching your search."
                            : "You haven't completed any interviews yet."}
                    </p>
                </div>
            )}

            {/* Interview Records */}

            {!loading && !error && filteredInterviews.length > 0 && (
                <div className="space-y-6">
                    {filteredInterviews.map((interview, index) => (
                        <motion.div
                            key={interview.id}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: index * 0.1,
                            }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                                {/* Left Section */}

                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {interview.role}
                                    </h2>

                                    <div className="flex flex-wrap gap-3 mt-4">
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

                                    <div className="flex flex-wrap gap-6 mt-5 text-sm text-slate-400">
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
                                </div>

                                {/* Right Section */}

                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-sm text-slate-400">
                                            Score
                                        </p>

                                        <p className="text-3xl font-bold text-white">
                                            {interview.overallScore !== null
                                                ? `${interview.overallScore}/10`
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/interviews/${interview.id}`,
                                            )
                                        }
                                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl transition"
                                    >
                                        View Details

                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
