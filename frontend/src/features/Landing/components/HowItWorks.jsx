import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bot,
  MessageSquareText,
  Search,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: MessageSquareText,
    title: "Ask your question",
    description:
      "Type any question, search request, coding problem, document query, or image idea.",
  },
  {
    number: "02",
    icon: Search,
    title: "AI understands it",
    description:
      "The system analyzes your prompt and selects the right AI capability for the task.",
  },
  {
    number: "03",
    icon: Bot,
    title: "Get a smart answer",
    description:
      "Receive a clear response, useful web results, generated code, or an AI-created image.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Refine the result",
    description:
      "Continue the conversation, ask follow-up questions, and improve the final output.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".how-heading",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".how-heading",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".how-card",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".how-grid",
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#09090B] px-6 py-24 sm:px-8 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-0 top-1/2 h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="how-heading mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Simple and powerful
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            From question to answer
            <span className="block bg-gradient-to-r from-violet-400 via-zinc-200 to-blue-400 bg-clip-text text-transparent">
              in just a few steps
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            No complicated setup. Ask what you need and let the AI handle the
            research, reasoning, and response.
          </p>
        </div>

        <div className="how-grid grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="how-card group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/30 hover:bg-violet-500/[0.06] hover:shadow-2xl hover:shadow-violet-600/10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-semibold tracking-[0.2em] text-zinc-600">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {step.description}
                </p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-violet-500/40 via-white/10 to-transparent" />

                <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 transition-colors group-hover:text-violet-300">
                  Step {step.number}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>

                {index !== steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 z-20 hidden h-5 w-5 -translate-y-1/2 text-zinc-700 xl:block" />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}