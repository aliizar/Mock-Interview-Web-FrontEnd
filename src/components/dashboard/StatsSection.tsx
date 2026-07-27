import {
    Target,
    FileCheck,
    Flame,
    Trophy
} from "lucide-react";


import StatCard from "./StatCard";


const stats = [

    {
        title: "Overall Score",
        value: "87%",
        description: "+5% from last week",
        icon: Target,
        color: "bg-indigo-500"
    },


    {
        title: "Last Interview",
        value: "92%",
        description: "React Interview",
        icon: FileCheck,
        color: "bg-emerald-500"
    },


    {
        title: "Interview Streak",
        value: "7 Days",
        description: "Keep going 🔥",
        icon: Flame,
        color: "bg-orange-500"
    },


    {
        title: "Practice Goal",
        value: "3/5",
        description: "Interviews completed",
        icon: Trophy,
        color: "bg-purple-500"
    }

];


export default function StatsSection() {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


            {
                stats.map((item) => (

                    <StatCard
                        key={item.title}
                        {...item}
                    />

                ))
            }


        </div>

    );

}