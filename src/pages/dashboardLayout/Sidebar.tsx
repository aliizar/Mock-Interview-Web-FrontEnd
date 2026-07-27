import { motion } from "framer-motion";
import { Bot, LogOut } from "lucide-react";
import { menuItems } from "../../data/menu";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <aside className="w-72 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 px-6 py-8 flex flex-col">

            {/* ================= Logo ================= */}
            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Bot
                            size={25}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-white">
                            InterviewAI
                        </h1>
                        <p className="text-xs text-slate-400">
                            Smart Interview Coach
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= Navigation ================= */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <motion.button
                            onClick={() => navigate(item.path)}
                            key={item.title}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className={`
                                w-full flex items-center gap-4 px-4 py-3 rounded-xl
                                text-sm font-medium transition-all duration-300
                               ${location.pathname === item.path
                                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }
                            `}
                        >
                            <Icon size={20} />

                            <span>{item.title}</span>
                        </motion.button>
                    );
                })}
            </nav>

            {/* ================= User Section ================= */}
            <div className="pt-6 border-t border-slate-800">

                {/* User Card */}
                <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700"
                >
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                            AH
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white truncate">
                                Ali Zar
                            </h3>

                            <p className="text-xs text-slate-400 truncate">
                                Computer Engineer
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Logout */}
                <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                    <LogOut size={20} />

                    <span className="font-medium">
                        Logout
                    </span>
                </motion.button>

            </div>

        </aside>
    );
}