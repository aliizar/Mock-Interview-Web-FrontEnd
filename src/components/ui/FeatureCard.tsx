import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function FeatureCard({
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
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-indigo-500/40"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15">
                <Icon className="h-6 w-6 text-indigo-400" />
            </div>

            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}