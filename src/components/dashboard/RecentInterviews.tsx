import {
    CheckCircle,
    Clock
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
interface Interview {
    title: string;
    score: string;
    date: string;
    status: string;
}
const interviews: Interview[] = [
    {
        title: "Frontend React Interview",
        score: "92%",
        date: "Today",
        status: "Completed"
    },

    {
        title: "Node.js Backend Interview",
        score: "78%",
        date: "Yesterday",
        status: "Completed"
    },

    {
        title: "Behavioral Interview",
        score: "85%",
        date: "12 July",
        status: "Completed"
    }

];

export default function RecentInterviews() {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Interviews */}
            <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Recent Interviews
                    </h2>
                    <p className="text-sm text-slate-400">
                        Your latest interview attempts
                    </p>
                </div>
                <div className="space-y-4">
                    {
                        interviews.map((interview) => (
                            <motion.div
                                key={interview.title}

                                whileHover={{
                                    x: 5
                                }}
                                className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4"

                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">

                                        <CheckCircle
                                            size={20}
                                            className="text-emerald-400"
                                        />

                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">

                                            {interview.title}

                                        </h3>
                                        <p className="text-sm text-slate-400">

                                            {interview.date}

                                        </p>

                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-white">
                                        {interview.score}
                                    </p>
                                    <p className="text-xs text-emerald-400">
                                        {interview.status}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            {/* Upcoming Goal */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <Clock
                            size={24}
                            className="text-indigo-400"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Upcoming Goal
                        </h2>
                        <p className="text-sm text-slate-400">
                            This week's target
                        </p>
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-white">
                    3 / 5
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                    Interviews completed
                </p>
                {/* Progress Bar */}
                <div className="mt-6 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-indigo-500 rounded-full" />
                </div>
                <button onClick={() => navigate("/interview")} className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition">
                    Continue Practice
                </button>
            </div>
        </div>

    );

}