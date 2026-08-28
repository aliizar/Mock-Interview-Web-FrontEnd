import {
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { getPreferences } from "../../api/preferences.api";
export default function TopNavbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [userRole, setUserRole] = useState("...");

    const searchItems = [
        "Frontend Developer Interview",
        "Resume Analyzer",
        "AI Coach",
        "Interview History",
    ];

    const notifications = [
        {
            title: "Interview Completed",
            message: "Your score improved to 87%",
        },
        {
            title: "Resume Analysis Done",
            message: "ATS Score: 91%",
        },
        {
            title: "AI Recommendation",
            message: "Practice React questions",
        },
    ];

    useEffect(() => {
        const loadUserRole = async () => {
            try {
                const preferences = await getPreferences();
                setUserRole(preferences.role);
            } catch (error) {
                console.error("Failed to load user role:", error);
            }
        };

        loadUserRole();
    }, []);

    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-8 backdrop-blur-xl">
            {/* Left Side */}
            <div>
                <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
                <p className="text-sm text-slate-400">Welcome back, {user?.name}</p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
                {/* Search */}
                <div className="relative hidden md:block">
                    <div className="flex w-72 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
                        <Search size={18} className="text-slate-400" />
                        <input
                            value={search}
                            onFocus={() => {
                                setShowSearch(true);
                                setShowNotifications(false);
                                setShowProfile(false);
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                        />
                    </div>

                    {showSearch && (
                        <div className="absolute top-14 left-0 z-50 w-72 rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-xl">
                            {searchItems
                                .filter((item) =>
                                    item.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((item) => (
                                    <button
                                        key={item}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-800"
                                    >
                                        {item}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>

                {/* Notification */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowProfile(false);
                            setShowSearch(false);
                        }}
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
                    >
                        <Bell size={20} className="text-slate-300" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500" />
                    </motion.button>

                    {showNotifications && (
                        <div className="absolute right-0 z-50 mt-3 w-80 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-xl">
                            <h3 className="mb-3 font-semibold text-white">Notifications</h3>

                            {notifications.map((item, index) => (
                                <div
                                    key={index}
                                    className="mb-2 rounded-lg bg-slate-800 p-3"
                                >
                                    <p className="text-sm text-white">{item.title}</p>
                                    <p className="mt-1 text-xs text-slate-400">{item.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowProfile(!showProfile);
                            setShowNotifications(false);
                            setShowSearch(false);
                        }}
                        className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 transition hover:bg-slate-800"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                            {user?.name
                                ?.split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>

                        <div className="hidden text-left lg:block">
                            <p className="text-sm font-medium text-white">{user?.name}</p>
                            <p className="text-xs text-slate-400">{userRole}</p>
                        </div>

                        <ChevronDown size={18} className="text-slate-400" />
                    </button>

                    {showProfile && (
                        <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-xl">
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800">
                                <User size={17} />
                                Profile
                            </button>

                            <button
                                onClick={() => navigate("/settings")}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800"
                            >
                                <Settings size={17} />
                                Settings
                            </button>

                            <button
                                onClick={() => logout()}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-slate-800"
                            >
                                <LogOut size={17} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}