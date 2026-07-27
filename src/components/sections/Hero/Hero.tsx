import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import HeroDashboard from "./HeroDashboard";


export default function Hero() {
    return (
        <section id="home" className="relative overflow-hidden bg-slate-950">
            <BackgroundEffects />

            <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-20 md:px-10">
                <div className="grid w-full items-center gap-16 lg:grid-cols-2">

                    {/* Left */}
                    <HeroContent />

                    {/* Right */}
                    <div className="flex justify-center lg:justify-end">
                        <HeroDashboard />
                    </div>

                </div>
            </div>
        </section>
    );
}