import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


const progressData = [
    {
        day: "Mon",
        score: 65
    },
    {
        day: "Tue",
        score: 72
    },
    {
        day: "Wed",
        score: 78
    },
    {
        day: "Thu",
        score: 75
    },
    {
        day: "Fri",
        score: 85
    },
    {
        day: "Sat",
        score: 90
    },
    {
        day: "Sun",
        score: 94
    }
];



export default function WeeklyProgress() {


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
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={progressData}
                    >
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
            </div>
        </div>

    );

}