import { Link, useNavigate, } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../components/layouts/AuthLayouts/AuthLayout";
import AuthCard from "../components/layouts/AuthLayouts/AuthCard";
import AuthInput from "../components/layouts/AuthLayouts/AuthInput";
import PasswordInput from "../components/layouts/AuthLayouts/PasswordInput";
import AuthButton from "../components/layouts/AuthLayouts/AuthButton";
import Divider from "../components/ui/Divider";
import GoogleButton from "../components/ui/GoogleButon";
import { loginUser } from "../api/auth.api";
import { useAuthStore } from "../stores/auth.store";
import { useState } from "react";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const setAuth = useAuthStore((state) => state.setAuth);

    const onSubmit = async (data: LoginForm) => {
        setLoginError(""); // Reset login error before attempting login
        try {
            const result = await loginUser({
                email: data.email,
                password: data.password,
            });

            setAuth(result.token, result.user);

            console.log("Login successful:", result);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);

            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("Invalid email or password");
            }
        }
    };

    return (
        <AuthLayout>
            <AuthCard
                title="Welcome back "
                subtitle="Sign in to continue your AI interview journey."
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Email */}

                    <AuthInput
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    {/* Password */}

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    {/* Forgot Password */}

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login */}

                    <AuthButton
                        loading={isSubmitting}
                        type="submit"
                    >
                        Sign In
                    </AuthButton>
                </form>
                {loginError && (
                    <div className="rounded-lg border mt-4 border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {loginError}
                    </div>
                )}
                <Divider />

                <GoogleButton
                    onClick={() => {
                        console.log("Google Login");
                    }}
                />

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </AuthLayout>
    );
}