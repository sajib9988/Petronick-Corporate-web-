// client/src/components/home-components/TrustBar.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, Share2, Users, PieChart } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/motion";

export interface TrustBarItem {
  value: string;
  label: string;
}

// Icon rotation — keeps the visual pattern regardless of how many items come in.
const ICON_POOL = [Building2, Share2, Users, PieChart];

export default function TrustBar({ items }: { items: TrustBarItem[] }) {
  if (!items?.length) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.1, 0)}
      className="grid grid-cols-4 gap-1.5 sm:gap-5"
    >
      {items.map((item, i) => {
        const Icon = ICON_POOL[i % ICON_POOL.length];

        return (
          <motion.div
            key={`${item.label}-${i}`}
            variants={fadeUp(0, 0.5)}
            className="flex min-w-0 items-center gap-1 rounded-lg border border-gray-100 bg-white p-1.5 shadow-md shadow-gray-900/5 sm:gap-3 sm:rounded-2xl sm:p-5 sm:shadow-lg"
          >
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600 sm:h-12 sm:w-12 sm:rounded-xl">
              <Icon className="h-3.5 w-3.5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-bold leading-tight text-gray-900 sm:text-xl">
                {item.value}
              </div>
              <div className="truncate text-[8px] font-medium leading-tight text-gray-500 sm:text-xs">
                {item.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
