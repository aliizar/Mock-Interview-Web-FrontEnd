import { useState } from "react";
import TopNavbar from "../../pages/dashboardLayout/TopNavbar";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/dashboardLayout/Sidebar";

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            <div className="hidden lg:block h-screen sticky top-0">
                <Sidebar />
            </div>
            {
                open && (
                    <>
                        <div
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{
                                x: -300
                            }}
                            animate={{
                                x: 0
                            }}
                            transition={{
                                duration: 0.3
                            }}
                            className="fixed left-0 top-0 z-50 lg:hidden"
                        >
                            <Sidebar />
                        </motion.div>
                    </>
                )
            }
            <div className="flex-1">
                <div className="lg:hidden h-16 flex items-center px-5 border-b border-slate-800">
                    <button
                        onClick={() => setOpen(true)}
                        className="p-2 rounded-lg hover:bg-slate-800"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="ml-4 font-semibold">
                        InterviewAI
                    </h1>
                </div>
                <TopNavbar />
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>

    );

}