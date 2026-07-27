import {
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    LogOut
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TopNavbar() {

    const navigate = useNavigate();


    const [search, setSearch] = useState("");

    const [showSearch, setShowSearch] = useState(false);

    const [showNotifications, setShowNotifications] = useState(false);

    const [showProfile, setShowProfile] = useState(false);



    const searchItems = [
        "Frontend Developer Interview",
        "Resume Analyzer",
        "AI Coach",
        "Interview History"
    ];



    const notifications = [
        {
            title: "Interview Completed",
            message: "Your score improved to 87%"
        },
        {
            title: "Resume Analysis Done",
            message: "ATS Score: 91%"
        },
        {
            title: "AI Recommendation",
            message: "Practice React questions"
        }
    ];



    return (

        <header className="
        h-20 
        px-8 
        flex 
        items-center 
        justify-between 
        bg-slate-950/70 
        backdrop-blur-xl 
        border-b 
        border-slate-800
        ">



            {/* Left Side */}

            <div>

                <h2 className="
                text-2xl 
                font-semibold 
                text-white
                ">

                    Dashboard

                </h2>


                <p className="
                text-sm 
                text-slate-400
                ">

                    Welcome back, Ali

                </p>


            </div>







            {/* Right Side */}

            <div className="
            flex 
            items-center 
            gap-5
            ">





                {/* Search */}

                <div className="
                hidden 
                md:block 
                relative
                ">


                    <div className="
                    flex 
                    items-center 
                    gap-3 
                    bg-slate-900 
                    border 
                    border-slate-800 
                    rounded-xl 
                    px-4 
                    py-2 
                    w-72
                    ">


                        <Search
                            size={18}
                            className="text-slate-400"
                        />


                        <input

                            value={search}

                            onFocus={() => {
                                setShowSearch(true);
                                setShowNotifications(false);
                                setShowProfile(false);
                            }}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                            type="text"

                            placeholder="Search..."

                            className="
                            bg-transparent 
                            outline-none 
                            text-sm 
                            text-white 
                            placeholder:text-slate-500 
                            w-full
                            "

                        />


                    </div>





                    {
                        showSearch && (

                            <div className="
                            absolute
                            top-14
                            left-0
                            w-72
                            rounded-xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-3
                            z-50
                            shadow-xl
                            ">


                                {
                                    searchItems

                                        .filter(item =>
                                            item
                                                .toLowerCase()
                                                .includes(
                                                    search.toLowerCase()
                                                )
                                        )

                                        .map(item => (

                                            <button

                                                key={item}

                                                className="
                                        w-full
                                        text-left
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        text-slate-300
                                        hover:bg-slate-800
                                        "

                                            >

                                                {item}

                                            </button>

                                        ))

                                }


                            </div>

                        )
                    }


                </div>









                {/* Notification */}


                <div className="relative">


                    <motion.button

                        whileHover={{
                            scale: 1.1
                        }}

                        onClick={() => {

                            setShowNotifications(
                                !showNotifications
                            );

                            setShowProfile(false);

                            setShowSearch(false);

                        }}

                        className="
                    relative 
                    h-11 
                    w-11 
                    rounded-xl 
                    bg-slate-900 
                    border 
                    border-slate-800 
                    flex 
                    items-center 
                    justify-center 
                    hover:bg-slate-800 
                    transition
                    "

                    >

                        <Bell
                            size={20}
                            className="text-slate-300"
                        />


                        <span className="
                        absolute 
                        top-2 
                        right-2 
                        h-2 
                        w-2 
                        rounded-full 
                        bg-indigo-500
                        " />

                    </motion.button>






                    {
                        showNotifications && (

                            <div className="
                            absolute
                            right-0
                            mt-3
                            w-80
                            rounded-xl
                            bg-slate-900
                            border
                            border-slate-800
                            p-4
                            z-50
                            shadow-xl
                            ">


                                <h3 className="
                                text-white
                                font-semibold
                                mb-3
                                ">

                                    Notifications

                                </h3>



                                {
                                    notifications.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="
                                        rounded-lg
                                        bg-slate-800
                                        p-3
                                        mb-2
                                        "
                                            >

                                                <p className="
                                            text-sm
                                            text-white
                                            ">

                                                    {item.title}

                                                </p>


                                                <p className="
                                            text-xs
                                            text-slate-400
                                            mt-1
                                            ">

                                                    {item.message}

                                                </p>


                                            </div>

                                        ))

                                }


                            </div>

                        )
                    }


                </div>









                {/* Profile */}


                <div className="relative">


                    <button

                        onClick={() => {

                            setShowProfile(
                                !showProfile
                            );

                            setShowNotifications(false);

                            setShowSearch(false);

                        }}

                        className="
                    flex 
                    items-center 
                    gap-3 
                    bg-slate-900 
                    border 
                    border-slate-800 
                    rounded-xl 
                    px-3 
                    py-2 
                    hover:bg-slate-800 
                    transition
                    "

                    >


                        <div className="
                        h-9 
                        w-9 
                        rounded-full 
                        bg-gradient-to-br 
                        from-indigo-500 
                        to-purple-600 
                        flex 
                        items-center 
                        justify-center 
                        text-white 
                        text-sm 
                        font-bold
                        ">

                            AH

                        </div>


                        <div className="
                        hidden 
                        lg:block 
                        text-left
                        ">


                            <p className="
                            text-sm 
                            font-medium 
                            text-white
                            ">

                                Ali Zar

                            </p>


                            <p className="
                            text-xs 
                            text-slate-400
                            ">

                                Student

                            </p>


                        </div>



                        <ChevronDown
                            size={18}
                            className="text-slate-400"
                        />


                    </button>







                    {
                        showProfile && (

                            <div className="
                            absolute
                            right-0
                            mt-3
                            w-56
                            rounded-xl
                            bg-slate-900
                            border
                            border-slate-800
                            p-3
                            z-50
                            shadow-xl
                            ">


                                <button className="
                                flex
                                items-center
                                gap-3
                                w-full
                                px-3
                                py-2
                                rounded-lg
                                text-slate-300
                                hover:bg-slate-800
                                ">

                                    <User size={17} />

                                    Profile

                                </button>



                                <button

                                    onClick={() =>
                                        navigate("/settings")
                                    }

                                    className="
                                flex
                                items-center
                                gap-3
                                w-full
                                px-3
                                py-2
                                rounded-lg
                                text-slate-300
                                hover:bg-slate-800
                                "

                                >

                                    <Settings size={17} />

                                    Settings

                                </button>





                                <button

                                    onClick={() =>
                                        alert("Logout clicked")
                                    }

                                    className="
                                flex
                                items-center
                                gap-3
                                w-full
                                px-3
                                py-2
                                rounded-lg
                                text-red-400
                                hover:bg-slate-800
                                "

                                >

                                    <LogOut size={17} />

                                    Logout

                                </button>



                            </div>

                        )
                    }


                </div>



            </div>


        </header>

    );
}