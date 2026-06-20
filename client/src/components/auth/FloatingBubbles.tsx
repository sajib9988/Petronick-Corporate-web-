"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Bubble = {
  width: number;
  height: number;
  left: string;
  top: string;
};

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // শুধু client এ run হবে, SSR এ না
    setBubbles(
      [...Array(5)].map(() => ({
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  // Server render এ empty div, client এ bubbles
  if (bubbles.length === 0) return <div className="absolute inset-0 z-0" />;

  return (
    <div className="absolute inset-0 z-0">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5 border border-white/10"
          style={bubble}
          animate={{ y: [0, -100, 0], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      ))}
    </div>
  );
}