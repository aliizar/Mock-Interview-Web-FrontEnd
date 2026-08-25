import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Brain,
    Settings as SettingsIcon,
    Moon,
    Shield,
    LogOut,
    Save,
    Bell,
    History,
    Lock,
} from "lucide-react";
import { useAuthStore } from "../stores/auth.store";

export default function Settings() {
    const { user, logout } = useAuthStore();

    const [name, setName] = useState(user?.name || "...");

    const [role, setRole] = useState("Frontend Developer");
    const [difficulty, setDifficulty] = useState("Intermediate");
    const [interviewType, setInterviewType] = useState("Mixed");
    const [duration, setDuration] = useState("30 Minutes");

    const [rememberHistory, setRememberHistory] = useState(true);
    const [recommendations, setRecommendations] = useState(true);

    const [theme, setTheme] = useState("Dark Mode");

    const [saved, setSaved] = useState(false);

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const saveProfile = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2000);
    };

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        setPasswordError("");
        setPasswordMessage("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            setPasswordLoading(true);

            const token = useAuthStore.getState().token;

            const response = await fetch(
                "http://localhost:5000/api/auth/v1/change-password",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                        confirmPassword,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to change password",
                );
            }

            setPasswordMessage(data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setPasswordError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while changing your password.",
            );
        } finally {
            setPasswordLoading(false);
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
                <h1 className="text-3xl font-bold text-white">Settings</h1>

                <p className="mt-2 text-slate-400">
                    Manage your account and AI interview preferences.
                </p>
            </div>

            {/* Profile */}
            <SettingsCard
                title="Profile Settings"
                icon={<User size={20} />}
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <InputField
                        label="Full Name"
                        value={name}
                        onChange={setName}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        value={user?.email || "..."}
                        disabled={true}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400 outline-none"
                    />
                </div>

                <button
                    onClick={saveProfile}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-500"
                >
                    <Save size={18} />

                    {saved ? "Saved Successfully" : "Save Changes"}
                </button>
            </SettingsCard>

            {/* Interview Preferences */}
            <SettingsCard
                title="Interview Preferences"
                icon={<SettingsIcon size={20} />}
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <SelectField
                        label="Default Role"
                        value={role}
                        setValue={setRole}
                        options={[
                            "Frontend Developer",
                            "Backend Developer",
                            "Full Stack Developer",
                            "Data Analyst",
                        ]}
                    />

                    <SelectField
                        label="Difficulty"
                        value={difficulty}
                        setValue={setDifficulty}
                        options={[
                            "Beginner",
                            "Intermediate",
                            "Advanced",
                        ]}
                    />

                    <SelectField
                        label="Interview Type"
                        value={interviewType}
                        setValue={setInterviewType}
                        options={[
                            "Technical",
                            "Behavioral",
                            "HR",
                            "Mixed",
                        ]}
                    />

                    <SelectField
                        label="Duration"
                        value={duration}
                        setValue={setDuration}
                        options={[
                            "10 Minutes",
                            "20 Minutes",
                            "30 Minutes",
                        ]}
                    />
                </div>
            </SettingsCard>

            {/* AI Preferences */}
            <SettingsCard
                title="AI Assistant Preferences"
                icon={<Brain size={20} />}
            >
                <div className="space-y-4">
                    <ToggleItem
                        icon={<History size={18} />}
                        title="Remember Interview History"
                        description="Allow AI to track previous interviews."
                        enabled={rememberHistory}
                        setEnabled={setRememberHistory}
                    />

                    <ToggleItem
                        icon={<Bell size={18} />}
                        title="AI Recommendations"
                        description="Receive personalized improvement suggestions."
                        enabled={recommendations}
                        setEnabled={setRecommendations}
                    />
                </div>
            </SettingsCard>

            {/* Appearance */}
            <SettingsCard
                title="Appearance"
                icon={<Moon size={20} />}
            >
                <div className="flex flex-col gap-4 rounded-xl bg-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="font-medium text-white">
                            Theme
                        </h3>

                        <p className="text-sm text-slate-400">
                            Choose application appearance
                        </p>
                    </div>

                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none"
                    >
                        <option>Dark Mode</option>
                        <option>Light Mode</option>
                    </select>
                </div>
            </SettingsCard>

            {/* Security */}
            <SettingsCard
                title="Security"
                icon={<Shield size={20} />}
            >
                <div className="space-y-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button
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
                            onClick={() => logout()}
                            className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500/20"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    {/* Change Password Form */}
                    {showPasswordForm && (
                        <form
                            onSubmit={handleChangePassword}
                            className="space-y-5 rounded-xl border border-slate-800 bg-slate-950/50 p-5"
                        >
                            <div>
                                <h3 className="font-medium text-white">
                                    Change your password
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    Enter your current password and
                                    choose a new one.
                                </p>
                            </div>

                            <InputField
                                label="Current Password"
                                value={currentPassword}
                                onChange={setCurrentPassword}
                                type="password"
                            />

                            <InputField
                                label="New Password"
                                value={newPassword}
                                onChange={setNewPassword}
                                type="password"
                            />

                            <InputField
                                label="Confirm New Password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                type="password"
                            />

                            {passwordError && (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    {passwordError}
                                </div>
                            )}

                            {passwordMessage && (
                                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                    {passwordMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {passwordLoading
                                    ? "Changing Password..."
                                    : "Update Password"}
                            </button>
                        </form>
                    )}
                </div>
            </SettingsCard>
        </motion.div>
    );
}

function SettingsCard({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6 flex items-center gap-3 text-white">
                <div className="rounded-lg bg-slate-800 p-2 text-indigo-400">
                    {icon}
                </div>

                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            {children}
        </div>
    );
}

function InputField({
    label,
    value,
    onChange,
    type = "text",
    disabled = false,
    className,
}: {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    type?: string;
    disabled?: boolean;
    className?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm text-slate-400">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={className ?? "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"}
            />
        </div>
    );
}

function SelectField({
    label,
    value,
    setValue,
    options,
}: {
    label: string;
    value: string;
    setValue: (value: string) => void;
    options: string[];
}) {
    return (
        <div>
            <label className="mb-2 block text-sm text-slate-400">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
            >
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

function ToggleItem({
    icon,
    title,
    description,
    enabled,
    setEnabled,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    enabled: boolean;
    setEnabled: (value: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
            <div className="flex gap-3">
                <div className="text-indigo-400">
                    {icon}
                </div>

                <div>
                    <h3 className="text-white">{title}</h3>

                    <p className="text-sm text-slate-400">
                        {description}
                    </p>
                </div>
            </div>

            <button
                onClick={() => setEnabled(!enabled)}
                className={`h-6 w-11 rounded-full p-1 transition ${enabled ? "bg-indigo-500" : "bg-slate-600"
                    }`}
            >
                <div
                    className={`h-4 w-4 rounded-full bg-white transition ${enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}