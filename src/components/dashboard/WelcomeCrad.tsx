import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function WelcomeCard() {
    const navigate = useNavigate();
    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl p-8 bg-slate-900 border border-slate-800 shadow-xl"
        >
            {/* Soft Glow Effects */}

            <div className="absolute -top-24 -right-20 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 left-40 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />

            <div className="relative z-10 flex justify-between items-center">
                {/* Text Content */}
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 text-indigo-400 mb-4">
                        <Sparkles size={18} />
                        <span className="text-sm">
                            AI Interview Coach
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold text-white leading-tight">
                        Good Evening, Ali
                        <br />
                        Ready to ace your next interview?
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Improve your interview skills with
                        AI-powered practice sessions and
                        personalized feedback.
                    </p>

                    <button onClick={() => navigate("/interview")} className="mt-8 flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-indigo-500/20">
                        Start Interview

                        <ArrowRight size={18} />

                    </button>


                </div>
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity
                    }}
                    className="hidden lg:flex items-center justify-center w-48 h-48 rounded-full bg-slate-800 border border-slate-700 shadow-2xl"
                >
                    <div className="text-7xl">
                        🤖
                    </div>
                </motion.div>
            </div>
        </motion.div>

    );

}