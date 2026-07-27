import { Link } from "react-router-dom";

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



const signupSchema = z
    .object({
        fullName: z
            .string()
            .min(3, "Full name must be at least 3 characters"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Enter a valid email"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: z
            .string()
            .min(6, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupForm) => {
        console.log(data);

        // TODO:
        // await signupMutation(data)
    };

    return (
        <AuthLayout>
            <AuthCard
                title="Create your account "
                subtitle="Start practicing interviews with AI today."
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <AuthInput
                        label="Full Name"
                        type="text"
                        placeholder="Your Name"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                    />

                    <AuthInput
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Create a password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
                    />

                    <AuthButton
                        loading={isSubmitting}
                        type="submit"
                    >
                        Create Account
                    </AuthButton>
                </form>

                <Divider />

                <GoogleButton
                    onClick={() => {
                        console.log("Google Signup");
                    }}
                />

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </AuthLayout>
    );
}