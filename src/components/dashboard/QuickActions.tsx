import {
    Mic,
    Brain,
    History,
    FileText,
    ArrowRight
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Action {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    path?: string;
}

const actions: Action[] = [
    {
        title: "Start Interview",
        description: "Practice a new AI interview",
        icon: Mic,
        color: "bg-indigo-500",
        path: "/interview"
    },

    {
        title: "AI Coach",
        description: "Improve your weak areas",
        icon: Brain,
        color: "bg-purple-500",
        path: "/ai-coach",

    },

    {
        title: "Interview History",
        description: "Review your performance",
        icon: History,
        color: "bg-emerald-500",
        path: "/history"
    },

    {
        title: "Resume Review",
        description: "Optimize your resume",
        icon: FileText,
        color: "bg-orange-500",
        path: "/resume-review"
    }

];

export default function QuickActions() {
    const navigate = useNavigate()
    return (
        <div>

            {/* Section Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Quick Actions
                </h2>
                <p className="text-sm text-slate-400">
                    Continue your interview preparation
                </p>
            </div>
            {/* Actions Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {
                    actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <motion.button
                                key={action.title}
                                onClick={() => navigate(action.path!)}
                                whileHover={{
                                    y: -6
                                }}

                                transition={{
                                    duration: 0.2
                                }}

                                className="text-left bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-indigo-500/40 transition">

                                <div className="flex items-center justify-between mb-5">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${action.color}`}>
                                        <Icon
                                            size={24}
                                            className="text-white"
                                        />
                                    </div>
                                    <ArrowRight
                                        size={20}
                                        className="text-slate-500"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    {action.title}
                                </h3>
                                <p className="mt-2 text-sm text-slate-400">
                                    {action.description}
                                </p>
                            </motion.button>
                        );
                    })
                }
            </div>
        </div>
    );

}