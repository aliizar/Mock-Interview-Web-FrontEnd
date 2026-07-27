import { motion } from "framer-motion";
import {
    Bot,
    CheckCircle2,
    Sparkles,
    TrendingUp,
} from "lucide-react";

const suggestions = [
    "Use the STAR method",
    "Improve eye contact",
    "Add measurable results",
];

export default function FeedbackPreview() {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-indigo-600/15 p-3">
                        <Bot className="h-5 w-5 text-indigo-400" />
                    </div>

                    <div>

                        <p className="text-xs text-slate-500">
                            AI Interview Coach
                        </p>

                        <h4 className="font-semibold text-white">
                            Instant Feedback
                        </h4>

                    </div>

                </div>

                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Excellent
                </div>

            </div>

            {/* Chat */}

            <div className="space-y-4 p-6">

                {/* AI Message */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="max-w-sm rounded-2xl rounded-bl-md bg-slate-900 p-4"
                >
                    <p className="text-sm text-slate-300">
                        Great answer! You clearly explained your
                        experience and problem-solving approach.
                    </p>
                </motion.div>

                {/* User Message */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.2,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="ml-auto max-w-sm rounded-2xl rounded-br-md bg-indigo-600 p-4"
                >
                    <p className="text-sm text-white">
                        How can I improve my answer?
                    </p>
                </motion.div>

                {/* AI Response */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        delay: 0.4,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="rounded-2xl rounded-bl-md bg-slate-900 p-4"
                >
                    <div className="mb-4 flex items-center gap-2">

                        <Sparkles className="h-4 w-4 text-indigo-400" />

                        <span className="text-sm font-medium text-white">
                            Suggestions
                        </span>

                    </div>

                    <div className="space-y-3">

                        {suggestions.map((item, index) => (

                            <motion.div
                                key={item}
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.5 + index * 0.15,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                className="flex items-center gap-3"
                            >

                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                                <span className="text-sm text-slate-300">
                                    {item}
                                </span>

                            </motion.div>

                        ))}

                    </div>

                </motion.div>

            </div>

            {/* Footer */}

            <div className="grid grid-cols-3 border-t border-slate-800 bg-slate-900/60">

                <div className="p-4 text-center">

                    <p className="text-xs text-slate-500">
                        Confidence
                    </p>

                    <p className="mt-1 font-semibold text-white">
                        92%
                    </p>

                </div>

                <div className="border-x border-slate-800 p-4 text-center">

                    <p className="text-xs text-slate-500">
                        Clarity
                    </p>

                    <p className="mt-1 font-semibold text-white">
                        95%
                    </p>

                </div>

                <div className="p-4 text-center">

                    <div className="flex items-center justify-center gap-1">

                        <TrendingUp className="h-4 w-4 text-emerald-400" />

                        <span className="font-semibold text-white">
                            +18%
                        </span>

                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                        Improvement
                    </p>

                </div>

            </div>

        </div>
    );
}