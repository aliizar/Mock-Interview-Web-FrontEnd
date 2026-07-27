import {
    ArrowLeft,
    Calendar,
    Clock,
    Play,
    Video,
    Mic,
    TrendingUp,
    CheckCircle,
    AlertCircle
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function InterviewDetails() {

    const navigate = useNavigate();


    const questions = [
        {
            question: "Explain the Virtual DOM in React.",
            answer:
                "Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates.",
            feedback:
                "Good explanation. Add more details about reconciliation and diffing algorithm.",
            score: 8
        },
        {
            question: "What are React Hooks?",
            answer:
                "Hooks allow functional components to use state and lifecycle features.",
            feedback:
                "Good understanding. Explain useMemo and useCallback usage.",
            score: 9
        },
        {
            question: "How do you optimize frontend performance?",
            answer:
                "By reducing unnecessary renders and optimizing assets.",
            feedback:
                "Good answer. Include lazy loading and code splitting.",
            score: 7
        }
    ];


    return (
        <div className="max-w-6xl mx-auto space-y-8">


            {/* Back Button */}

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
                <ArrowLeft size={18} />
                Back to History
            </button>



            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >

                <h1 className="text-3xl font-bold text-white">
                    Frontend Developer Interview
                </h1>


                <div className="flex flex-wrap gap-6 mt-5 text-slate-400 text-sm">

                    <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        21 July 2026
                    </span>


                    <span className="flex items-center gap-2">
                        <Clock size={16} />
                        20 Minutes
                    </span>

                </div>


                <div className="mt-6">

                    <p className="text-slate-400">
                        Overall Score
                    </p>

                    <p className="text-5xl font-bold text-green-400">
                        86%
                    </p>

                </div>

            </motion.div>




            {/* Progress Comparison */}


            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                <div className="flex items-center gap-3 mb-5">

                    <TrendingUp className="text-indigo-400" />

                    <h2 className="text-xl font-semibold text-white">
                        Progress Comparison
                    </h2>

                </div>


                <div className="grid md:grid-cols-3 gap-5">


                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">
                            Previous Score
                        </p>

                        <p className="text-3xl text-white font-bold">
                            78%
                        </p>
                    </div>


                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">
                            Current Score
                        </p>

                        <p className="text-3xl text-green-400 font-bold">
                            86%
                        </p>
                    </div>


                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">
                            Improvement
                        </p>

                        <p className="text-3xl text-indigo-400 font-bold">
                            +8%
                        </p>
                    </div>


                </div>

            </div>





            {/* Recordings */}


            <div className="grid md:grid-cols-2 gap-6">


                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                    <div className="flex items-center gap-3">

                        <Video className="text-indigo-400" />

                        <h2 className="text-white font-semibold">
                            Video Recording
                        </h2>

                    </div>


                    <button className="mt-5 flex items-center gap-2 bg-indigo-500 text-white px-5 py-3 rounded-xl">

                        <Play size={18} />

                        Play Video

                    </button>

                </div>




                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                    <div className="flex items-center gap-3">

                        <Mic className="text-indigo-400" />

                        <h2 className="text-white font-semibold">
                            Audio Recording
                        </h2>

                    </div>


                    <button className="mt-5 flex items-center gap-2 bg-indigo-500 text-white px-5 py-3 rounded-xl">

                        <Play size={18} />

                        Play Audio

                    </button>

                </div>


            </div>





            {/* Questions */}


            <div className="space-y-6">


                <h2 className="text-2xl font-bold text-white">
                    Questions & AI Feedback
                </h2>


                {
                    questions.map((item, index) => (

                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                        >

                            <h3 className="text-white font-semibold">
                                Question {index + 1}
                            </h3>


                            <p className="text-slate-300 mt-3">
                                {item.question}
                            </p>



                            <div className="mt-5">

                                <p className="text-sm text-indigo-400">
                                    Your Response
                                </p>

                                <p className="text-slate-400 mt-2">
                                    {item.answer}
                                </p>

                            </div>



                            <div className="mt-5">

                                <p className="text-sm text-green-400">
                                    AI Feedback
                                </p>

                                <p className="text-slate-400 mt-2">
                                    {item.feedback}
                                </p>

                            </div>



                            <div className="mt-5 flex items-center gap-2">

                                {
                                    item.score >= 8 ?

                                        <CheckCircle className="text-green-400" />

                                        :

                                        <AlertCircle className="text-yellow-400" />

                                }


                                <span className="text-white">
                                    Score: {item.score}/10
                                </span>

                            </div>


                        </motion.div>

                    ))
                }


            </div>


        </div>
    );
}