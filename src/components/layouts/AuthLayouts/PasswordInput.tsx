import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    {label}
                </label>

                <div className="relative">
                    <input
                        ref={ref}
                        {...props}
                        type={showPassword ? "text" : "password"}
                        className={`
              w-full rounded-xl
              border border-slate-700
              bg-slate-900/60
              px-4 py-3 pr-12
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

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;