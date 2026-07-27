import Navbar from "../components/layouts/Navbar";
import CTA from "../components/sections/CTA";
import Features from "../components/sections/Feature/Features";
import Footer from "../components/layouts/Footer";
import Hero from "../components/sections/Hero/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import Pricing from "../components/sections/Pricing";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";

const Home = () => {
    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Navbar />
            <Hero />
            <Stats />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    );
};

export default Home;