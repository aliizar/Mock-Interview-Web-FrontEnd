import { motion } from "framer-motion";

const skills = [
    {
        label: "Confidence",
        score: 92,
    },
    {
        label: "Communication",
        score: 88,
    },
    {
        label: "Technical",
        score: 95,
    },
];

export default function DashboardPreview() {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>

                    <p className="text-xs text-slate-500">
                        Frontend Interview
                    </p>

                    <h4 className="mt-1 font-semibold text-white">
                        Overall Score
                    </h4>

                </div>

                <div className="rounded-xl bg-indigo-500/10 px-3 py-2">

                    <span className="text-lg font-bold text-indigo-400">
                        92%
                    </span>

                </div>

            </div>

            {/* Skills */}

            <div className="space-y-4 p-5">

                {skills.map((skill, index) => (

                    <div key={skill.label}>

                        <div className="mb-2 flex justify-between">

                            <span className="text-xs text-slate-400">

                                {skill.label}

                            </span>

                            <span className="text-xs font-semibold text-white">

                                {skill.score}%

                            </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{
                                    width: `${skill.score}%`,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.8,
                                }}
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                            />

                        </div>

                    </div>

                ))}

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 bg-slate-900/60 px-5 py-4">

                <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-400">
                        AI Feedback
                    </span>

                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                        Excellent
                    </span>

                </div>

            </div>

        </div>
    );
}