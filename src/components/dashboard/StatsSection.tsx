import { useEffect, useState } from "react";
import {
    Target,
    FileCheck,
    Flame,
    Trophy
} from "lucide-react";

import StatCard from "./StatCard";
import {
    getDashboardStats,
    type DashboardStats
} from "../../api/dashboard.api";

export default function StatsSection() {
    const [dashboardStats, setDashboardStats] =
        useState<DashboardStats | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const data = await getDashboardStats();
                setDashboardStats(data);
            } catch (error) {
                console.error(
                    "Failed to load dashboard stats:",
                    error
                );
            }
        }

        loadStats();
    }, []);

    const stats = [
        {
            title: "Overall Score",
            value:
                dashboardStats?.overallScore.value !== null &&
                    dashboardStats?.overallScore.value !== undefined
                    ? `${Math.round(
                        dashboardStats.overallScore.value * 10
                    )}%`
                    : "--",
            description:
                dashboardStats?.overallScore.improvement !== null &&
                    dashboardStats?.overallScore.improvement !== undefined
                    ? `${dashboardStats.overallScore.improvement >= 0
                        ? "+"
                        : ""
                    }${Math.round(
                        dashboardStats.overallScore.improvement
                    )}% from last week`
                    : "No data last week",
            icon: Target,
            color: "bg-indigo-500"
        },
        {
            title: "Last Interview",
            value:
                dashboardStats?.lastInterview?.score !== null &&
                    dashboardStats?.lastInterview?.score !== undefined
                    ? `${Math.round(
                        dashboardStats.lastInterview.score * 10
                    )}%`
                    : "--",
            description:
                dashboardStats?.lastInterview?.role ||
                "No interview yet",
            icon: FileCheck,
            color: "bg-emerald-500"
        },
        {
            title: "Interview Streak",
            value: dashboardStats
                ? `${dashboardStats.interviewStreak} ${dashboardStats.interviewStreak === 1
                    ? "Day"
                    : "Days"
                }`
                : "--",
            description: "Keep going 🔥",
            icon: Flame,
            color: "bg-orange-500"
        },
        {
            title: "Practice Goal",
            value: dashboardStats
                ? `${dashboardStats.practiceGoal.completed}/${dashboardStats.practiceGoal.target}`
                : "--",
            description: "Interviews completed",
            icon: Trophy,
            color: "bg-purple-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {
                stats.map((item) => (
                    <StatCard
                        key={item.title}
                        {...item}
                    />
                ))
            }
        </div>
    );
}