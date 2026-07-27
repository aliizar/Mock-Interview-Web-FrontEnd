import { steps } from "../../data/howItWorks";
import StepCard from "../ui/StepCard";
import { motion } from "framer-motion";

export default function HowItWorks() {
    return (
        <section id="how" className="relative bg-slate-950 py-24">

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
                        How It Works
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                        Simple 3-step process
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                        Go from preparation to interview-ready in minutes using AI.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <StepCard
                            key={step.title}
                            index={index}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}