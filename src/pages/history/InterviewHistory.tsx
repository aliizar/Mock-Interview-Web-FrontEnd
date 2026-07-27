import {
    Search,
    Calendar,
    Clock,
    ArrowRight,
    TrendingUp
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function InterviewHistory() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("");


    const interviews = [
        {
            id: 1,
            role: "Frontend Developer",
            difficulty: "Intermediate",
            duration: "20 Minutes",
            date: "21 July 2026",
            score: 86,
            previousScore: 78,
            questions: 10,
            responses: 10,
            hasVideo: true,
            hasAudio: true,
        },
        {
            id: 2,
            role: "Backend Developer",
            difficulty: "Advanced",
            duration: "30 Minutes",
            date: "15 July 2026",
            score: 91,
            previousScore: 84,
            questions: 12,
            responses: 12,
            hasVideo: true,
            hasAudio: true,
        },
        {
            id: 3,
            role: "Data Analyst",
            difficulty: "Beginner",
            duration: "10 Minutes",
            date: "08 July 2026",
            score: 75,
            previousScore: 70,
            questions: 8,
            responses: 8,
            hasVideo: false,
            hasAudio: true,
        }
    ];


    const filteredInterviews = interviews.filter((item) =>
        item.role.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}

            <div>
                <h1 className="text-4xl font-bold text-white">
                    Interview History
                </h1>

                <p className="mt-3 text-slate-400">
                    Review your previous interviews, feedback, and progress.
                </p>
            </div>


            {/* Search */}

            <div className="relative">

                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by job role..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
                />

            </div>


            {/* Interview Records */}

            <div className="space-y-6">

                {filteredInterviews.map((interview, index) => (

                    <motion.div
                        key={interview.id}

                        initial={{
                            opacity: 0,
                            y: 20
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: index * 0.1
                        }}

                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                    >

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">


                            {/* Left Section */}

                            <div>

                                <h2 className="text-xl font-semibold text-white">
                                    {interview.role}
                                </h2>


                                <div className="flex flex-wrap gap-3 mt-4">

                                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                                        {interview.difficulty}
                                    </span>


                                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                        {interview.questions} Questions
                                    </span>


                                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                        {interview.responses} Responses
                                    </span>

                                </div>



                                <div className="flex flex-wrap gap-6 mt-5 text-sm text-slate-400">


                                    <span className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        {interview.date}
                                    </span>


                                    <span className="flex items-center gap-2">
                                        <Clock size={16} />
                                        {interview.duration}
                                    </span>


                                </div>


                            </div>



                            {/* Right Section */}


                            <div className="flex flex-col sm:flex-row items-center gap-6">


                                <div className="text-center">

                                    <p className="text-sm text-slate-400">
                                        Score
                                    </p>


                                    <p className="text-3xl font-bold text-white">
                                        {interview.score}%
                                    </p>

                                </div>




                                <div className="flex items-center gap-2 text-green-400">

                                    <TrendingUp size={18} />

                                    <span className="text-white">
                                        +{interview.score - interview.previousScore}%
                                    </span>

                                </div>




                                <button
                                    onClick={() => navigate("/details")}
                                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl transition"
                                >
                                    View Details

                                    <ArrowRight size={18} />

                                </button>


                            </div>


                        </div>



                        {/* Recording Status */}


                        <div className="mt-6 pt-5 border-t border-slate-800 flex gap-4 text-sm">


                            <span className="text-slate-400">
                                Video Recording:
                                <span className="text-white ml-2">
                                    {interview.hasVideo ? "Available" : "Not Available"}
                                </span>
                            </span>


                            <span className="text-slate-400">
                                Audio Recording:
                                <span className="text-white ml-2">
                                    {interview.hasAudio ? "Available" : "Not Available"}
                                </span>
                            </span>


                        </div>


                    </motion.div>

                ))}


            </div>


        </div>
    );
}