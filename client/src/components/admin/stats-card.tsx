"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
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
  label,
  value,
  icon,
  iconBg,
  iconColor,
  href,
  trend,
  delay = 0,
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
        className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 group flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            {icon}
          </div>
          <ArrowUpRight
            size={16}
            className="text-gray-200 group-hover:text-gray-400 transition-colors"
          />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          {count}
        </div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
        <div className="text-xs text-gray-400 mt-0.5">{trend}</div>
      </Link>
    </motion.div>
  );
}