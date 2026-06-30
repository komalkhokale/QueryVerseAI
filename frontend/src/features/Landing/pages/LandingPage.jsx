import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import Features from "../components/Features";
// import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import TrustedBy from "../components/TrustedBy";
import Footer from "../components/Footer";
import AIDemo from "../components/AIDemo";
import StickyFeatures from "../components/StickyFeatures";

export default function LandingPage() {
  return (
    <div className="bg-[#09090B] text-white min-h-screen">
      <Navbar />
      <Hero />
      <TrustedBy />
      <AIDemo />
      <StickyFeatures />
      {/* <Features /> */}
      {/* <HowItWorks /> */}
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
