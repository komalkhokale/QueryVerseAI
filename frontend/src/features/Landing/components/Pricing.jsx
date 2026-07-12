import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Crown, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Free",
    description:
      "Perfect for exploring the platform and trying the core AI features.",
    price: "₹0",
    suffix: "forever",
    icon: Sparkles,
    featured: false,
    available: true,
    buttonText: "Start for free",
    features: [
      "AI chat conversations",
      "Basic real-time web search",
      "Limited image generation",
      "Conversation history",
      "Secure authentication",
    ],
  },
  {
    name: "Pro",
    description:
      "Higher limits and faster responses for regular and advanced users.",
    price: "₹499",
    suffix: "per month",
    icon: Zap,
    featured: true,
    available: false,
    buttonText: "Coming soon",
    features: [
      "Everything included in Free",
      "Higher AI usage limits",
      "Priority response speed",
      "More image generations",
      "Advanced web research",
    ],
  },
  {
    name: "Ultimate",
    description: "Designed for professional workflows and power users.",
    price: "₹999",
    suffix: "per month",
    icon: Crown,
    featured: false,
    available: false,
    buttonText: "Coming soon",
    features: [
      "Everything included in Pro",
      "Maximum usage limits",
      "Premium AI capabilities",
      "Priority support",
      "Early access to new features",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".pricing-heading",
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
            trigger: ".pricing-heading",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".pricing-card",
        {
          opacity: 0,
          y: 50,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#09090B] px-6 py-24 sm:px-8 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="pricing-heading mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
            <Zap className="h-4 w-4" />
            Flexible plans
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Start free.
            <span className="block bg-gradient-to-r from-violet-400 via-zinc-200 to-fuchsia-400 bg-clip-text text-transparent">
              Upgrade when you need more.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Explore all essential features for free. Paid plans are currently
            displayed as a preview and will be available soon.
          </p>
        </div>

        <div className="pricing-grid grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className={`pricing-card group relative flex flex-col rounded-3xl border p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${
                  plan.featured
                    ? "border-violet-500/40 bg-gradient-to-b from-violet-500/[0.12] via-white/[0.04] to-fuchsia-500/[0.05] shadow-2xl shadow-violet-600/10"
                    : "border-white/10 bg-white/[0.03] hover:border-violet-500/25 hover:bg-violet-500/[0.05]"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />

                    <span className="absolute right-5 top-5 rounded-full border border-violet-400/20 bg-violet-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                      Most popular
                    </span>
                  </>
                )}

                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {plan.name}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-400">
                  {plan.description}
                </p>

                <div className="mt-8">
                  <span className="text-4xl font-bold text-white sm:text-5xl">
                    {plan.price}
                  </span>

                  <p className="mt-2 text-sm text-zinc-500">{plan.suffix}</p>
                </div>

                <div className="my-8 h-px bg-gradient-to-r from-violet-500/30 via-white/10 to-transparent" />

                <ul className="flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                        <Check className="h-3 w-3" />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled={!plan.available}
                  onClick={() => {
                    if (plan.available) {
                      navigate("/register");
                    }
                  }}
                  className={`mt-9 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                    plan.available
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/25 hover:scale-[1.02]"
                      : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-zinc-500"
                  }`}
                >
                  {plan.buttonText}

                  {plan.available && <ArrowRight className="h-4 w-4" />}
                </button>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-zinc-600">
          No payment will be charged. Paid plans are currently shown for UI
          preview only.
        </p>
      </div>
    </section>
  );
}
