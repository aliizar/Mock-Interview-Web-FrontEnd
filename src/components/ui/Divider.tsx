interface DividerProps {
    text?: string;
}

export default function Divider({
    text = "OR",
}: DividerProps) {
    return (
        <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />

            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {text}
            </span>

            <div className="h-px flex-1 bg-slate-800" />
        </div>
    );
}