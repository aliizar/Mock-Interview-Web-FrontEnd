import { useRef, useState } from "react";
import {
    UploadCloud,
    FileText,
    X,
    CheckCircle
} from "lucide-react";


interface ResumeUploadProps {
    onAnalyze: () => void;
}


export default function ResumeUpload({
    onAnalyze
}: ResumeUploadProps) {


    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);



    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];


        if (!file) return;


        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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



    return (

        <div
            onClick={() => {
                if (!selectedFile) {
                    fileInputRef.current?.click();
                }
            }}

            className="
        rounded-2xl
        border-2
        border-dashed
        border-slate-700
        bg-slate-900
        p-10
        transition
        hover:border-indigo-500
        cursor-pointer
        "
        >


            <input

                ref={fileInputRef}

                type="file"

                accept=".pdf,.doc,.docx"

                onChange={handleFileChange}

                className="hidden"

            />



            {
                !selectedFile ? (

                    <div className="
                    flex
                    flex-col
                    items-center
                    text-center
                    ">


                        <div className="
                        rounded-full
                        bg-slate-800
                        p-5
                        "
                        >

                            <UploadCloud
                                size={42}
                                className="text-indigo-400"
                            />

                        </div>



                        <h2 className="
                        mt-6
                        text-xl
                        font-semibold
                        text-white
                        "
                        >

                            Upload Your Resume

                        </h2>



                        <p className="
                        mt-2
                        max-w-md
                        text-slate-400
                        "
                        >

                            Drag & drop your PDF or DOCX resume
                            or browse your files.

                        </p>




                        <button

                            onClick={(e) => {

                                e.stopPropagation();

                                fileInputRef.current?.click();

                            }}

                            className="
                        mt-8
                        rounded-xl
                        bg-indigo-600
                        px-6
                        py-3
                        text-white
                        transition
                        hover:bg-indigo-500
                        "

                        >

                            Browse Files

                        </button>



                        <p className="
                        mt-4
                        text-sm
                        text-slate-500
                        "
                        >

                            PDF, DOC, DOCX • Maximum 5MB

                        </p>


                    </div>


                ) : (


                    <div className="
                    flex
                    flex-col
                    items-center
                    text-center
                    "
                    >


                        <CheckCircle
                            size={45}
                            className="text-emerald-400"
                        />



                        <h2 className="
                        mt-5
                        text-xl
                        font-semibold
                        text-white
                        "
                        >

                            Resume Uploaded

                        </h2>




                        <div className="
                        mt-4
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-slate-800
                        px-5
                        py-3
                        "
                        >

                            <FileText
                                className="text-indigo-400"
                            />

                            <div className="text-left">

                                <p className="text-white">

                                    {selectedFile.name}

                                </p>


                                <p className="
                                text-sm
                                text-slate-400
                                "
                                >

                                    {(selectedFile.size / 1024 / 1024)
                                        .toFixed(2)} MB

                                </p>

                            </div>



                            <button

                                onClick={(e) => {

                                    e.stopPropagation();

                                    removeFile();

                                }}

                            >

                                <X
                                    size={18}
                                    className="
                                text-slate-400
                                hover:text-red-400
                                "
                                />

                            </button>


                        </div>




                        <button

                            onClick={(e) => {

                                e.stopPropagation();

                                onAnalyze();

                            }}

                            className="
                        mt-8
                        rounded-xl
                        bg-indigo-600
                        px-7
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-indigo-500
                        "

                        >

                            Analyze Resume

                        </button>



                    </div>


                )

            }


        </div>

    );
}