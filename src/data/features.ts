import { Brain, Mic, BarChart3, FileText, MessageSquare } from "lucide-react";

export const features = [
  {
    id: 1,
    title: "AI Mock Interview",
    description:
      "Experience realistic interviews powered by advanced AI with instant guidance and evaluation.",
    icon: Brain,
    variant: "large",
    preview: "dashboard",
  },
  {
    id: 2,
    title: "Voice Intelligence",
    description:
      "Analyze confidence, tone, clarity and speaking pace in real time.",
    icon: Mic,
    variant: "small",
    preview: "voice",
  },
  {
    id: 3,
    title: "Performance Analytics",
    description:
      "Track your improvement with visual reports and detailed scoring.",
    icon: BarChart3,
    variant: "small",
    preview: "analytics",
  },
  {
    id: 4,
    title: "Resume Analysis",
    description:
      "Receive AI suggestions to improve your resume before interviews.",
    icon: FileText,
    variant: "large",
    preview: "resume",
  },
  {
    id: 5,
    title: "Smart AI Feedback",
    description:
      "Get personalized recommendations after every interview session.",
    icon: MessageSquare,
    variant: "wide",
    preview: "feedback",
  },
] as const;
