import { pricing } from "../../data/pricing";
import PricingCard from "../ui/PricingCard";
import { motion } from "framer-motion";

export default function Pricing() {
    return (
        <section id="pricing" className="relative bg-slate-950 py-24">

            {/* background glow */}
            <div className="absolute inset-0 flex justify-center">
                <div className="h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <p className="text-sm font-medium text-indigo-400">
                        Pricing
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                        Simple pricing for everyone
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                        Start free and upgrade when you're ready.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {pricing.map((plan) => (
                        <PricingCard key={plan.name} {...plan} />
                    ))}
                </div>

            </div>
        </section>
    );
}