import {
    Brain,
    Target,
    MessageCircle,
    PlayCircle
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";


export default function AICoach() {

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hi Ali ! I can help you improve your interview preparation."
        }
    ]);


    const weaknesses = [
        {
            name: "System Design",
            attempts: 4
        },
        {
            name: "Communication",
            attempts: 2
        },
        {
            name: "JavaScript Concepts",
            attempts: 3
        }
    ];


    const practices = [
        "Technical Interview Practice",
        "Behavioral Interview Practice",
        "HR Interview Practice"
    ];



    const handleAsk = () => {

        if (!input.trim()) return;


        const userMessage = {
            sender: "user",
            text: input
        };


        const aiMessage = {
            sender: "ai",
            text:
                "Based on your previous interviews, I recommend focusing on system design, JavaScript concepts, and explaining your technical decisions more clearly."
        };


        setMessages((prev) => [
            ...prev,
            userMessage,
            aiMessage
        ]);


        setInput("");

    };



    return (

        <div className="max-w-5xl mx-auto space-y-8">


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
            >

                <div className="flex items-center gap-2 text-indigo-400">

                    <Brain size={20} />

                    <span className="text-sm">
                        AI Interview Coach
                    </span>

                </div>


                <h1 className="text-3xl font-bold text-white mt-4">
                    Improve your interview performance
                </h1>


                <p className="text-slate-400 mt-2 max-w-xl">
                    AI analyzes your previous interviews and helps you
                    improve weak areas.
                </p>

            </motion.div>





            {/* AI Insight */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">


                <div className="flex items-center gap-3 mb-4">

                    <MessageCircle
                        size={20}
                        className="text-indigo-400"
                    />

                    <h2 className="text-white font-semibold">
                        AI Insight
                    </h2>

                </div>


                <p className="text-slate-300 leading-relaxed">
                    Based on your recent interviews, your technical
                    knowledge is improving. Focus more on system design
                    explanations and structuring behavioral answers.
                </p>


            </div>






            {/* Weakness Tracker */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">


                <div className="flex items-center gap-3 mb-5">

                    <Target
                        size={20}
                        className="text-indigo-400"
                    />

                    <h2 className="text-white font-semibold">
                        Recurring Weaknesses
                    </h2>

                </div>



                <div className="space-y-3">


                    {
                        weaknesses.map((item) => (

                            <div
                                key={item.name}
                                className="flex justify-between bg-slate-800 rounded-xl px-4 py-3"
                            >

                                <span className="text-slate-300">
                                    {item.name}
                                </span>


                                <span className="text-slate-400 text-sm">
                                    Detected {item.attempts} times
                                </span>


                            </div>

                        ))
                    }


                </div>


            </div>







            {/* Practice */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">


                <div className="flex items-center gap-3 mb-5">

                    <PlayCircle
                        size={20}
                        className="text-indigo-400"
                    />

                    <h2 className="text-white font-semibold">
                        Practice With AI
                    </h2>

                </div>



                <div className="grid md:grid-cols-3 gap-4">


                    {
                        practices.map((practice) => (

                            <button
                                key={practice}
                                className="bg-slate-800 hover:bg-indigo-500 text-slate-300 hover:text-white rounded-xl p-4 text-sm transition text-left"
                            >

                                {practice}

                            </button>

                        ))
                    }


                </div>


            </div>








            {/* AI Chat */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">


                <h2 className="text-white font-semibold mb-5">
                    Ask AI Coach
                </h2>



                <div className="space-y-3 max-h-72 overflow-y-auto mb-5">


                    {
                        messages.map((message, index) => (

                            <div
                                key={index}
                                className={
                                    message.sender === "user"
                                        ?
                                        "bg-indigo-500/20 text-indigo-200 rounded-xl p-3 ml-10"
                                        :
                                        "bg-slate-800 text-slate-300 rounded-xl p-3 mr-10"
                                }
                            >

                                {message.text}

                            </div>

                        ))
                    }


                </div>





                <div className="flex gap-3">


                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                handleAsk();
                            }

                        }}
                        placeholder="Ask about your interview improvement..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />



                    <button
                        onClick={handleAsk}
                        className="bg-indigo-500 hover:bg-indigo-600 px-5 rounded-xl text-white"
                    >

                        Ask

                    </button>


                </div>



            </div>



        </div>

    );
}