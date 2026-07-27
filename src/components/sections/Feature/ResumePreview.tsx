import { motion } from "framer-motion";
import { CheckCircle2, FileText } from "lucide-react";

const sections = [
    "Professional Summary",
    "Technical Skills",
    "Projects",
    "Experience",
];

export default function ResumePreview() {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>

                    <p className="text-xs text-slate-500">
                        AI Resume Review
                    </p>

                    <h4 className="mt-1 font-semibold text-white">
                        Resume Score
                    </h4>

                </div>

                <div className="rounded-xl bg-indigo-500/10 p-3">
                    <FileText className="h-5 w-5 text-indigo-400" />
                </div>

            </div>

            {/* Body */}

            <div className="grid grid-cols-[90px_1fr] gap-5 p-5">

                {/* Score */}

                <div className="flex items-center justify-center">

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-indigo-500/20">

                        <motion.div
                            initial={{ rotate: -90 }}
                            whileInView={{ rotate: 270 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.5,
                                ease: "easeOut",
                            }}
                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500"
                        />

                        <span className="text-xl font-bold text-white">
                            94
                        </span>

                    </div>

                </div>

                {/* Resume Sections */}

                <div className="space-y-3">

                    {sections.map((section, index) => (

                        <motion.div
                            key={section}
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay: index * 0.1,
                            }}
                            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
                        >

                            <span className="text-xs text-slate-300">
                                {section}
                            </span>

                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                        </motion.div>

                    ))}

                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 bg-slate-900/60 px-5 py-4">

                <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-400">
                        ATS Compatibility
                    </span>

                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                        Excellent
                    </span>

                </div>

            </div>

        </div>
    );
}