import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
            <div className="grid min-h-screen lg:grid-cols-2">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative hidden lg:flex items-center justify-center overflow-hidden border-r border-slate-800"
                >

                    <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[140px]" />
                    <div className="absolute -bottom-40 right-0 h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[140px]" />

                    {/* Content */}
                    <div className="relative z-10 max-w-xl px-10">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
                                <Sparkles className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Interview<span className="text-indigo-400">AI</span>
                                </h2>
                                <p className="text-sm text-slate-400">
                                    Practice smarter. Get hired faster.
                                </p>
                            </div>
                        </div>

                        <h1 className="text-5xl font-bold leading-tight">
                            Master Every Interview with
                            <span className="block text-indigo-400">
                                AI-Powered Feedback
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                            Experience realistic mock interviews, receive instant
                            performance insights, and build confidence before your
                            dream job interview.
                        </p>

                        {/* Stats */}
                        <div className="mt-10 grid grid-cols-3 gap-4">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
                                <h3 className="text-2xl font-bold">12K+</h3>
                                <p className="text-sm text-slate-400">
                                    Interviews
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
                                <h3 className="text-2xl font-bold">98%</h3>
                                <p className="text-sm text-slate-400">
                                    Success Rate
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur">
                                <h3 className="text-2xl font-bold">24/7</h3>
                                <p className="text-sm text-slate-400">
                                    AI Available
                                </p>
                            </div>
                        </div>


                    </div>
                </motion.div>

                {/* ================= RIGHT SIDE ================= */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative flex items-center justify-center px-6 py-12"
                >

                    <div className="absolute h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />


                    <div className="relative z-10 flex w-full justify-center">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}