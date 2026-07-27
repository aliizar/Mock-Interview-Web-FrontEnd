import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    ChevronRight,
    Menu,
    Sparkles,
    X,
} from "lucide-react";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
];



export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenu = () => setMobileOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="group flex items-center gap-2 text-2xl font-bold uppercase tracking-tight text-white"
                    >
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 rotate-3 transition-transform group-hover:rotate-0">
                            <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                        </div>

                        <span>
                            Interview
                            <span className="text-indigo-500 group-hover:text-indigo-400">
                                AI
                            </span>
                        </span>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="group relative py-1 text-sm font-medium text-slate-400 transition hover:text-white"
                            >
                                {label}
                                <span className="absolute bottom-0 left-0 h-px w-0 bg-indigo-500 transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            to="/login"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900/40 hover:text-white"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-indigo-500"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                            Get Started
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 md:hidden"
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            onClick={closeMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed left-0 top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 px-6 pb-8 pt-28 shadow-2xl md:hidden"
                        >
                            <div className="space-y-2">
                                {navLinks.map(({ label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        onClick={closeMenu}
                                        className="flex items-center justify-between rounded-xl px-3 py-3 text-slate-300 transition hover:bg-slate-900 hover:text-white"
                                    >
                                        {label}
                                        <ChevronRight className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>

                            <div className="my-6 h-px bg-slate-800" />

                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block rounded-xl border border-slate-800 py-3 text-center text-slate-300 transition hover:bg-slate-900"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={closeMenu}
                                    className="block rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-500"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}