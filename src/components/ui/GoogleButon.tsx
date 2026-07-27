import { Globe } from "lucide-react";

interface GoogleButtonProps {
    onClick?: () => void;
}

export default function GoogleButton({
    onClick,
}: GoogleButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        border
        border-slate-700
        bg-slate-900/60
        py-3
        font-medium
        text-slate-200
        transition-all
        duration-300

        hover:border-slate-600
        hover:bg-slate-800
      "
        >
            <Globe className="h-5 w-5" />

            Continue with Google
        </button>
    );
}