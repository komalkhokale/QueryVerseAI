import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const heroRef = useRef(null);
    const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-search",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.55,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".hero-trust",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.8 },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const avatarColors = [
    "from-violet-500 to-fuchsia-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-green-500",
    "from-pink-500 to-orange-500",
    "from-amber-500 to-yellow-500",
  ];

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6 py-24 mt-15"
    >
      {/* flowing gradient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px]" />

      {/* faint grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* noise-ish radial vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,#09090B_75%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* badge */}
        <div className="hero-badge inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          AI Powered Search Engine
        </div>

        {/* heading */}
        <h1 className="hero-title w-5xl mt-7 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-violet-400 via-zinc-200 to-blue-400 bg-clip-text text-transparent">
            The AI That Thinks Before It Answers
          </span>
        </h1>

        {/* subtext */}
        <p className="hero-sub mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl">
          Search the web, analyze documents, generate code, create images and
          discover accurate answers with real-time AI reasoning.
        </p>

        {/* search-style CTA */}
        <div className="hero-search mt-10 flex w-full max-w-2xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md sm:flex-row sm:gap-0">
          <div className="flex w-full items-center gap-3 px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-zinc-500" />
            <input
              type="text"
              placeholder="Describe what you want to build..."
              className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-500 outline-none sm:text-base"
            />
          </div>
          <button
            onClick={() => navigate("/login")}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Try Demo
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16">
          {[
            { value: "25K+", label: "Active Users" },
            { value: "99.9%", label: "Accuracy" },
            { value: "24/7", label: "Availability" },
          ].map((stat, i) => (
            <div key={i} className="hero-stat text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
