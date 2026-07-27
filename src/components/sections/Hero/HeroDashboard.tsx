import { motion } from "framer-motion";
import {
    Brain,
    CheckCircle2,
    Clock3,
    Code2,
    Mic,
    TrendingUp,
} from "lucide-react";

import FloatingCard from "./FloatingCard";

const skills = [
    {
        label: "Technical",
        score: 95,
    },
    {
        label: "Communication",
        score: 88,
    },
    {
        label: "Confidence",
        score: 92,
    },
];

const interviews = [
    {
        company: "Frontend Interview",
        status: "Completed",
    },
    {
        company: "Behavioral Round",
        status: "Completed",
    },
    {
        company: "System Design",
        status: "Upcoming",
    },
];

export default function HeroDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
            }}
            className="w-full max-w-lg"
        >
            {/* Dashboard Wrapper */}
            <div className="relative">

                {/* Floating Card 1 */}
                <FloatingCard
                    icon={Brain}
                    title="AI Feedback"
                    value="Ready"
                    duration={4.5}
                    className="-top-8 -right-8 hidden lg:block"
                />

                {/* Floating Card 2 */}
                <FloatingCard
                    icon={TrendingUp}
                    title="Confidence"
                    value="+12%"
                    delay={0.3}
                    duration={5.6}
                    className="-bottom-8 -left-8 hidden lg:block"
                />

                {/* Floating Card 3 */}
                <FloatingCard
                    icon={Mic}
                    title="Voice Analysis"
                    value="Excellent"
                    delay={0.5}
                    duration={6.5}
                    className="top-1/2 -right-10 hidden xl:block"
                />

                {/* Dashboard */}
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-indigo-950/20">

                    {/* Header */}
                    <div className="border-b border-slate-800 p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-400">
                                    AI Interview
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-white">
                                    Frontend Developer
                                </h3>
                            </div>

                            <div className="rounded-xl bg-indigo-600/20 p-3">
                                <Brain className="h-6 w-6 text-indigo-400" />
                            </div>

                        </div>

                    </div>

                    {/* Score */}
                    <div className="border-b border-slate-800 p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-400">
                                    Overall Score
                                </p>

                                <h2 className="mt-2 text-5xl font-bold text-white">
                                    92%
                                </h2>

                            </div>

                            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                                Excellent
                            </div>

                        </div>

                    </div>

                    {/* Skills */}
                    <div className="space-y-5 border-b border-slate-800 p-6">

                        {skills.map((skill) => (
                            <div key={skill.label}>

                                <div className="mb-2 flex items-center justify-between">

                                    <span className="text-sm text-slate-300">
                                        {skill.label}
                                    </span>

                                    <span className="text-sm font-semibold text-white">
                                        {skill.score}%
                                    </span>

                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                                    <motion.div
                                        initial={{
                                            width: 0,
                                        }}
                                        whileInView={{
                                            width: `${skill.score}%`,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.2,
                                        }}
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                                    />

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* Recent Interviews */}
                    <div className="p-6">

                        <div className="mb-4 flex items-center justify-between">

                            <h4 className="font-semibold text-white">
                                Recent Interviews
                            </h4>

                            <Mic className="h-5 w-5 text-slate-500" />

                        </div>

                        <div className="space-y-3">
                            {interviews.map((item, index) => (
                                <motion.div
                                    key={item.company}
                                    initial={{
                                        opacity: 0,
                                        y: 15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.7 + index * 0.15,
                                    }}
                                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 transition-colors hover:border-slate-700 hover:bg-slate-900"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-indigo-600/15 p-2">
                                            <Code2 className="h-4 w-4 text-indigo-400" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-white">
                                                {item.company}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Mock Interview
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {item.status === "Completed" ? (
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        ) : (
                                            <Clock3 className="h-4 w-4 text-amber-400" />
                                        )}

                                        <span
                                            className={`text-xs font-medium ${item.status === "Completed"
                                                    ? "text-emerald-400"
                                                    : "text-amber-400"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}