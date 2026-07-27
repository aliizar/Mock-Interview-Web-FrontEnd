import { stats } from "../../data/stats";
import StatCard from "../ui/StatCard";
import { motion } from "framer-motion";

export default function Stats() {
    return (
        <section className="relative bg-slate-950 py-20">
            {/* Background glow (subtle like SaaS sites) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 md:px-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <p className="text-sm font-medium text-indigo-400">
                        Trusted Worldwide
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                        Built for Students & Professionals
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                        Thousands of users are already improving their interview skills
                        with AI-powered practice sessions.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <StatCard
                            key={item.label}
                            value={item.value}
                            suffix={item.suffix}
                            label={item.label}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}