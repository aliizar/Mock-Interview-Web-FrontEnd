interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({
    children,
    loading,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className="
        w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white
        transition hover:bg-indigo-500 active:scale-[0.98]
        disabled:opacity-50
      "
            disabled={loading || props.disabled}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}