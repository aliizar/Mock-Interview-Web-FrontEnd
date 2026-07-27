import {
  LayoutDashboard,
  Mic,
  Bot,
  History,
  FileText,
  Settings,
} from "lucide-react";
const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
    path: "/dashboard",
  },
  {
    title: "Interviews",
    icon: Mic,
    path: "/interview",
  },
  {
    title: "AI Coach",
    icon: Bot,
    path: "/ai-coach",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Resume Review",
    icon: FileText,
    path: "/resume-review",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
export { menuItems };
