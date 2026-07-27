import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
}

export default function PricingCard({
    name,
    price,
    description,
    features,
    popular,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className={`relative rounded-2xl border p-6 backdrop-blur-xl transition-all ${popular
                    ? "border-indigo-500 bg-indigo-600/10"
                    : "border-slate-800 bg-slate-900/60"
                }`}
        >
            {/* Popular badge */}
            {popular && (
                <div className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                </div>
            )}

            {/* Header */}
            <h3 className="text-xl font-bold text-white">{name}</h3>

            <p className="mt-1 text-sm text-slate-400">{description}</p>

            {/* Price */}
            <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">${price}</span>
                <span className="text-sm text-slate-400">/month</span>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
                {features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check className="h-4 w-4 text-emerald-400" />
                        {f}
                    </div>
                ))}
            </div>

            {/* Button */}
            <button
                className={`mt-6 w-full rounded-xl py-2 text-sm font-semibold transition ${popular
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
            >
                Get Started
            </button>
        </motion.div>
    );
}