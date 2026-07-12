import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Send,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-left",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-wrapper",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".contact-form",
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-wrapper",
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (value) => !value.trim(),
    );

    if (hasEmptyField) {
      return;
    }

    setSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#09090B] px-6 py-24 sm:px-8 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="contact-wrapper relative z-10 mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div className="contact-left flex flex-col justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
              <Sparkles className="h-4 w-4" />
              Let&apos;s connect
            </div>

            <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Have an idea,
              <span className="block bg-gradient-to-r from-violet-400 via-zinc-200 to-blue-400 bg-clip-text text-transparent">
                question or feedback?
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg">
              Share your feedback, report a problem, or suggest a feature for
              the platform. Your message helps improve the AI experience.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                <Mail className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                  Email us
                </p>

                <a
                  href="mailto:kkhokale15@gmail.com"
                  className="mt-1 block text-sm font-medium text-zinc-200 transition-colors hover:text-violet-300"
                >
                  kkhokale15@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300">
                <MessageSquareText className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                  Response time
                </p>

                <p className="mt-1 text-sm font-medium text-zinc-200">
                  Usually within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="contact-form rounded-3xl border border-white/10 bg-[#0D0D10]/90 p-6 shadow-2xl shadow-black/20 sm:p-8"
        >
          <div className="mb-8">
            <p className="text-xl font-semibold text-white">
              Send us a message
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Fill in the details below and we will get back to you.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Your name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Komal Khokale"
                className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/5"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/5"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Feature request, feedback, or support"
              className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/5"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Your message
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us how we can help..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/5"
            />
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.01] hover:shadow-violet-600/40"
          >
            <Send className="h-4 w-4" />
            Send message
            <ArrowRight className="h-4 w-4" />
          </button>

          {submitted && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3.5 text-sm leading-6 text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              Message submitted successfully. This form is currently a frontend
              demo, so it does not send an actual email yet.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
