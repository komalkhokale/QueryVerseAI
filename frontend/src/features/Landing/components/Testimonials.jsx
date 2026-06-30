import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Product Designer, Figmaverse",
      text: "AIVerse has completely changed how our team researches and ships. What used to take hours of digging now happens in minutes, with sources I can actually trust.",
      rating: 5,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Rohan Mehta",
      role: "Founder, ScaleUp Labs",
      text: "The document analysis feature alone saved us weeks during due diligence. It pulled exact clauses from 200-page contracts faster than our legal team.",
      rating: 5,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Priya Nair",
      role: "Senior Engineer, Bytework",
      text: "I was skeptical about AI code assistants until I tried this. It actually understands the whole repo, not just the file I'm in. Genuinely useful, every day.",
      rating: 5,
      color: "from-emerald-500 to-green-500",
    },
    {
      name: "Karan Verma",
      role: "Creative Director, Studio Loop",
      text: "Image generation quality is on another level. We use it for early concept work now instead of stock photos — faster, cheaper, and exactly on-brand.",
      rating: 5,
      color: "from-pink-500 to-orange-500",
    },
    {
      name: "Sneha Iyer",
      role: "Marketing Lead, Northwind",
      text: "Switched our entire content team over to AIVerse last quarter. The AI search alone has cut our research time in half, with citations we can actually verify.",
      rating: 4,
      color: "from-amber-500 to-yellow-500",
    },
    {
      name: "Arjun Khanna",
      role: "CTO, Veltrix",
      text: "What impressed me most is reliability — it just works, consistently, even at scale. Support team is sharp too. Easily the best AI tool we've adopted this year.",
      rating: 5,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#09090B] px-6 py-20 md:py-28"
    >
      {/* ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2  bg-violet-600/10 blur-[140px]" />

      {/* faint grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* heading */}
        <div className="text-center">
          <div className="hero-badge inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
            Testimonial
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Loved by teams who ship fast
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
            Real feedback from people using AIVerse every day to search, build,
            and create.
          </p>
        </div>

        {/* testimonial grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#111114] p-7 transition-colors duration-300 hover:border-white/20"
            >
              {/* quote icon */}
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-white/5"
                strokeWidth={1.5}
                fill="currentColor"
              />

              {/* stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-zinc-700 text-zinc-700"
                    }`}
                  />
                ))}
              </div>

              {/* testimonial text */}
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-zinc-300">
                "{t.text}"
              </p>

              {/* author */}
              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-semibold text-white shadow-lg`}
                >
                  {getInitials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
