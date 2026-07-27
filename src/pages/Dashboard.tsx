import AIRecommendations from "../components/dashboard/AIRecommendations";
import QuickActions from "../components/dashboard/QuickActions";
import RecentInterviews from "../components/dashboard/RecentInterviews";
import StatsSection from "../components/dashboard/StatsSection";
import WeeklyProgress from "../components/dashboard/WeeklyProgress";
import WelcomeCard from "../components/dashboard/WelcomeCrad";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <StatsSection />
            <WelcomeCard />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <WeeklyProgress />
                <AIRecommendations />
            </div>
            <QuickActions />
            <RecentInterviews />
        </div>

    );

}