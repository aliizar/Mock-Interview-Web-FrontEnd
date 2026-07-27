import { motion } from "framer-motion";

export default function BackgroundEffects() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:48px_48px]" />

            {/* Top Left Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 8, -8, 0],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-indigo-600/20 blur-[140px]"
            />

            {/* Top Right Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[120px]"
            />

            {/* Bottom Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -6, 6, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-180px] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]"
            />

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_70%)]" />
        </div>
    );
}