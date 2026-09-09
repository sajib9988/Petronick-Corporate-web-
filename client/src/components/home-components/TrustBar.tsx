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
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
    >
      {items.map((item, i) => {
        const Icon = ICON_POOL[i % ICON_POOL.length];

        return (
          <motion.div
            key={`${item.label}-${i}`}
            variants={fadeUp(0, 0.5)}
            className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-900/5 p-4 sm:p-5"
          >
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900 leading-tight truncate">
                {item.value}
              </div>
              <div className="text-xs text-gray-500 font-medium leading-tight">
                {item.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
