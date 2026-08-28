
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
    User,
    Brain,
    Shield,
    LogOut,
    Save,
    Bell,
    History,
    Lock,
} from "lucide-react";
import { useAuthStore } from "../stores/auth.store";
import {
    getPreferences,
    updatePreferences,
} from "../api/preferences.api";
import { changePassword } from "../api/auth.api";

interface PreferenceForm {
    role: string;
    difficulty: string;
    interviewType: string;
    duration: number;
    rememberHistory: boolean;
    recommendations: boolean;
}

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function Settings() {
    const { user, logout, token } = useAuthStore();

    const [loadingPreferences, setLoadingPreferences] = useState(true);
    const [savingPreferences, setSavingPreferences] = useState(false);
    const [preferenceMessage, setPreferenceMessage] = useState("");
    const [preferenceError, setPreferenceError] = useState("");

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<PreferenceForm>({
        defaultValues: {
            role: "Frontend Developer",
            difficulty: "Intermediate",
            interviewType: "Mixed",
            duration: 30,
            rememberHistory: true,
            recommendations: true,
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        reset: resetPassword,
        watch,
        formState: { errors },
    } = useForm<PasswordForm>();

    const newPassword = watch("newPassword");

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                setPreferenceError("");

                const preferences = await getPreferences();

                reset({
                    role: preferences.role,
                    difficulty: preferences.difficulty,
                    interviewType: preferences.interviewType,
                    duration: preferences.duration,
                    rememberHistory: preferences.rememberHistory,
                    recommendations: preferences.recommendations,
                });
            } catch (error) {
                setPreferenceError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load preferences.",
                );
            } finally {
                setLoadingPreferences(false);
            }
        };

        loadPreferences();
    }, [reset]);

    const onPreferencesSubmit = async (data: PreferenceForm) => {
        try {
            setSavingPreferences(true);
            setPreferenceMessage("");
            setPreferenceError("");

            await updatePreferences(data);

            setPreferenceMessage(
                "Interview preferences saved successfully.",
            );
        } catch (error) {
            setPreferenceError(
                error instanceof Error
                    ? error.message
                    : "Failed to save preferences.",
            );
        } finally {
            setSavingPreferences(false);
        }
    };

    const onPasswordSubmit = async (data: PasswordForm) => {
        if (data.newPassword !== data.confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            setChangingPassword(true);
            setPasswordMessage("");
            setPasswordError("");

            const result = await changePassword(
                token,
                data.currentPassword,
                data.newPassword,
                data.confirmPassword,
            );

            setPasswordMessage(
                result.message || "Password changed successfully.",
            );

            resetPassword();
        } catch (error) {
            setPasswordError(
                error instanceof Error
                    ? error.message
                    : "Failed to change password.",
            );
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Settings
                </h1>

                <p className="mt-2 text-slate-400">
                    Manage your account, interview preferences, and
                    security.
                </p>
            </div>

            {/* Profile */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-slate-800 p-2 text-indigo-400">
                        <User size={20} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Profile
                        </h2>

                        <p className="text-sm text-slate-400">
                            Your account information.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm text-slate-400">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={user?.name || ""}
                            readOnly
                            className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-400">
                            Email
                        </label>

                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400 outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Interview Preferences */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-slate-800 p-2 text-indigo-400">
                        <Brain size={20} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Interview Preferences
                        </h2>

                        <p className="text-sm text-slate-400">
                            Configure how your AI interviews should
                            be generated.
                        </p>
                    </div>
                </div>

                {loadingPreferences ? (
                    <p className="text-slate-400">
                        Loading preferences...
                    </p>
                ) : (
                    <form
                        onSubmit={handleSubmit(onPreferencesSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Default Role
                                </label>

                                <select
                                    {...register("role")}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                                >
                                    <option>
                                        Frontend Developer
                                    </option>
                                    <option>
                                        Backend Developer
                                    </option>
                                    <option>
                                        Full Stack Developer
                                    </option>
                                    <option>
                                        Data Analyst
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Difficulty
                                </label>

                                <select
                                    {...register("difficulty")}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Interview Type
                                </label>

                                <select
                                    {...register("interviewType")}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                                >
                                    <option>Technical</option>
                                    <option>Behavioral</option>
                                    <option>HR</option>
                                    <option>Mixed</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Duration
                                </label>

                                <select
                                    {...register("duration", {
                                        valueAsNumber: true,
                                    })}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                                >
                                    <option value={10}>
                                        10 Minutes
                                    </option>
                                    <option value={20}>
                                        20 Minutes
                                    </option>
                                    <option value={30}>
                                        30 Minutes
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-4">
                                <div className="flex items-center gap-3">
                                    <History
                                        size={18}
                                        className="text-indigo-400"
                                    />

                                    <div>
                                        <p className="text-white">
                                            Remember Interview History
                                        </p>

                                        <p className="text-sm text-slate-400">
                                            Allow AI to track previous
                                            interviews.
                                        </p>
                                    </div>
                                </div>

                                <input
                                    type="checkbox"
                                    {...register("rememberHistory")}
                                    className="h-5 w-5 accent-indigo-500"
                                />
                            </label>

                            <label className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-4">
                                <div className="flex items-center gap-3">
                                    <Bell
                                        size={18}
                                        className="text-indigo-400"
                                    />

                                    <div>
                                        <p className="text-white">
                                            AI Recommendations
                                        </p>

                                        <p className="text-sm text-slate-400">
                                            Receive personalized
                                            improvement suggestions.
                                        </p>
                                    </div>
                                </div>

                                <input
                                    type="checkbox"
                                    {...register("recommendations")}
                                    className="h-5 w-5 accent-indigo-500"
                                />
                            </label>
                        </div>

                        {preferenceError && (
                            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {preferenceError}
                            </p>
                        )}

                        {preferenceMessage && (
                            <p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                {preferenceMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={savingPreferences}
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Save size={18} />

                            {savingPreferences
                                ? "Saving..."
                                : "Save Preferences"}
                        </button>
                    </form>
                )}
            </section>

            {/* Security */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-slate-800 p-2 text-indigo-400">
                        <Shield size={20} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Security
                        </h2>

                        <p className="text-sm text-slate-400">
                            Manage your account password and session.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => {
                            setShowPasswordForm(!showPasswordForm);
                            setPasswordError("");
                            setPasswordMessage("");
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
                    >
                        <Lock size={18} />

                        {showPasswordForm
                            ? "Cancel"
                            : "Change Password"}
                    </button>

                    <button
                        type="button"
                        onClick={logout}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500/20"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {showPasswordForm && (
                    <form
                        onSubmit={handlePasswordSubmit(
                            onPasswordSubmit,
                        )}
                        className="mt-6 space-y-5 rounded-xl bg-slate-800 p-5"
                    >
                        <div>
                            <h3 className="font-medium text-white">
                                Change Password
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Enter your current password and choose
                                a new one.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Current Password
                            </label>

                            <input
                                type="password"
                                {...registerPassword(
                                    "currentPassword",
                                    {
                                        required:
                                            "Current password is required",
                                    },
                                )}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                            />

                            {errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-400">
                                    {
                                        errors.currentPassword
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                New Password
                            </label>

                            <input
                                type="password"
                                {...registerPassword(
                                    "newPassword",
                                    {
                                        required:
                                            "New password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                    },
                                )}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                            />

                            {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                {...registerPassword(
                                    "confirmPassword",
                                    {
                                        required:
                                            "Please confirm your new password",
                                        validate: (value) =>
                                            value === newPassword ||
                                            "Passwords do not match",
                                    },
                                )}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                            />

                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-400">
                                    {
                                        errors.confirmPassword
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        {passwordError && (
                            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {passwordError}
                            </p>
                        )}

                        {passwordMessage && (
                            <p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                {passwordMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {changingPassword
                                ? "Updating..."
                                : "Update Password"}
                        </button>
                    </form>
                )}
            </section>
        </motion.div>
    );
}