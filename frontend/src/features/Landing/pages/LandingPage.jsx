import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import TrustedBy from "../components/TrustedBy";
import Footer from "../components/Footer";
import AIDemo from "../components/AIDemo";
import StickyFeatures from "../components/StickyFeatures";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090B] text-white">
      <Navbar />

      <main>
        <Hero />
        <TrustedBy />
        <AIDemo />

        <section id="features" className="scroll-mt-24">
          <StickyFeatures />
        </section>

        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Contact />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
