import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FloatingCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    delay?: number;
    duration?: number;
    className?: string;
}

export default function FloatingCard({
    icon: Icon,
    title,
    value,
    delay = 0,
    duration = 5,
    className = "",
}: FloatingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: {
                    duration: 0.6,
                    delay,
                },
                y: {
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            className={`absolute rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-black/20 ${className}`}
        >
            <div className="flex items-center gap-3 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/20">
                    <Icon className="h-5 w-5 text-indigo-400" />
                </div>

                <div>
                    <p className="text-xs text-slate-400">{title}</p>
                    <h4 className="text-sm font-semibold text-white">{value}</h4>
                </div>
            </div>
        </motion.div>
    );
}