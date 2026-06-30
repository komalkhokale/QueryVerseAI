import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0e0e0f] px-6 py-20 md:py-28"
    >
      {/* gradient card container */}
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#16161a] px-6 py-16 sm:px-12 md:py-24">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-violet-600/25 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-[110px]" />

        {/* faint grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="cta-content relative mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Start building today
          </div>

          {/* heading */}
          <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl w-5xl">
            Ready to experience the future of AI?
          </h2>

          {/* subtext */}
          <p className="mt-5 max-w-xl text-base text-zinc-400 md:text-lg">
            Join thousands of teams using AIVerse to search, build, and create
            faster than ever. No credit card required.
          </p>

          {/* buttons */}
          <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={() => navigate("/register")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </button>
            {/* <button className="w-full rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto">
              Talk to Sales
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
