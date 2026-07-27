import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";


export default function AIInstructions() {

    const instructions = [
        "Keep your camera and microphone enabled.",
        "Answer naturally and explain your thoughts clearly.",
        "Avoid switching tabs during the interview.",
        "The AI will adapt questions according to your answers.",
        "The session will be timed."
    ];


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
        >

            <div className="flex items-center gap-3 mb-5">

                <Sparkles
                    size={20}
                    className="text-indigo-400"
                />

                <h2 className="text-white font-semibold text-lg">
                    AI Instructions
                </h2>

            </div>


            <ul className="space-y-3">

                {instructions.map((item) => (
                    <li
                        key={item}
                        className="text-slate-400 text-sm flex gap-3"
                    >

                        <span className="text-indigo-400">
                            •
                        </span>

                        {item}

                    </li>
                ))}

            </ul>


        </motion.div>
    );
}