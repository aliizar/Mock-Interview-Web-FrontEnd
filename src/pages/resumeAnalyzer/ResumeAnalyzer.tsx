import { useState } from "react";
import { motion } from "framer-motion";
import {
    Award,
    CheckCircle,
    AlertTriangle,
    Sparkles,
    FileText,
    Loader2
} from "lucide-react";

import ResumeUpload from "./ResumeUpload";
import ScoreCard from "./ScoreCard";


export default function ResumeAnalyzer() {

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);


    const handleAnalyze = () => {
        setIsAnalyzing(true);

        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
        }, 3000);
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >

            {/* Header */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Resume Analyzer
                    </h1>

                    <p className="mt-2 max-w-2xl text-slate-400">
                        Upload your resume and receive AI-powered feedback
                        to improve ATS compatibility and increase your
                        interview chances.
                    </p>
                </div>




            </div>



            {/* Upload Section */}
            {!analysisComplete && !isAnalyzing && (

                <ResumeUpload
                    onAnalyze={handleAnalyze}
                />

            )}



            {/* AI Processing */}
            {isAnalyzing && (

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="
                    rounded-2xl
                    border border-slate-800
                    bg-slate-900
                    p-10
                    text-center
                    "
                >

                    <Loader2
                        size={45}
                        className="
                        mx-auto
                        animate-spin
                        text-indigo-400
                        "
                    />


                    <h2 className="mt-6 text-xl font-semibold text-white">
                        AI is analyzing your resume
                    </h2>


                    <p className="mt-2 text-slate-400">
                        Checking ATS compatibility,
                        grammar and skills...
                    </p>


                    <div className="
                    mt-8
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-slate-800
                    ">

                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "85%" }}
                            transition={{
                                duration: 3
                            }}
                            className="
                            h-full
                            rounded-full
                            bg-indigo-500
                            "
                        />

                    </div>

                </motion.div>

            )}




            {/* Results */}
            {analysisComplete && (

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                >


                    {/* Score Cards */}
                    <div className="
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                    xl:grid-cols-4
                    ">

                        <ScoreCard
                            title="ATS Score"
                            value="91%"
                            status="Excellent"
                            icon={<Award />}
                        />

                        <ScoreCard
                            title="Grammar"
                            value="96%"
                            status="Excellent"
                            icon={<CheckCircle />}
                        />


                        <ScoreCard
                            title="Missing Skills"
                            value="6"
                            status="Needs Work"
                            icon={<AlertTriangle />}
                        />


                        <ScoreCard
                            title="Keywords"
                            value="24"
                            status="Strong"
                            icon={<Sparkles />}
                        />

                    </div>




                    {/* Feedback */}
                    <div className="
                    grid
                    gap-6
                    lg:grid-cols-2
                    ">


                        <FeedbackCard
                            title="Formatting Suggestions"
                            items={[
                                "Professional layout",
                                "Clear section headings",
                                "Reduce unnecessary spacing",
                                "Improve consistency"
                            ]}
                        />


                        <FeedbackCard
                            title="Grammar Review"
                            items={[
                                "No spelling mistakes",
                                "Strong action verbs",
                                "Avoid passive sentences",
                                "Improve sentence length"
                            ]}
                        />

                    </div>





                    {/* Skills */}
                    <div className="
                    grid
                    gap-6
                    lg:grid-cols-2
                    ">


                        <TagCard
                            title="Missing Skills"
                            tags={[
                                "TypeScript",
                                "Docker",
                                "Testing",
                                "CI/CD"
                            ]}
                        />


                        <TagCard
                            title="Recommended Keywords"
                            tags={[
                                "React",
                                "Tailwind CSS",
                                "REST API",
                                "Performance"
                            ]}
                        />


                    </div>





                    {/* Project Feedback */}
                    <InfoCard title="Project Feedback">

                        <div className="space-y-5">

                            <Project
                                name="Mock AI Interview"
                                rating="★★★★★"
                                text="Great project. Mention AI technologies and architecture."
                            />


                            <Project
                                name="News Application"
                                rating="★★★★☆"
                                text="Explain API handling and performance improvements."
                            />


                            <Project
                                name="Food Mart"
                                rating="★★★★☆"
                                text="Mention Redux and state management."
                            />

                        </div>


                    </InfoCard>





                    {/* Recommendation */}
                    <InfoCard title="AI Recommendation">

                        <p className="text-slate-300 leading-relaxed">
                            Your resume is strong for frontend roles.
                            Focus on adding measurable achievements,
                            TypeScript experience and testing tools
                            to improve your chances.
                        </p>


                    </InfoCard>



                    <button
                        onClick={() => {
                            setAnalysisComplete(false)
                        }}
                        className="
                        flex items-center gap-2
                        rounded-xl
                        bg-indigo-600
                        px-5 py-3
                        text-white
                        hover:bg-indigo-500
                        "
                    >
                        <FileText size={18} />
                        Analyze Another Resume
                    </button>


                </motion.div>

            )}

        </motion.div>
    )
}




function FeedbackCard({
    title,
    items
}: {
    title: string;
    items: string[];
}) {

    return (

        <InfoCard title={title}>

            <div className="space-y-3">

                {
                    items.map((item, index) => (

                        <div
                            key={index}
                            className="
                        flex
                        items-center
                        gap-3
                        text-slate-300
                        "
                        >

                            <CheckCircle
                                size={17}
                                className="text-emerald-400"
                            />

                            {item}

                        </div>

                    ))
                }

            </div>

        </InfoCard>

    )
}




function TagCard({
    title,
    tags
}: {
    title: string;
    tags: string[];
}) {

    return (

        <InfoCard title={title}>

            <div className="flex flex-wrap gap-3">

                {
                    tags.map(tag => (

                        <span
                            key={tag}
                            className="
                        rounded-full
                        border border-slate-700
                        px-4 py-2
                        text-sm
                        text-slate-300
                        "
                        >

                            {tag}

                        </span>

                    ))
                }

            </div>


        </InfoCard>

    )
}




function Project({
    name,
    rating,
    text
}: {
    name: string;
    rating: string;
    text: string;
}) {

    return (

        <div>

            <h3 className="font-semibold text-white">
                {name}
            </h3>

            <p className="text-yellow-400">
                {rating}
            </p>

            <p className="mt-1 text-sm text-slate-400">
                {text}
            </p>

        </div>

    )

}





function InfoCard({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) {

    return (

        <div
            className="
        rounded-2xl
        border border-slate-800
        bg-slate-900
        p-6
        "
        >

            <h2 className="
            mb-5
            text-lg
            font-semibold
            text-white
            ">
                {title}
            </h2>


            {children}

        </div>

    )
}