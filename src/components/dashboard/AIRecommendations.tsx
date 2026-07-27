import {
    Brain,
    CheckCircle2,
    Target
} from "lucide-react";

import { motion } from "framer-motion";

const recommendations = [
    "Improve React Hooks knowledge",
    "Practice behavioral questions",
    "Work on answer structure"
];

export default function AIRecommendations() {

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

            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">


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
                        Based on your recent interviews
                    </p>

                </div>

            </div>

            {/* Recommendations */}

            <div className="space-y-4">

                {
                    recommendations.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-3"
                        >
                            <CheckCircle2
                                size={20}
                                className="text-emerald-400"
                            />

                            <p className="text-sm text-slate-300">
                                {item}
                            </p>

                        </div>
                    ))
                }
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
                    Complete 2 mock interviews this week and improve your confidence score.
                </p>
            </div>
        </motion.div>

    );

}