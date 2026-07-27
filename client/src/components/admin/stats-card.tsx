"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";


interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  href: string;
  trend: string;
  delay?: number;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;

    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;

      const progress = Math.min(
        (timestamp - startTime.current) / duration,
        1
      );

      const next = Math.floor(progress * target);

      setCount((prev) => (prev !== next ? next : prev));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return count;
}

export default function StatsCard({
  label, value, icon, gradient, href, trend, delay = 0,
}: StatsCardProps) {
  const count = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        href={href}
        className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group flex flex-col`}
      >
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300" />
        <div className="relative flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-sm">
            {icon}
          </div>
          <ArrowUpRight
            size={16}
            className="text-white/50 group-hover:text-white transition-colors"
          />
        </div>
        <div className="relative text-2xl sm:text-3xl font-bold text-white mb-1">
          {count}
        </div>
        <div className="relative text-sm font-medium text-white/90">{label}</div>
        <div className="relative text-xs text-white/60 mt-0.5">{trend}</div>
      </Link>
    </motion.div>
  );
}