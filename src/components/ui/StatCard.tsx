import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import useCountUp from "../../Hooks/useCountUp";


interface StatCardProps {
    value: number;
    suffix: string;
    label: string;
    icon: LucideIcon;
}

export default function StatCard({
    value,
    suffix,
    label,
    icon: Icon,
}: StatCardProps) {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        once: true,
        margin: "-100px",
    });

    const count = useCountUp(value, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
            }}
            whileHover={{
                y: -8,
            }}
            transition={{
                duration: 0.5,
            }}
            className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-colors hover:border-indigo-500/40"
        >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/15 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-7 w-7 text-indigo-400" />
            </div>

            <h3 className="text-4xl font-bold text-white">
                {count}
                {suffix}
            </h3>

            <p className="mt-2 text-slate-400">
                {label}
            </p>
        </motion.div>
    );
}