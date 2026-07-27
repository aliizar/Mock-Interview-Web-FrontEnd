import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import DashboardPreview from "../sections/Feature/DashboardPreview";
import VoicePreview from "../sections/Feature/VoicePreview";
import AnalyticsPreview from "../sections/Feature/AnalyticsPreview";
import ResumePreview from "../sections/Feature/ResumePreview";
import FeedbackPreview from "../sections/Feature/FeedbackPreview";

type Variant = "small" | "large" | "wide";

type Preview =
    | "dashboard"
    | "voice"
    | "analytics"
    | "resume"
    | "feedback";

interface BentoCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    variant: Variant;
    preview: Preview;
}

export default function BentoCard({
    title,
    description,
    icon: Icon,
    variant,
    preview,
}: BentoCardProps) {
    const spanClass = {
        small: "lg:col-span-1",
        large: "lg:col-span-2",
        wide: "lg:col-span-3",
    };

    const renderPreview = () => {
        switch (preview) {
            case "dashboard":
                return <DashboardPreview />;

            case "voice":
                return <VoicePreview />;

            case "analytics":
                return <AnalyticsPreview />;

            case "resume":
                return <ResumePreview />;

            case "feedback":
                return <FeedbackPreview />;

            default:
                return null;
        }
    };

    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
            }}
            whileHover={{
                y: -8,
            }}
            transition={{
                duration: 0.45,
            }}
            className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/60
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-indigo-500/40
        hover:shadow-2xl
        hover:shadow-indigo-900/20
        ${spanClass[variant]}
      `}
        >
            {/* Animated glow */}

            <motion.div
                animate={{
                    x: [-100, 250],
                    opacity: [0, 0.15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "linear",
                }}
                className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent blur-2xl"
            />

            {/* Icon */}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/15 transition-transform duration-300 group-hover:scale-110">

                <Icon className="h-7 w-7 text-indigo-400" />

            </div>

            {/* Title */}

            <h3 className="mt-6 text-2xl font-bold text-white">

                {title}

            </h3>

            {/* Description */}

            <p className="mt-3 max-w-lg leading-7 text-slate-400">

                {description}

            </p>

            {/* Preview */}

            {renderPreview()}
        </motion.article>
    );
}