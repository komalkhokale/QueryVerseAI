import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 h-[450px] w-[450px] rounded-full bg-violet-600/30 blur-[140px]"
      />

      {/* Blue Blob */}
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 100, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]"
      />

      {/* Pink Blob */}
      <motion.div
        animate={{
          x: [0, 40, -80, 0],
          y: [0, -30, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-[120px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
