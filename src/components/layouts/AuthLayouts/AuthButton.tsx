interface AuthButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function AuthButton({
    children,
    loading,
    ...props
}: AuthButtonProps) {
    return (
        <button
            {...props}
            disabled={loading}
            className="
        group
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        bg-indigo-600
        py-3
        font-semibold
        text-white
        transition-all
        duration-300

        hover:bg-indigo-500
        hover:shadow-xl
        hover:shadow-indigo-600/30

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
        >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative">
                {loading ? "Please wait..." : children}
            </span>
        </button>
    );
}