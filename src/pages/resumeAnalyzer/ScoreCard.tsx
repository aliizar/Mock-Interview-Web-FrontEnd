interface ScoreCardProps {

    title: string;

    value: string;

    status: string;

    icon: React.ReactNode;

}



export default function ScoreCard({

    title,
    value,
    status,
    icon

}: ScoreCardProps) {


    return (

        <div
            className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition
        hover:-translate-y-1
        "
        >


            <div className="
            flex
            items-center
            justify-between
            "
            >

                <span className="
                rounded-xl
                bg-slate-800
                p-3
                text-indigo-400
                "
                >

                    {icon}

                </span>


            </div>




            <h3 className="
            mt-6
            text-sm
            text-slate-400
            "
            >

                {title}

            </h3>




            <p className="
            mt-2
            text-3xl
            font-bold
            text-white
            "
            >

                {value}

            </p>




            <p className="
            mt-2
            text-sm
            text-emerald-400
            "
            >

                {status}

            </p>


        </div>

    );

}