"use client";
import { motion } from "framer-motion";

export default function AnimatedHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", rotate: 4, opacity: 0 }}
            whileInView={{ y: "0%", rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              delay: 0.35 + wi * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
      <motion.span
        aria-hidden
        className="block h-[3px] w-24 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 rounded-full mt-3 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.35 + words.length * 0.09,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
    </span>
  );
}