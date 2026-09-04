import { useEffect, useState } from "react";
import {
    CheckCircle,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
    getInterviewHistory,
    type InterviewHistoryItem
} from "../../api/interview.api";

import {
    getDashboardStats,
    type DashboardStats
} from "../../api/dashboard.api";

export default function RecentInterviews() {
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState<
        InterviewHistoryItem[]
    >([]);

    const [dashboardStats, setDashboardStats] =
        useState<DashboardStats | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const [history, stats] = await Promise.all([
                    getInterviewHistory(),
                    getDashboardStats()
                ]);

                const completedInterviews = history
                    .filter(
                        (interview) =>
                            interview.status === "COMPLETED"
                    )
                    .sort(
                        (a, b) =>
                            new Date(b.startedAt).getTime() -
                            new Date(a.startedAt).getTime()
                    );

                setInterviews(
                    completedInterviews.slice(0, 3)
                );

                setDashboardStats(stats);
            } catch (error) {
                console.error(
                    "Failed to load recent interviews:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, []);

    function formatDate(date: string) {
        const interviewDate = new Date(date);
        const today = new Date();

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (
            interviewDate.toDateString() ===
            today.toDateString()
        ) {
            return "Today";
        }

        if (
            interviewDate.toDateString() ===
            yesterday.toDateString()
        ) {
            return "Yesterday";
        }

        return interviewDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short"
        });
    }

    const completed =
        dashboardStats?.practiceGoal.completed ?? 0;

    const target =
        dashboardStats?.practiceGoal.target ?? 5;

    const progress =
        target > 0
            ? Math.min((completed / target) * 100, 100)
            : 0;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Interviews */}
            <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Recent Interviews
                    </h2>

                    <p className="text-sm text-slate-400">
                        Your latest interview attempts
                    </p>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-sm text-slate-400">
                            Loading recent interviews...
                        </p>
                    ) : interviews.length > 0 ? (
                        interviews.map((interview) => (
                            <motion.div
                                key={interview.id}
                                whileHover={{
                                    x: 5
                                }}
                                onClick={() =>
                                    navigate(
                                        `/details/${interview.id}`
                                    )
                                }
                                className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle
                                            size={20}
                                            className="text-emerald-400"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-white font-medium">
                                            {interview.role}
                                        </h3>

                                        <p className="text-sm text-slate-400">
                                            {formatDate(
                                                interview.startedAt
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xl font-bold text-white">
                                        {interview.overallScore !==
                                            null
                                            ? `${Math.round(
                                                interview.overallScore *
                                                10
                                            )}%`
                                            : "--"}
                                    </p>

                                    <p className="text-xs text-emerald-400">
                                        {interview.status}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-sm text-slate-400">
                            No completed interviews yet.
                        </p>
                    )}
                </div>
            </div>

            {/* Upcoming Goal */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <Clock
                            size={24}
                            className="text-indigo-400"
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Upcoming Goal
                        </h2>

                        <p className="text-sm text-slate-400">
                            This week's target
                        </p>
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-white">
                    {completed} / {target}
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                    Interviews completed
                </p>

                {/* Progress Bar */}
                <div className="mt-6 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>

                <button
                    onClick={() => navigate("/interview")}
                    className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition"
                >
                    Continue Practice
                </button>
            </div>
        </div>
    );
}
