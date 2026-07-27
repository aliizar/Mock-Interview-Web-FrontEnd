import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
    index: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function StepCard({
    index,
    title,
    description,
    icon: Icon,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl"
        >
            {/* Step Number */}
            <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {index + 1}
            </div>

            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15">
                <Icon className="h-6 w-6 text-indigo-400" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
                {description}
            </p>
        </motion.div>
    );
}