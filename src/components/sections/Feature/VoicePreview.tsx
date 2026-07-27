import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const bars = [18, 34, 52, 42, 26, 48, 36, 22];

export default function VoicePreview() {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>

                    <p className="text-xs text-slate-500">
                        Live Voice Analysis
                    </p>

                    <h4 className="mt-1 font-semibold text-white">
                        Recording...
                    </h4>

                </div>

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                    }}
                    className="rounded-full bg-red-500/15 p-3"
                >
                    <Mic className="h-5 w-5 text-red-400" />
                </motion.div>

            </div>

            {/* Waveform */}

            <div className="flex h-32 items-end justify-center gap-2 px-6">

                {bars.map((height, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            height: [
                                height,
                                height + 18,
                                height - 8,
                                height,
                            ],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.4,
                            delay: index * 0.08,
                        }}
                        className="w-2 rounded-full bg-gradient-to-t from-indigo-600 to-violet-400"
                        style={{
                            height,
                        }}
                    />
                ))}

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 bg-slate-900/60 px-5 py-4">

                <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-400">
                        Confidence
                    </span>

                    <span className="text-sm font-semibold text-emerald-400">
                        High
                    </span>

                </div>

            </div>

        </div>
    );
}