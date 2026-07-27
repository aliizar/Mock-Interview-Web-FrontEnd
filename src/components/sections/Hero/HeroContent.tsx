import { motion } from "framer-motion";
import {
    ArrowRight,
    PlayCircle,
    Sparkles,
    Star,
} from "lucide-react";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
    },
};

export default function HeroContent() {
    return (
        <div className="max-w-2xl">

            {/* Badge */}

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2"
            >
                <Sparkles className="h-4 w-4 text-indigo-400" />

                <span className="text-sm font-medium text-indigo-300">
                    AI-Powered Mock Interviews
                </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
            >
                Ace Every Interview

                <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    With AI-Powered Practice
                </span>
            </motion.h1>

            {/* Description */}

            <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 max-w-xl text-lg leading-8 text-slate-400"
            >
                Practice realistic technical and behavioral interviews,
                receive instant AI feedback, improve your confidence,
                and land your dream job faster.
            </motion.p>

            {/* Buttons */}

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
                <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-500 active:scale-95">
                    Start Free

                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-7 py-4 font-medium text-slate-200 backdrop-blur transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
                    <PlayCircle className="h-5 w-5 text-indigo-400" />

                    Watch Demo
                </button>
            </motion.div>

            {/* Social Proof */}

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>

                <p className="text-sm text-slate-400">
                    Trusted by{" "}
                    <span className="font-semibold text-white">
                        10,000+
                    </span>{" "}
                    students and professionals worldwide.
                </p>
            </motion.div>
        </div>
    );
}