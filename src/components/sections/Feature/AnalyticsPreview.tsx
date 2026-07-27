import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const bars = [35, 48, 42, 65, 58, 82, 95];

const metrics = [
    {
        label: "Accuracy",
        value: "94%",
    },
    {
        label: "Sessions",
        value: "26",
    },
];

export default function AnalyticsPreview() {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                    <p className="text-xs text-slate-500">
                        Weekly Progress
                    </p>

                    <h4 className="mt-1 font-semibold text-white">
                        Performance Analytics
                    </h4>
                </div>

                <div className="rounded-xl bg-emerald-500/10 p-3">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>

            </div>

            {/* Mini Metrics */}

            <div className="grid grid-cols-2 gap-3 p-5">

                {metrics.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-slate-800 bg-slate-900/70 p-3"
                    >
                        <p className="text-xs text-slate-500">
                            {item.label}
                        </p>

                        <p className="mt-2 text-xl font-bold text-white">
                            {item.value}
                        </p>
                    </div>
                ))}

            </div>

            {/* Animated Bars */}

            <div className="flex h-40 items-end justify-between px-6 pb-6">

                {bars.map((height, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2"
                    >
                        <motion.div
                            initial={{
                                height: 0,
                            }}
                            whileInView={{
                                height,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.08,
                            }}
                            className="w-7 rounded-t-xl bg-gradient-to-t from-indigo-600 via-violet-500 to-cyan-400"
                        />

                        <span className="text-[10px] text-slate-500">
                            {["M", "T", "W", "T", "F", "S", "S"][index]}
                        </span>
                    </div>
                ))}

            </div>

        </div>
    );
}