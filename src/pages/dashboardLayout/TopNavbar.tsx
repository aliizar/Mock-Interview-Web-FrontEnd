import {
    Search,
    Bell,
    ChevronDown,
    Settings,
    LogOut,
    Trophy,
    CircleX,
    CalendarDays,
    ExternalLink,
    Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { getPreferences } from "../../api/preferences.api";
import {
    getNotifications,
    type Notification,
} from "../../api/notifications.api";

type NotificationFilter =
    | "ALL"
    | "SUCCESS"
    | "ERROR"
    | "REMINDER";

export default function TopNavbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [userRole, setUserRole] = useState("...");
    const [notifications, setNotifications] = useState<
        Notification[]
    >([]);
    const [activeFilter, setActiveFilter] =
        useState<NotificationFilter>("ALL");
    const [readNotifications, setReadNotifications] =
        useState<string[]>([]);

    const searchItems = [
        "Frontend Developer Interview",
        "Resume Analyzer",
        "AI Coach",
        "Interview History",
    ];

    useEffect(() => {
        const loadUserRole = async () => {
            try {
                const preferences = await getPreferences();
                setUserRole(preferences.role);
            } catch (error) {
                console.error(
                    "Failed to load user role:",
                    error,
                );
            }
        };

        loadUserRole();
    }, []);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error(
                    "Failed to load notifications:",
                    error,
                );
            }
        };

        loadNotifications();
    }, []);

    const unreadNotifications = notifications.filter(
        (notification) =>
            !readNotifications.includes(notification.id),
    );

    const filteredNotifications = useMemo(() => {
        if (activeFilter === "ALL") {
            return notifications;
        }

        return notifications.filter(
            (notification) =>
                notification.type === activeFilter,
        );
    }, [notifications, activeFilter]);

    const successCount = notifications.filter(
        (notification) => notification.type === "SUCCESS",
    ).length;

    const errorCount = notifications.filter(
        (notification) => notification.type === "ERROR",
    ).length;

    const reminderCount = notifications.filter(
        (notification) => notification.type === "REMINDER",
    ).length;

    function getRelativeTime(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();

        const difference =
            now.getTime() - date.getTime();

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes}m ago`;
        }

        if (hours < 24) {
            return `${hours}h ago`;
        }

        if (days < 7) {
            return `${days}d ago`;
        }

        return date.toLocaleDateString();
    }

    function getNotificationIcon(
        type: Notification["type"],
    ) {
        if (type === "SUCCESS") {
            return Trophy;
        }

        if (type === "ERROR") {
            return CircleX;
        }

        return CalendarDays;
    }

    function getNotificationStyles(
        type: Notification["type"],
    ) {
        if (type === "SUCCESS") {
            return {
                wrapper:
                    "border-emerald-500/30 bg-emerald-500/[0.07] hover:bg-emerald-500/[0.11]",
                iconWrapper:
                    "border-emerald-500/30 bg-emerald-500/10",
                icon: "text-emerald-400",
                dot: "bg-emerald-400",
                accent: "text-emerald-400",
            };
        }

        if (type === "ERROR") {
            return {
                wrapper:
                    "border-red-500/30 bg-red-500/[0.07] hover:bg-red-500/[0.11]",
                iconWrapper:
                    "border-red-500/30 bg-red-500/10",
                icon: "text-red-400",
                dot: "bg-red-400",
                accent: "text-red-400",
            };
        }

        return {
            wrapper:
                "border-amber-500/30 bg-amber-500/[0.07] hover:bg-amber-500/[0.11]",
            iconWrapper:
                "border-amber-500/30 bg-amber-500/10",
            icon: "text-amber-400",
            dot: "bg-amber-400",
            accent: "text-amber-400",
        };
    }

    function markAllAsRead() {
        setReadNotifications(
            notifications.map(
                (notification) => notification.id,
            ),
        );
    }

    function toggleNotifications() {
        setShowNotifications(!showNotifications);
        setShowProfile(false);
        setShowSearch(false);
    }

    return (
        <header className="relative z-[100] flex h-20 items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-8 backdrop-blur-xl">            {/* Left Side */}
            <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Dashboard
                </h2>

                <p className="mt-0.5 text-sm text-slate-400">
                    Welcome back,{" "}
                    <span className="text-indigo-400">
                        {user?.name}
                    </span>
                </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
                {/* Search */}
                <div className="relative hidden md:block">
                    <div className="flex w-72 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 shadow-inner shadow-white/[0.02]">
                        <Search
                            size={18}
                            className="text-slate-400"
                        />

                        <input
                            value={search}
                            onFocus={() => {
                                setShowSearch(true);
                                setShowNotifications(false);
                                setShowProfile(false);
                            }}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        />
                    </div>

                    <AnimatePresence>
                        {showSearch && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 0.98,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 0.98,
                                }}
                                className="absolute left-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                            >
                                {searchItems
                                    .filter((item) =>
                                        item
                                            .toLowerCase()
                                            .includes(
                                                search.toLowerCase(),
                                            ),
                                    )
                                    .map((item) => (
                                        <button
                                            key={item}
                                            className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                                        >
                                            {item}
                                        </button>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Notification */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={toggleNotifications}
                        className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition ${showNotifications
                            ? "border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                            : "border-slate-800 bg-slate-900 hover:bg-slate-800"
                            }`}
                    >
                        <Bell
                            size={20}
                            className={
                                showNotifications
                                    ? "text-indigo-400"
                                    : "text-slate-300"
                            }
                        />

                        {unreadNotifications.length > 0 && (
                            <>
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/60" />

                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-slate-950 bg-indigo-500 px-1 text-[10px] font-bold text-white">
                                    {unreadNotifications.length >
                                        9
                                        ? "9+"
                                        : unreadNotifications.length}
                                </span>
                            </>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -12,
                                    scale: 0.97,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -12,
                                    scale: 0.97,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="absolute right-0 top-14 z-50 w-[430px] overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                            >
                                {/* Header */}
                                <div className="border-b border-slate-800/80 px-5 pb-4 pt-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                Notifications
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Stay updated with your interview activity
                                            </p>
                                        </div>

                                        {unreadNotifications.length >
                                            0 && (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        markAllAsRead
                                                    }
                                                    className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                                                >
                                                    <Check
                                                        size={14}
                                                    />
                                                    Mark all as read
                                                </button>
                                            )}
                                    </div>

                                    {/* Filters */}
                                    <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                                        <NotificationFilterButton
                                            active={
                                                activeFilter ===
                                                "ALL"
                                            }
                                            onClick={() =>
                                                setActiveFilter(
                                                    "ALL",
                                                )
                                            }
                                            label="All"
                                            count={
                                                notifications.length
                                            }
                                        />

                                        <NotificationFilterButton
                                            active={
                                                activeFilter ===
                                                "SUCCESS"
                                            }
                                            onClick={() =>
                                                setActiveFilter(
                                                    "SUCCESS",
                                                )
                                            }
                                            label="Success"
                                            count={
                                                successCount
                                            }
                                            dot="bg-emerald-400"
                                        />

                                        <NotificationFilterButton
                                            active={
                                                activeFilter ===
                                                "ERROR"
                                            }
                                            onClick={() =>
                                                setActiveFilter(
                                                    "ERROR",
                                                )
                                            }
                                            label="Error"
                                            count={
                                                errorCount
                                            }
                                            dot="bg-red-400"
                                        />

                                        <NotificationFilterButton
                                            active={
                                                activeFilter ===
                                                "REMINDER"
                                            }
                                            onClick={() =>
                                                setActiveFilter(
                                                    "REMINDER",
                                                )
                                            }
                                            label="Reminder"
                                            count={
                                                reminderCount
                                            }
                                            dot="bg-amber-400"
                                        />
                                    </div>
                                </div>

                                {/* Notification List */}
                                <div className="max-h-[430px] overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
                                    {filteredNotifications.length ===
                                        0 ? (
                                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 py-12">
                                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
                                                <Bell
                                                    size={20}
                                                    className="text-slate-600"
                                                />
                                            </div>

                                            <p className="text-sm font-medium text-slate-300">
                                                No notifications
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                You're all caught up.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {filteredNotifications.map(
                                                (
                                                    notification,
                                                    index,
                                                ) => {
                                                    const Icon =
                                                        getNotificationIcon(
                                                            notification.type,
                                                        );

                                                    const styles =
                                                        getNotificationStyles(
                                                            notification.type,
                                                        );

                                                    const isRead =
                                                        readNotifications.includes(
                                                            notification.id,
                                                        );

                                                    return (
                                                        <motion.div
                                                            key={
                                                                notification.id
                                                            }
                                                            initial={{
                                                                opacity: 0,
                                                                y: 8,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    index *
                                                                    0.05,
                                                            }}
                                                            className={`group relative rounded-xl border p-4 transition ${styles.wrapper} ${isRead
                                                                ? "opacity-60"
                                                                : ""
                                                                }`}
                                                        >
                                                            <div className="flex gap-3">
                                                                {/* Icon */}
                                                                <div
                                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${styles.iconWrapper}`}
                                                                >
                                                                    <Icon
                                                                        size={
                                                                            21
                                                                        }
                                                                        className={
                                                                            styles.icon
                                                                        }
                                                                    />
                                                                </div>

                                                                {/* Content */}
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-start justify-between gap-3">
                                                                        <div>
                                                                            <p className="text-sm font-semibold text-white">
                                                                                {
                                                                                    notification.title
                                                                                }
                                                                            </p>

                                                                            <p className="mt-1 text-xs leading-5 text-slate-400">
                                                                                {
                                                                                    notification.message
                                                                                }
                                                                            </p>
                                                                        </div>

                                                                        <span className="shrink-0 text-[11px] text-slate-500">
                                                                            {getRelativeTime(
                                                                                notification.createdAt,
                                                                            )}
                                                                        </span>
                                                                    </div>

                                                                    {/* Score badge */}
                                                                    {notification.type ===
                                                                        "SUCCESS" &&
                                                                        notification.message.match(
                                                                            /\d+%/,
                                                                        ) && (
                                                                            <div className="mt-3 inline-flex rounded-lg bg-slate-950/70 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                                                                                {
                                                                                    notification.message.match(
                                                                                        /\d+%/,
                                                                                    )?.[0]
                                                                                }
                                                                            </div>
                                                                        )}
                                                                </div>

                                                                {/* Unread dot */}
                                                                {!isRead && (
                                                                    <span
                                                                        className={`absolute right-3 top-3 h-1.5 w-1.5 rounded-full ${styles.dot}`}
                                                                    />
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="border-t border-slate-800/80 p-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowNotifications(
                                                false,
                                            );
                                            navigate(
                                                "/history",
                                            );
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-indigo-400 transition hover:bg-indigo-500/10 hover:text-indigo-300"
                                    >
                                        View all interview history
                                        <ExternalLink
                                            size={15}
                                        />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowProfile(!showProfile);
                            setShowNotifications(false);
                            setShowSearch(false);
                        }}
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition ${showProfile
                            ? "border-indigo-500/30 bg-indigo-500/10"
                            : "border-slate-800 bg-slate-900 hover:bg-slate-800"
                            }`}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                            {user?.name
                                ?.split(" ")
                                .map(
                                    (word) =>
                                        word[0],
                                )
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>

                        <div className="hidden text-left lg:block">
                            <p className="text-sm font-medium text-white">
                                {user?.name}
                            </p>

                            <p className="text-xs text-slate-400">
                                {userRole}
                            </p>
                        </div>

                        <ChevronDown
                            size={18}
                            className={`text-slate-400 transition-transform ${showProfile
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 0.98,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 0.98,
                                }}
                                className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                            >
                                <button
                                    onClick={() =>
                                        navigate(
                                            "/settings",
                                        )
                                    }
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                                >
                                    <Settings size={17} />
                                    Settings
                                </button>

                                <button
                                    onClick={() =>
                                        logout()
                                    }
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

interface NotificationFilterButtonProps {
    active: boolean;
    onClick: () => void;
    label: string;
    count: number;
    dot?: string;
}

function NotificationFilterButton({
    active,
    onClick,
    label,
    count,
    dot,
}: NotificationFilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${active
                ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-400"
                : "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                }`}
        >
            {dot && (
                <span
                    className={`h-2 w-2 rounded-full ${dot}`}
                />
            )}

            {label}

            <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${active
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "bg-slate-800 text-slate-500"
                    }`}
            >
                {count}
            </span>
        </button>
    );
}