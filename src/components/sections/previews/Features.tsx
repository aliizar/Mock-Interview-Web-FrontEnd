import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import BentoCard from "../../ui/BentoCard";
import { features } from "../../../data/features";

export default function Features() {
    return (
        <section
            id="features"
            className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-28"
        >
            {/* Background Glow */}

            <div className="absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [-80, 80, -80],
                        y: [-40, 40, -40],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-600/10 blur-[120px]"
                />

                <motion.div
                    animate={{
                        x: [80, -80, 80],
                        y: [40, -40, 40],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]"
                />

            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10">

                {/* Heading */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2">

                        <Sparkles className="h-4 w-4 text-indigo-400" />

                        <span className="text-sm font-medium text-indigo-300">
                            Everything You Need
                        </span>

                    </div>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
                        Powerful AI Features
                        <span className="block text-indigo-400">
                            Built For Success
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                        Practice interviews, improve your communication, optimize your
                        resume, and track your growth—all in one intelligent platform.
                    </p>

                </motion.div>

                {/* Bento Grid */}

                <div className="grid gap-6 lg:grid-cols-3">

                    {features.map((feature) => (
                        <BentoCard
                            key={feature.id}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            variant={feature.variant}
                            preview={feature.preview}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}