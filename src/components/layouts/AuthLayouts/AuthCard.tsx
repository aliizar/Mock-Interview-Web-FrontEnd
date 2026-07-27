import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function AuthCard({
    title,
    subtitle,
    children,
}: AuthCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md"
        >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-500/20 blur-3xl" />

            {/* Border Gradient */}
            <div className="relative rounded-[28px] border border-slate-800 bg-slate-900/80 backdrop-blur-2xl p-8 shadow-2xl">

                {/* AI Badge */}
                <div className="absolute right-6 top-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                    AI
                </div>

                {/* Header */}
                <div className="mb-8">

                    <h2 className="text-3xl font-bold">
                        {title}
                    </h2>

                    <p className="mt-2 text-slate-400">
                        {subtitle}
                    </p>

                </div>

                {children}

            </div>
        </motion.div>
    );
}