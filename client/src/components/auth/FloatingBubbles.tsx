"use client";

import { motion } from "framer-motion";

export default function FloatingBubbles() {
  return (
    <div className="absolute inset-0 z-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5 border border-white/10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}