import {
    Sparkles,
    Briefcase,
    Gauge,
    Clock,
    Play,
    Layers
} from "lucide-react";

import { useState } from "react";
import { motion } from "framer-motion";
import SystemStatus from "../components/interview/SystemStatus";
import AIInstructions from "../components/interview/AIInstructions";
import { useNavigate } from "react-router-dom";

export default function Interview() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [customRole, setCustomRole] = useState("");

    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [duration, setDuration] = useState("");

    const [description, setDescription] = useState("");

    return (
        <div className="max-w-7xl mx-auto space-y-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                    <Sparkles size={20} />
                    <span className="text-sm">
                        AI Interview Assistant
                    </span>
                </div>

                <h1 className="text-4xl font-bold text-white">
                    Prepare for your next interview
                </h1>

                <p className="mt-3 text-slate-400 max-w-2xl">
                    Configure your interview preferences and let AI
                    create a personalized interview experience.
                </p>
            </motion.div>

            {/* Main Grid */}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT SIDE FORM */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-8"
                >
                    {/* Job Role */}
                    <div>
                        <label className="flex items-center gap-2 text-white font-medium mb-3">
                            <Briefcase
                                size={18}
                                className="text-indigo-400"
                            />
                            Job Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}

                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                        >

                            <option value="">
                                Select Role
                            </option>

                            <option>
                                Software Engineer
                            </option>

                            <option>
                                Frontend Developer
                            </option>

                            <option>
                                Backend Developer
                            </option>

                            <option>
                                Full Stack Developer
                            </option>

                            <option>
                                Data Analyst
                            </option>

                            <option>
                                HR Interview
                            </option>

                            <option>
                                Custom Role
                            </option>
                        </select>
                        {
                            role === "Custom Role" && (
                                <input
                                    type="text"
                                    value={customRole}
                                    onChange={(e) => setCustomRole(e.target.value)}
                                    placeholder="Enter your custom role"
                                    className="mt-4 w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"

                                />
                            )
                        }
                    </div>

                    {/* Difficulty + Type */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="flex items-center gap-2 text-white font-medium mb-3">
                                <Gauge
                                    size={18}
                                    className="text-indigo-400"
                                />
                                Difficulty
                            </label>
                            <select

                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"

                            >
                                <option value="">
                                    Select Difficulty
                                </option>

                                <option>
                                    Beginner
                                </option>

                                <option>
                                    Intermediate
                                </option>

                                <option>
                                    Advanced
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-white font-medium mb-3">
                                <Layers
                                    size={18}
                                    className="text-indigo-400"
                                />
                                Interview Type
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"

                            >
                                <option value="">
                                    Select Type
                                </option>

                                <option>
                                    Technical
                                </option>

                                <option>
                                    Behavioral
                                </option>

                                <option>
                                    HR
                                </option>

                                <option>
                                    Mixed
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* Duration */}
                    <div>
                        <label className="flex items-center gap-2 text-white font-medium mb-3">
                            <Clock
                                size={18}
                                className="text-indigo-400"
                            />
                            Interview Duration
                        </label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                        >
                            <option value="">
                                Select Duration
                            </option>
                            <option>
                                10 Minutes
                            </option>
                            <option>
                                20 Minutes
                            </option>
                            <option>
                                30 Minutes
                            </option>
                        </select>
                    </div>
                    {/* Description */}
                    <div>
                        <label className="text-white font-medium mb-3 block">
                            Job Description (Optional)
                        </label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Paste job description here..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none resize-none focus:border-indigo-500"
                        />
                    </div>
                    {/* Button */}
                    <button
                        onClick={() => navigate("/interview/start")}
                        className="w-full flex justify-center items-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-indigo-500/20">
                        <Play size={20} />
                        Start AI Interview
                    </button>
                </motion.div>


                {/* RIGHT SIDE */}
                <div className="space-y-8">
                    <SystemStatus />
                    <AIInstructions />
                </div>
            </div>
        </div>

    );
}