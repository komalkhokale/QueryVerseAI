import { motion } from "framer-motion";

const companies = [
  "OpenAI",
  "Google",
  "Microsoft",
  "GitHub",
  "NVIDIA",
  "Meta",
  "Amazon",
  "Stripe",
];

export default function TrustedBy() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm uppercase tracking-[6px] text-zinc-500"
        >
          Trusted by developers worldwide
        </motion.p>

        <div className="mt-12 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-20"
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="text-3xl font-bold text-zinc-600 transition duration-300 hover:text-white"
              >
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
