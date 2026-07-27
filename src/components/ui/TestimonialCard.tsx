import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
}

export default function TestimonialCard({
    name,
    role,
    company,
    message,
    rating,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl"
        >
            {/* Stars */}
            <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400" />
                ))}
            </div>

            {/* Message */}
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                "{message}"
            </p>

            {/* User */}
            <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="font-semibold text-white">{name}</p>
                <p className="text-xs text-slate-400">
                    {role} • {company}
                </p>
            </div>
        </motion.div>
    );
}