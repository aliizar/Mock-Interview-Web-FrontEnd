import { motion } from "framer-motion";

export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-28">

            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]" />
            </div>

            <div className="relative mx-auto max-w-4xl px-6 text-center">

                {/* Small label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-medium text-indigo-400"
                >
                    Start Your Journey
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mt-3 text-3xl font-bold text-white md:text-5xl"
                >
                    Get interview-ready with AI in minutes
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mx-auto mt-4 max-w-2xl text-slate-400"
                >
                    Stop guessing. Start practicing. Improve your confidence with
                    real-time AI feedback and land your dream job faster.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    {/* Primary CTA */}
                    <button className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500">
                        Get Started Free
                    </button>

                    {/* Secondary CTA */}
                    <button className="text-sm font-medium text-slate-300 transition hover:text-white">
                        Learn More →
                    </button>
                </motion.div>

            </div>
        </section>
    );
}