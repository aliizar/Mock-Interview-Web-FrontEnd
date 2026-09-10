import { useState } from "react";
import { motion } from "framer-motion";
import {
    Award,
    CheckCircle,
    AlertTriangle,
    Sparkles,
    Loader2,
    RotateCcw,
} from "lucide-react";

import ResumeUpload from "./ResumeUpload";
import ScoreCard from "./ScoreCard";
import { analyzeResume } from "../../api/resume.api";
import type { ResumeAnalysis } from "../../api/resume.api";

export default function ResumeAnalyzer() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<ResumeAnalysis | null>(null);
    useState<ResumeAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (file: File, targetRole: string) => {
        setIsAnalyzing(true);
        setError(null);

        try {
            const analysis = await analyzeResume(file, targetRole);

            setAnalysisResults(analysis);
            setAnalysisComplete(true);
        } catch (error) {
            console.error("Resume analysis error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while analyzing your resume.",
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setAnalysisComplete(false);
        setIsAnalyzing(false);
        setAnalysisResults(null);
        setError(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8"
        >
            {/* Header */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Resume Analyzer
                    </h1>

                    <p className="mt-2 max-w-2xl text-slate-400">
                        Upload your resume and receive AI-powered feedback to
                        improve ATS compatibility and increase your interview
                        chances.
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && !isAnalyzing && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                    {error}
                </div>
            )}

            {/* Upload Section */}
            {!analysisComplete && !isAnalyzing && (
                <ResumeUpload onAnalyze={handleAnalyze} />
            )}

            {/* AI Processing State */}
            {isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center shadow-xl"
                >
                    <Loader2
                        size={45}
                        className="mx-auto animate-spin text-indigo-400"
                        aria-hidden="true"
                    />

                    <h2 className="mt-6 text-xl font-semibold text-white">
                        AI is analyzing your resume
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Checking ATS compatibility, grammar, skills, keywords,
                        and projects...
                    </p>

                    <div className="mx-auto mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                                duration: 8,
                                ease: "easeInOut",
                            }}
                            className="h-full rounded-full bg-indigo-500"
                        />
                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                        This may take a few moments.
                    </p>
                </motion.div>
            )}

            {/* Results Section */}
            {analysisComplete && analysisResults && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                >
                    {/* Score Cards Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <ScoreCard
                            title="ATS Score"
                            value={`${analysisResults.atsScore}%`}
                            status={
                                analysisResults.atsScore >= 80
                                    ? "Excellent"
                                    : analysisResults.atsScore >= 60
                                        ? "Good"
                                        : "Needs Work"
                            }
                            icon={<Award className="text-indigo-400" />}
                        />

                        <ScoreCard
                            title="Grammar"
                            value={`${analysisResults.grammarScore}%`}
                            status={
                                analysisResults.grammarScore >= 80
                                    ? "Excellent"
                                    : analysisResults.grammarScore >= 60
                                        ? "Good"
                                        : "Needs Work"
                            }
                            icon={
                                <CheckCircle className="text-emerald-400" />
                            }
                        />

                        <ScoreCard
                            title="Missing Skills"
                            value={analysisResults.missingSkillsCount.toString()}
                            status={
                                analysisResults.missingSkillsCount === 0
                                    ? "Excellent"
                                    : analysisResults.missingSkillsCount <= 3
                                        ? "Good"
                                        : "Needs Work"
                            }
                            icon={
                                <AlertTriangle className="text-amber-400" />
                            }
                        />

                        <ScoreCard
                            title="Keywords"
                            value={analysisResults.keywordCount.toString()}
                            status="Strong"
                            icon={<Sparkles className="text-indigo-400" />}
                        />
                    </div>

                    {/* Feedback Section */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <FeedbackCard
                            title="Formatting Suggestions"
                            items={analysisResults.formattingSuggestions}
                        />

                        <FeedbackCard
                            title="Grammar Review"
                            items={analysisResults.grammarReview}
                        />
                    </div>

                    {/* Tag Cards Section */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <TagCard
                            title="Missing Skills"
                            tags={analysisResults.missingSkills}
                            variant="warning"
                        />

                        <TagCard
                            title="Recommended Keywords"
                            tags={analysisResults.recommendedKeywords}
                            variant="primary"
                        />
                    </div>

                    {/* Project Feedback Card */}
                    <InfoCard title="Project Feedback">
                        <div className="space-y-5 divide-y divide-slate-800/60">
                            {analysisResults.projects.map((project: { name: string; rating: string; feedback: string; }, idx: number) => (
                                <Project
                                    key={`${project.name}-${idx}`}
                                    name={project.name}
                                    rating={project.rating}
                                    text={project.feedback}
                                    isFirst={idx === 0}
                                />
                            ))}
                        </div>
                    </InfoCard>

                    {/* Recommendation Card */}
                    <InfoCard title="AI Recommendation">
                        <p className="leading-relaxed text-slate-300">
                            {analysisResults.recommendation}
                        </p>
                    </InfoCard>

                    {/* Reset / Analyze Another Button */}
                    <div className="flex justify-start">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95"
                        >
                            <RotateCcw size={18} />
                            Analyze Another Resume
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

function FeedbackCard({
    title,
    items,
}: {
    title: string;
    items: string[];
}) {
    return (
        <InfoCard title={title}>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 text-slate-300"
                    >
                        <CheckCircle
                            size={17}
                            className="shrink-0 text-emerald-400"
                        />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </InfoCard>
    );
}

function TagCard({
    title,
    tags,
    variant = "primary",
}: {
    title: string;
    tags: string[];
    variant?: "primary" | "warning";
}) {
    const badgeClasses =
        variant === "warning"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
            : "border-slate-700 bg-slate-800/50 text-slate-300";

    return (
        <InfoCard title={title}>
            <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${badgeClasses}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </InfoCard>
    );
}

function Project({
    name,
    rating,
    text,
    isFirst = false,
}: {
    name: string;
    rating: string;
    text: string;
    isFirst?: boolean;
}) {
    return (
        <div className={isFirst ? "" : "pt-4"}>
            <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">{name}</h3>

                <span className="shrink-0 text-sm font-medium text-indigo-300">
                    {rating}
                </span>
            </div>

            <p className="mt-1 text-sm text-slate-400">{text}</p>
        </div>
    );
}

function InfoCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
            {children}
        </div>
    );
}