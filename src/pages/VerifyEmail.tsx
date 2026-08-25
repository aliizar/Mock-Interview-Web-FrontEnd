import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const hasVerified = useRef(false);

    const [status, setStatus] = useState<
        "verifying" | "success" | "error"
    >("verifying");

    const [message, setMessage] = useState("");
    const token = searchParams.get("token");
    const displayedStatus = token ? status : "error";
    const displayedMessage = token ? message : "Verification token is missing.";
    console.log(token);
    useEffect(() => {
        if (!token || hasVerified.current) {
            return;
        }

        hasVerified.current = true;

        const verifyEmail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/auth/v1/verify-email?token=${token}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Verification failed");
                }

                setStatus("success");
                setMessage(data.message);
            } catch (error) {
                setStatus("error");
                setMessage(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

                {displayedStatus === "verifying" && (
                    <>
                        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

                        <h1 className="text-2xl font-semibold text-white">
                            Verifying your email
                        </h1>

                        <p className="mt-3 text-slate-400">
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {displayedStatus === "success" && (
                    <>
                        <div className="mb-6 text-5xl">✓</div>

                        <h1 className="text-2xl font-semibold text-white">
                            Email verified!
                        </h1>

                        <p className="mt-3 text-slate-400">
                            {displayedMessage}
                        </p>

                        <Link
                            to="/login"
                            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
                        >
                            Go to Login
                        </Link>
                    </>
                )}

                {displayedStatus === "error" && (
                    <>
                        <div className="mb-6 text-5xl">✕</div>

                        <h1 className="text-2xl font-semibold text-white">
                            Verification failed
                        </h1>

                        <p className="mt-3 text-slate-400">
                            {displayedMessage}
                        </p>

                        <Link
                            to="/login"
                            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
                        >
                            Back to Login
                        </Link>
                    </>
                )}

            </div>
        </div>
    );
}