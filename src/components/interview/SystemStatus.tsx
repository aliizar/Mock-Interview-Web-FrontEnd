import {
    Camera,
    Mic,
    Wifi,
    CheckCircle,
    XCircle,
    Loader
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function SystemStatus() {
    const [camera, setCamera] = useState("Checking...");
    const [microphone, setMicrophone] = useState("Checking...");
    const [internet, setInternet] = useState("Checking...");


    const checkCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            setCamera("Ready");

            stream.getTracks().forEach(track => track.stop());
        } catch {
            setCamera("Not Available");
        }
    }, []);


    const checkMicrophone = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            setMicrophone("Ready");

            stream.getTracks().forEach(track => track.stop());
        } catch {
            setMicrophone("Not Available");
        }
    }, []);


    const checkInternet = useCallback(() => {
        setInternet(navigator.onLine ? "Stable" : "Offline");
    }, []);


    useEffect(() => {
        const checkSystem = async () => {
            await checkCamera();
            await checkMicrophone();
            checkInternet();
        };

        checkSystem();

        window.addEventListener("online", checkInternet);
        window.addEventListener("offline", checkInternet);

        return () => {
            window.removeEventListener("online", checkInternet);
            window.removeEventListener("offline", checkInternet);
        };
    }, [checkCamera, checkMicrophone, checkInternet]);


    const status = [
        {
            title: "Camera",
            value: camera,
            icon: Camera,
        },
        {
            title: "Microphone",
            value: microphone,
            icon: Mic,
        },
        {
            title: "Internet",
            value: internet,
            icon: Wifi,
        },
    ];


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
        >
            <h2 className="text-white text-lg font-semibold mb-6">
                System Readiness
            </h2>

            <div className="space-y-4">
                {status.map((item) => {
                    const Icon = item.icon;

                    const isChecking = item.value === "Checking...";
                    const isReady =
                        item.value === "Ready" ||
                        item.value === "Stable";

                    return (
                        <div
                            key={item.title}
                            className="flex items-center justify-between bg-slate-800/60 rounded-xl p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                    <Icon
                                        size={20}
                                        className="text-indigo-400"
                                    />
                                </div>

                                <span className="text-slate-200">
                                    {item.title}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {isChecking ? (
                                    <Loader
                                        size={18}
                                        className="text-yellow-400 animate-spin"
                                    />
                                ) : isReady ? (
                                    <CheckCircle
                                        size={18}
                                        className="text-green-400"
                                    />
                                ) : (
                                    <XCircle
                                        size={18}
                                        className="text-red-400"
                                    />
                                )}

                                <span
                                    className={
                                        isReady
                                            ? "text-green-400 text-sm"
                                            : isChecking
                                                ? "text-yellow-400 text-sm"
                                                : "text-red-400 text-sm"
                                    }
                                >
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}