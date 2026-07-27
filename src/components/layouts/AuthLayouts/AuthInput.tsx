import { type InputHTMLAttributes, forwardRef } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    {label}
                </label>

                <input
                    ref={ref}
                    {...props}
                    className={`
            w-full rounded-xl
            border border-slate-700
            bg-slate-900/60
            px-4 py-3
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all duration-300

            hover:border-slate-600

            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-500/15

            ${error ? "border-red-500" : ""}
            ${className}
          `}
                />

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;