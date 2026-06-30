import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  FileText,
  Code2,
  Image as ImageIcon,
  Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StickyFeatures() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    gsap.set(cards.slice(1), { yPercent: 100 });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: stickyRef.current,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { scale: 0.92, opacity: 0.6, duration: 1 });
        tl.to(card, { yPercent: 0, duration: 1 }, "<");
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const data = [
    {
      title: "AI Search",
      desc: "Search the web with real-time AI reasoning and cited sources.",
      points: [
        "Real-time web crawling with source citations",
        "Multi-step reasoning for complex questions",
        "No hallucinated facts — every claim is verifiable",
      ],
      stat: { value: "2.4s", label: "avg. response time" },
      color: "from-violet-500 to-fuchsia-500",
      ring: "rgba(168,85,247,0.45)",
      glow: "rgba(168,85,247,0.18)",
      icon: Search,
      mockup: "search",
    },
    {
      title: "Document Analysis",
      desc: "Upload PDFs, contracts or research papers and chat with them instantly.",
      points: [
        "Supports PDF, DOCX, CSV and scanned files",
        "Pulls exact quotes with page references",
        "Summarizes 100+ page reports in seconds",
      ],
      stat: { value: "50+", label: "file formats supported" },
      color: "from-cyan-500 to-blue-500",
      ring: "rgba(56,189,248,0.45)",
      glow: "rgba(56,189,248,0.18)",
      icon: FileText,
      mockup: "document",
    },
    {
      title: "Code Assistant",
      desc: "Generate, debug and refactor production-ready code in seconds.",
      points: [
        "Understands full repo context, not just snippets",
        "Auto-detects bugs and suggests safe fixes",
        "Works across 30+ languages and frameworks",
      ],
      stat: { value: "30+", label: "languages supported" },
      color: "from-emerald-500 to-green-500",
      ring: "rgba(16,185,129,0.45)",
      glow: "rgba(16,185,129,0.18)",
      icon: Code2,
      mockup: "code",
    },
    {
      title: "Image Generation",
      desc: "Turn your ideas into stunning AI-generated visuals from text prompts.",
      points: [
        "Photorealistic, illustration and 3D styles",
        "4K upscaling on every generation",
        "Fine-tune with style and reference prompts",
      ],
      stat: { value: "4K", label: "max resolution" },
      color: "from-pink-500 to-orange-500",
      ring: "rgba(236,72,153,0.45)",
      glow: "rgba(236,72,153,0.18)",
      icon: ImageIcon,
      mockup: "image",
    },
  ];

  const Mockup = ({ type, color }) => {
    if (type === "search") {
      return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d10] p-4 md:p-5">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${color}`} />
            <span className="text-xs md:text-sm text-zinc-500">
              Latest AI regulation updates...
            </span>
          </div>
          <div className="mt-3 md:mt-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-black/40 p-3">
                <div className="h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-md bg-zinc-800" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-3/4 rounded bg-zinc-700" />
                  <div className="h-2 w-1/2 rounded bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === "document") {
      return (
        <div className="flex w-full max-w-md gap-3">
          <div className="w-20 md:w-24 shrink-0 rounded-xl border border-white/10 bg-[#0d0d10] p-3">
            <div className={`mb-2 h-6 w-6 rounded bg-gradient-to-r ${color}`} />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-zinc-700" />
              <div className="h-1.5 w-full rounded bg-zinc-800" />
              <div className="h-1.5 w-2/3 rounded bg-zinc-800" />
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-white/10 bg-[#0d0d10] p-4">
            <p className="text-xs leading-relaxed text-zinc-400">
              Key findings: revenue grew <span className="text-white">32%</span>{" "}
              after the new workflow, with projected savings of{" "}
              <span className="text-white">$1.2M</span> annually.
            </p>
          </div>
        </div>
      );
    }

    if (type === "code") {
      return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-xs">
          <div className="mb-3 flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="space-y-1.5 text-zinc-500">
            <p>
              <span className="text-pink-400">function</span>{" "}
              <span className="text-emerald-400">verifyToken</span>(token) {"{"}
            </p>
            <p className="pl-4 text-zinc-400">
              <span className="text-pink-400">const</span> decoded ={" "}
              <span className="text-cyan-400">jwt</span>.verify(token, SECRET);
            </p>
            <p className="pl-4 text-zinc-400">
              <span className="text-pink-400">return</span> decoded;
            </p>
            <p>{"}"}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`aspect-square rounded-xl bg-gradient-to-br ${color} animate-pulse`}
            style={{ opacity: 0.8 - i * 0.1, animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* HEADING — normal section, scrolls naturally, NOT part of pinned area */}
      <div className="relative z-10 bg-[#0e0e0f] px-6 pt-20 text-center md:pt-28">
        <div className="hero-badge inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
          Features
        </div>
        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          One AI. Endless possibilities.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
          From search to code to images — everything runs on a single,
          intelligent assistant.
        </p>
      </div>

      {/* PINNED SCROLL SECTION — heading is NOT inside this anymore */}
      <section ref={sectionRef} className="relative h-[500vh] bg-[#0e0e0f]">
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#0e0e0f] px-3 md:px-0"
        >
          {data.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="absolute inset-0 flex items-center justify-center px-3 md:px-6"
              >
                <div
                  className="relative h-[90vh] max-h-[820px] w-full overflow-y-auto rounded-[28px] border bg-[#16161a] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:p-10 md:h-[78vh] md:w-[88vw] md:max-w-6xl md:overflow-hidden md:rounded-[40px] md:p-14"
                  style={{
                    borderColor: item.ring,
                    boxShadow: `0 0 60px -15px ${item.glow}, 0 25px 50px -12px rgba(0,0,0,0.6)`,
                  }}
                >
                  {/* background glow */}
                  <div
                    className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl md:h-96 md:w-96"
                    style={{ background: item.glow }}
                  />
                  <div
                    className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full blur-3xl md:h-96 md:w-96"
                    style={{ background: item.glow }}
                  />

                  {/* faint grid pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  <div className="relative grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
                    <div className="flex flex-col justify-center">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} shadow-lg md:h-16 md:w-16`}
                      >
                        <Icon
                          className="h-6 w-6 text-white md:h-8 md:w-8"
                          strokeWidth={2}
                        />
                      </div>

                      <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:mt-7 md:text-5xl">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-base text-zinc-400 md:mt-5 md:text-lg">
                        {item.desc}
                      </p>

                      <ul className="mt-5 space-y-2.5 md:mt-7 md:space-y-3">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${item.color}`}
                            >
                              <Check
                                className="h-3 w-3 text-white"
                                strokeWidth={3}
                              />
                            </span>
                            <span className="text-sm text-zinc-300">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 md:mt-8 md:pt-6">
                        <span
                          className={`bg-gradient-to-r ${item.color} bg-clip-text text-2xl font-bold text-transparent md:text-3xl`}
                        >
                          {item.stat.value}
                        </span>
                        <span className="text-xs text-zinc-500 md:text-sm">
                          {item.stat.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <Mockup type={item.mockup} color={item.color} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}