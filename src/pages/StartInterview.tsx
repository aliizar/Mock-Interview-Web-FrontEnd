/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    Bot,
    Clock,
    Mic,
    MicOff,
    Send,
    LogOut
} from "lucide-react";

import { motion } from "framer-motion";


const questions = [

    "Tell me about yourself and your frontend development experience.",

    "Explain the difference between props and state in React.",

    "How does React Virtual DOM work?",

    "Explain how you optimize the performance of a React application."

];



export default function StartInterview() {


    const videoRef = useRef<HTMLVideoElement | null>(null);

    const recognitionRef = useRef<any>(null);

    const streamRef = useRef<MediaStream | null>(null);



    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answer, setAnswer] = useState("");

    const [listening, setListening] = useState(false);

    const [time, setTime] = useState(20 * 60);

    const [cameraReady, setCameraReady] = useState(false);

    const [submitted, setSubmitted] = useState(false);





    // Timer

    useEffect(() => {


        const timer = setInterval(() => {


            setTime(prev => {

                if (prev <= 0) {

                    clearInterval(timer);

                    return 0;

                }

                return prev - 1;

            });


        }, 1000);



        return () => clearInterval(timer);


    }, []);






    // Camera

    useEffect(() => {


        async function startCamera() {


            try {


                const stream =
                    await navigator.mediaDevices.getUserMedia({

                        video: true,

                        audio: true

                    });



                streamRef.current = stream;



                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                }



                setCameraReady(true);



            }

            catch (error) {

                console.log(
                    "Camera permission denied",
                    error
                );

            }


        }



        startCamera();



        return () => {


            streamRef.current
                ?.getTracks()
                .forEach(track => track.stop());


        }


    }, []);




    function speakQuestion() {


        const speech =
            new SpeechSynthesisUtterance(
                questions[currentQuestion]
            );


        speech.rate = 0.9;

        speech.pitch = 1;


        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(
            speech
        );


    }



    // AI Speak Question

    useEffect(() => {


        speakQuestion();



    }, [currentQuestion]);














    // Speech Recognition


    function startListening() {



        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;



        if (!SpeechRecognition) {

            alert(
                "Speech recognition is not supported. Use Chrome."
            );

            return;

        }



        const recognition =
            new SpeechRecognition();



        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.lang = "en-US";



        recognition.onresult = (event: any) => {


            let transcript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0].transcript;

            }



            setAnswer(transcript);


        };





        recognition.onend = () => {

            setListening(false);

        };



        recognition.start();


        recognitionRef.current =
            recognition;


        setListening(true);


    }






    function stopListening() {


        recognitionRef.current?.stop();


        setListening(false);


    }








    function submitAnswer() {


        setSubmitted(true);


        stopListening();


    }







    function nextQuestion() {


        if (currentQuestion < questions.length - 1) {


            setCurrentQuestion(
                currentQuestion + 1
            );


            setAnswer("");

            setSubmitted(false);


        }


    }







    function formatTime(seconds: number) {


        const minutes =
            Math.floor(seconds / 60);


        const secs =
            seconds % 60;



        return `${minutes
            .toString()
            .padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`;


    }







    return (

        <div className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        flex-col
        ">



            {/* Header */}

            <div className="
            h-20
            border-b
            border-slate-800
            flex
            items-center
            justify-between
            px-8
            ">


                <div>

                    <h1 className="
                    text-xl
                    font-semibold
                    ">

                        Frontend Developer Interview

                    </h1>


                    <p className="
                    text-sm
                    text-slate-400
                    ">

                        AI Technical Interview

                    </p>


                </div>





                <div className="
                flex
                items-center
                gap-5
                ">


                    <div className="
                    flex
                    items-center
                    gap-2
                    text-slate-300
                    ">

                        <Clock size={18} />

                        {formatTime(time)}

                    </div>



                    <div className="
                    rounded-xl
                    bg-indigo-500/20
                    px-4
                    py-2
                    text-indigo-400
                    ">

                        {currentQuestion + 1}
                        /
                        {questions.length}

                    </div>



                    <button className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-500/10
                    px-4
                    py-2
                    text-red-400
                    ">


                        <LogOut size={18} />

                        Exit


                    </button>


                </div>


            </div>








            {/* Main */}


            <div className="
            flex-1
            grid
            lg:grid-cols-2
            gap-8
            p-8
            ">




                {/* AI Question */}


                <motion.div

                    initial={{
                        opacity: 0,
                        x: -20
                    }}

                    animate={{
                        opacity: 1,
                        x: 0
                    }}

                    className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-8
                "

                >


                    <div className="
                    flex
                    items-center
                    gap-4
                    mb-8
                    ">


                        <div className="
                        h-14
                        w-14
                        rounded-full
                        bg-indigo-600
                        flex
                        items-center
                        justify-center
                        ">


                            <Bot size={30} />


                        </div>


                        <div>

                            <h2 className="
                            font-semibold
                            ">

                                AI Interviewer

                            </h2>


                            <p className="
                            text-sm
                            text-slate-400
                            ">

                                Speaking Question...

                            </p>


                        </div>


                    </div>





                    <div className="
                    rounded-xl
                    bg-slate-800
                    p-6
                    ">


                        <p className="
                        text-sm
                        text-slate-400
                        mb-3
                        ">

                            Question

                        </p>


                        <h2 className="
                        text-xl
                        leading-relaxed
                        ">

                            {questions[currentQuestion]}

                        </h2>


                    </div>



                </motion.div>









                {/* Candidate */}


                <motion.div

                    initial={{
                        opacity: 0,
                        x: 20
                    }}

                    animate={{
                        opacity: 1,
                        x: 0
                    }}

                    className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-8
                "

                >



                    <div className="
                    h-64
                    rounded-xl
                    overflow-hidden
                    bg-slate-800
                    "
                    >


                        <video

                            ref={videoRef}

                            autoPlay

                            muted

                            className="
                        h-full
                        w-full
                        object-cover
                        "

                        />

                    </div>



                    <p className="
                    mt-2
                    text-sm
                    text-slate-400
                    ">

                        {
                            cameraReady
                                ?
                                "Camera Active"
                                :
                                "Camera Loading..."
                        }

                    </p>







                    <textarea

                        value={answer}

                        onChange={(e) =>
                            setAnswer(e.target.value)
                        }

                        placeholder="Your answer will appear here..."

                        className="
                    mt-5
                    h-28
                    w-full
                    rounded-xl
                    bg-slate-800
                    border
                    border-slate-700
                    p-4
                    outline-none
                    "

                    />






                    <div className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-3
                    ">


                        <button

                            onClick={
                                listening
                                    ?
                                    stopListening
                                    :
                                    startListening
                            }

                            className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-800
                        py-3
                        "

                        >

                            {
                                listening
                                    ?
                                    <MicOff />
                                    :
                                    <Mic />
                            }


                            {
                                listening
                                    ?
                                    "Stop"
                                    :
                                    "Start Answer"
                            }


                        </button>






                        <button

                            onClick={submitAnswer}

                            className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-indigo-600
                        py-3
                        "

                        >

                            <Send size={18} />

                            Submit

                        </button>



                    </div>





                    {
                        submitted && (

                            <button

                                onClick={nextQuestion}

                                className="
                            mt-4
                            w-full
                            rounded-xl
                            border
                            border-slate-700
                            py-3
                            "

                            >

                                Next Question

                            </button>

                        )
                    }




                </motion.div>



            </div>


        </div>

    )

}