// client/src/components/home-components/TrustBar.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, Share2, Users, PieChart } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/motion";

interface TrustBarItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export default function TrustBar() {
  const items: TrustBarItem[] = [
    {
      icon: <Building2 className="w-6 h-6" />,
      value: "10",
      label: "Core Business Units",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      value: "1",
      label: "Connected Ecosystem",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "B2B \u2022 B2C",
      label: "Market Reach",
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      value: "Multi Sector",
      label: "Portfolio Model",
    },
  ];

  return (
    <section className="relative z-20 -mt-12 sm:-mt-16 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1, 0)}
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp(0, 0.5)}
            className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-900/5 p-4 sm:p-5"
          >
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              {item.icon}
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
        ))}
      </motion.div>
      
    </section>
  );
}