import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="relative border-t border-slate-800 bg-slate-950 py-16">

            <div className="mx-auto max-w-7xl px-6 md:px-10">

                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                <Brain className="h-5 w-5" />
                            </div>

                            <span className="text-lg font-bold text-white">
                                InterviewAI
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                            AI-powered interview preparation platform helping students and
                            professionals land their dream jobs.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-semibold text-white">Product</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-400">
                            <li className="hover:text-white cursor-pointer">Features</li>
                            <li className="hover:text-white cursor-pointer">Pricing</li>
                            <li className="hover:text-white cursor-pointer">How it works</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-white">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-400">
                            <li className="hover:text-white cursor-pointer">About</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-white">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-400">
                            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-white cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500"
                >
                    © {new Date().getFullYear()} InterviewAI. All rights reserved.
                </motion.div>

            </div>
        </footer>
    );
}