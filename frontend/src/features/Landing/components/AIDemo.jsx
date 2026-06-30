import { motion } from "framer-motion";
import { Bot, Sparkles, SendHorizontal, Globe } from "lucide-react";

export default function AIDemo() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] py-24 md:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-600/10 blur-[140px]" />

      {/* faint grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Sparkles className="h-4 w-4" />
            Live AI Demo
          </span>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Chat with AIVerse
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
            Experience natural AI conversations before signing in.
          </p>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111114]/90 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          {/* gradient ring */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/15 via-transparent to-cyan-500/15" />

          {/* Browser-style header with mac dots */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            <h3 className="text-sm font-medium tracking-wide text-zinc-400">
              AIVerse Assistant
            </h3>

            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-300">
              Preview
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-6 p-5 sm:p-8">
            {/* User Message */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 sm:max-w-[70%] sm:text-base">
                Explain JWT Authentication in simple words.
              </div>
            </motion.div>

            {/* AI Reply */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500">
                <Bot size={14} className="text-white" />
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-4 py-3.5 sm:max-w-[75%]">
                <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                  JWT (JSON Web Token) is a secure way to verify a user's
                  identity without storing session data on the server.
                </p>
              </div>
            </motion.div>

            {/* User Message 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 sm:max-w-[70%] sm:text-base">
                JWT vs Session Authentication?
              </div>
            </motion.div>

            {/* AI Searching */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500">
                <Bot size={14} className="text-white" />
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-4 py-3.5 sm:max-w-[75%]">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Globe className="h-3.5 w-3.5 animate-pulse text-violet-400" />
                  Searching the web...
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Input box */}
          <div className="border-t border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1.5 pl-4">
              <input
                readOnly
                placeholder="Ask anything..."
                className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder-zinc-500 outline-none sm:text-base"
              />
              <span className="h-5 w-px animate-pulse bg-violet-500" />
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white shadow-md shadow-violet-600/30 transition-transform hover:scale-105">
                <SendHorizontal size={17} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
