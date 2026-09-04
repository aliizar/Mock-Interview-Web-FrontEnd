
import { useEffect, useState } from "react";
import {
    Brain,
    CheckCircle2,
    Target
} from "lucide-react";
import { motion } from "framer-motion";

import {
    getInterviewHistory,
    getInterviewDetails
} from "../../api/interview.api";

import {
    getDashboardStats,
    type DashboardStats
} from "../../api/dashboard.api";

export default function AIRecommendations() {
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [dashboardStats, setDashboardStats] =
        useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRecommendations() {
            try {
                const [interviews, stats] = await Promise.all([
                    getInterviewHistory(),
                    getDashboardStats()
                ]);

                setDashboardStats(stats);

                const completedInterviews = interviews
                    .filter(
                        (interview) =>
                            interview.status === "COMPLETED"
                    )
                    .sort(
                        (a, b) =>
                            new Date(b.startedAt).getTime() -
                            new Date(a.startedAt).getTime()
                    );

                if (completedInterviews.length === 0) {
                    setRecommendations([]);
                    return;
                }

                const latestInterview =
                    completedInterviews[0];

                const details = await getInterviewDetails(
                    latestInterview.id
                );

                setRecommendations(
                    details.feedback?.recommendations || []
                );
            } catch (error) {
                console.error(
                    "Failed to load AI recommendations:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadRecommendations();
    }, []);

    const completed =
        dashboardStats?.practiceGoal.completed ?? 0;

    const target =
        dashboardStats?.practiceGoal.target ?? 5;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.5
            }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Brain
                        size={25}
                        className="text-indigo-400"
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-white">
                        AI Coach Recommendations
                    </h2>

                    <p className="text-sm text-slate-400">
                        Based on your recent interview
                    </p>
                </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-sm text-slate-400">
                        Loading recommendations...
                    </p>
                ) : recommendations.length > 0 ? (
                    recommendations.map((item, index) => (
                        <div
                            key={`${item}-${index}`}
                            className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3"
                        >
                            <CheckCircle2
                                size={20}
                                className="text-emerald-400 shrink-0"
                            />

                            <p className="text-sm text-slate-300">
                                {item}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-400">
                        Complete an interview to receive AI recommendations.
                    </p>
                )}
            </div>

            {/* Goal Section */}
            <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                    <Target
                        size={18}
                        className="text-indigo-400"
                    />

                    <h3 className="text-sm font-semibold text-white">
                        Recommended Goal
                    </h3>
                </div>

                <p className="text-sm text-slate-400">
                    Complete {target} mock interviews this week.
                    You have completed {completed} out of {target}.
                </p>
            </div>
        </motion.div>
    );
}
