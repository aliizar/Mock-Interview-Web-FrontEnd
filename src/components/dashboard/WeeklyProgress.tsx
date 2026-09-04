import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    getWeeklyProgress,
    type WeeklyProgress as WeeklyProgressData
} from "../../api/dashboard.api";

export default function WeeklyProgress() {
    const [progressData, setProgressData] = useState<
        WeeklyProgressData[]
    >([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProgress() {
            try {
                const data = await getWeeklyProgress();
                setProgressData(data);
            } catch (error) {
                console.error(
                    "Failed to load weekly progress:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadProgress();
    }, []);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Weekly Progress
                </h2>

                <p className="text-sm text-slate-400">
                    Your interview performance this week
                </p>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full">
                {loading ? (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        Loading progress...
                    </div>
                ) : (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart data={progressData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                            />

                            <XAxis
                                dataKey="day"
                                stroke="#94a3b8"
                            />

                            <YAxis
                                stroke="#94a3b8"
                                domain={[0, 100]}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "12px"
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{
                                    r: 5
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}