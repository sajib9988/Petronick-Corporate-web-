
"use client";

import { motion } from "framer-motion";

import PromotionAgentForm from "@/components/admin/form/Promotion-form";
import { Container } from "@/components/Container";
import TrustBar from "./TrustBar";

// ============================================================
// HERO CONTENT
// ============================================================

interface HeroContent {
  badge?: string;
  title?: string;
  description?: string;

  primaryButtonText?: string;
  primaryButtonLink?: string;

  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;  
}

// ============================================================
// PROPS
// ============================================================

interface PromotionAgentContentProps {
  heroContent?: HeroContent;
}

// ============================================================
// COMPONENT
// ============================================================

export default function PromotionAgentContent({
  heroContent = {},
}: PromotionAgentContentProps) {
  // ============================================================
  // HERO DATA
  // ============================================================

  const heroBadge =
    heroContent.badge ?? "Promotion Agent Opportunity";

  const heroTitle =
    heroContent.title ?? "Become a Promotion Agent";

  const heroDescription =
    heroContent.description ??
    "Introduce businesses and customers to products, services, and opportunities across the Petronick Corporate Holdings ecosystem. Choose one or multiple companies based on your experience, network, and market focus.";

  const primaryButtonText =
    heroContent.primaryButtonText ?? "Start Your Application";

  const primaryButtonLink =
    heroContent.primaryButtonLink ?? "#application";

  const secondaryButtonText =
    heroContent.secondaryButtonText ?? "See How It Works";

  const secondaryButtonLink =
    heroContent.secondaryButtonLink ?? "#how-it-works";
 const trustItems = [
    {
      value: heroContent.stat1Value?.trim() || "10",
      label: heroContent.stat1Label?.trim() || "Core Business Units",
    },
    {
      value: heroContent.stat2Value?.trim() || "1",
      label: heroContent.stat2Label?.trim() || "Connected Ecosystem",
    },
    {
      value: heroContent.stat3Value?.trim() || "B2B • B2C",
      label: heroContent.stat3Label?.trim() || "Market Reach",
    },
 
  ];  

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* ========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#10283f] text-white">
        {/* Background decorative curves */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[20%] top-[25%] h-[420px] w-[75%] rotate-[-10deg] rounded-[50%] border border-[#c89d3c]/15" />

          <div className="absolute -right-[25%] top-[5%] h-[360px] w-[75%] rotate-[8deg] rounded-[50%] border border-white/10" />

          <div className="absolute bottom-[-35%] left-[10%] h-[500px] w-[80%] rotate-[-5deg] rounded-[50%] border border-white/8" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,157,60,0.08),transparent_55%)]" />
        </div>

        <Container>
          <div className="relative flex min-h-[430px] flex-col items-center justify-center px-4 py-16 text-center">
            {/* Badge */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c89d3c]"
            >
              {heroBadge}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              {heroTitle}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
            >
              {heroDescription}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              {/* Primary Button */}
              <a
                href={primaryButtonLink}
                className="inline-flex h-12 min-w-[145px] items-center justify-center rounded-md bg-[#c89d3c] px-6 text-xs font-semibold text-white transition hover:bg-[#b78c30]"
              >
                {primaryButtonText}
              </a>

              {/* Secondary Button */}
              <a
                href={secondaryButtonLink}
                className="inline-flex h-12 min-w-[145px] items-center justify-center rounded-md border border-[#c89d3c] px-6 text-xs font-semibold text-white transition hover:bg-white/5"
              >
                {secondaryButtonText}
              </a>
            </motion.div>
          </div>
          <TrustBar items={trustItems} />
        </Container>
      </section>



      {/* ========================================================
          APPLICATION
      ========================================================= */}

      <section
        id="application"
        className="bg-white py-24 sm:py-28"
      >
        <Container>
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10"
          >
            <PromotionAgentForm />
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
