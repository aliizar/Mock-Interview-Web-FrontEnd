import { motion } from "framer-motion";

interface StatCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    color: string;
}
export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
    color
}: StatCardProps) {

    return (

        <motion.div

            whileHover={{
                y: -5
            }}

            transition={{
                duration: 0.2
            }}

            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"

        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400">
                        {title}
                    </p>
                    <h2 className="text-4xl font-bold text-white mt-3">
                        {value}
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        {description}
                    </p>
                </div>
                <div
                    className={`
                    h-12
                    w-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${color}
                    `}
                >
                    <Icon
                        size={24}
                        className="text-white"
                    />
                </div>
            </div>
        </motion.div>

    );

}