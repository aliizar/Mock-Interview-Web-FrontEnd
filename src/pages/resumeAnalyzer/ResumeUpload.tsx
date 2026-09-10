import { useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle } from "lucide-react";

interface ResumeUploadProps {
    onAnalyze: (file: File, targetRole: string) => void;
}

export default function ResumeUpload({ onAnalyze }: ResumeUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [targetRole, setTargetRole] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload PDF or DOCX file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }

        setSelectedFile(file);
    };

    const removeFile = () => {
        setSelectedFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleAnalyze = () => {
        if (!selectedFile) {
            alert("Please upload your resume first.");
            return;
        }

        if (!targetRole.trim()) {
            alert("Please enter the target job role.");
            return;
        }

        onAnalyze(selectedFile, targetRole.trim());
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            {/* Target Role */}
            <div className="mx-auto max-w-2xl">
                <label
                    htmlFor="targetRole"
                    className="mb-2 block text-sm font-medium text-slate-300"
                >
                    Target Job Role
                </label>

                <input
                    id="targetRole"
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <p className="mt-2 text-xs text-slate-500">
                    Enter the role you're targeting so the AI can evaluate your
                    resume accordingly.
                </p>
            </div>

            {/* Upload Area */}
            <div
                onClick={() => {
                    if (!selectedFile) {
                        fileInputRef.current?.click();
                    }
                }}
                className="mt-8 cursor-pointer rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 p-10 transition hover:border-indigo-500"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!selectedFile ? (
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full bg-slate-800 p-5">
                            <UploadCloud
                                size={42}
                                className="text-indigo-400"
                            />
                        </div>

                        <h2 className="mt-6 text-xl font-semibold text-white">
                            Upload Your Resume
                        </h2>

                        <p className="mt-2 max-w-md text-slate-400">
                            Drag & drop your PDF or DOCX resume or browse your
                            files.
                        </p>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-500"
                        >
                            Browse Files
                        </button>

                        <p className="mt-4 text-sm text-slate-500">
                            PDF, DOC, DOCX • Maximum 5MB
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        <CheckCircle
                            size={45}
                            className="text-emerald-400"
                        />

                        <h2 className="mt-5 text-xl font-semibold text-white">
                            Resume Uploaded
                        </h2>

                        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-800 px-5 py-3">
                            <FileText className="text-indigo-400" />

                            <div className="text-left">
                                <p className="text-white">
                                    {selectedFile.name}
                                </p>

                                <p className="text-sm text-slate-400">
                                    {(selectedFile.size / 1024 / 1024).toFixed(
                                        2,
                                    )}{" "}
                                    MB
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile();
                                }}
                                aria-label="Remove resume"
                            >
                                <X
                                    size={18}
                                    className="text-slate-400 hover:text-red-400"
                                />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAnalyze();
                            }}
                            className="mt-8 rounded-xl bg-indigo-600 px-7 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={!targetRole.trim()}
                        >
                            Analyze Resume
                        </button>

                        {!targetRole.trim() && (
                            <p className="mt-3 text-xs text-amber-400">
                                Enter your target job role before analyzing.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}