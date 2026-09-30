"use client";

import { motion } from "framer-motion";

import PromotionAgentForm from "@/components/admin/form/Promotion-form";
import { Container } from "@/components/Container";

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
// WHY JOIN / BENEFITS CONTENT
// ============================================================

interface WhyJoinContent {
  badge?: string;
  title?: string;
  subtitle?: string;

  benefit1Title?: string;
  benefit1Description?: string;

  benefit2Title?: string;
  benefit2Description?: string;

  benefit3Title?: string;
  benefit3Description?: string;
}

// ============================================================
// PROPS
// ============================================================

interface PromotionAgentContentProps {
  heroContent?: HeroContent;
  whyJoinContent?: WhyJoinContent;
}

// ============================================================
// COMPONENT
// ============================================================

export default function PromotionAgentContent({
  heroContent = {},
  whyJoinContent = {},
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

  // ============================================================
  // STATS DATA
  // ============================================================

  const trustItems = [
    {
      value: heroContent.stat1Value?.trim() || "10",
      label:
        heroContent.stat1Label?.trim() || "Core Business Units",
    },
    {
      value: heroContent.stat2Value?.trim() || "1",
      label:
        heroContent.stat2Label?.trim() || "Connected Ecosystem",
    },
    {
      value: heroContent.stat3Value?.trim() || "$0",
      label:
        heroContent.stat3Label?.trim() || "Upfront Cost",
    },
  ];

  // ============================================================
  // WHY JOIN DATA
  // ============================================================

  const whyJoinBadge =
    whyJoinContent.badge ?? "Why Join the Ecosystem";

  const whyJoinTitle =
    whyJoinContent.title ??
    "More Opportunities. One Connected Ecosystem.";

  const whyJoinSubtitle =
    whyJoinContent.subtitle ??
    "Represent the PCH companies that best align with your experience, relationships, and market focus while working within one connected business ecosystem.";

  const benefits = [
    {
      number: "01",
      title:
        whyJoinContent.benefit1Title ??
        "Multiple Company Options",
      description:
        whyJoinContent.benefit1Description ??
        "Represent one or multiple approved PCH companies based on your experience and interests.",
    },
    {
      number: "02",
      title:
        whyJoinContent.benefit2Title ??
        "Flexible Market Focus",
      description:
        whyJoinContent.benefit2Description ??
        "Choose opportunities that align with B2B, B2C, or both market segments.",
    },
    {
      number: "03",
      title:
        whyJoinContent.benefit3Title ??
        "No Upfront Cost",
      description:
        whyJoinContent.benefit3Description ??
        "Applying to become a Promotion Agent requires no financial commitment from the applicant.",
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

        {/* Background Decorative Curves */}

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
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c89d3c]"
            >
              {heroBadge}
            </motion.p>

            {/* Title */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              {heroTitle}
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
            >
              {heroDescription}
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
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

        </Container>
      </section>


      {/* ========================================================
          STATS / TRUST STRIP
      ========================================================= */}

      <section className="bg-white py-5 sm:py-7">

        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
          >

            {trustItems.map((item, index) => (
              <motion.div
                key={`${item.label}-${index}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="flex min-h-[92px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:min-h-[105px] sm:px-7"
              >

                {/* Value Circle */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c89d3c]/10 text-sm font-bold text-[#c89d3c] sm:h-14 sm:w-14 sm:text-base">
                  {item.value}
                </div>

                {/* Value + Label */}

                <div className="min-w-0">

                  <p className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">
                    {item.value}
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
                    {item.label}
                  </p>

                </div>

              </motion.div>
            ))}

          </motion.div>

        </Container>

      </section>


      {/* ========================================================
          WHY JOIN THE ECOSYSTEM
      ========================================================= */}

      <section className="bg-white py-20 sm:py-24">

        <Container>

          {/* Section Header */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto max-w-3xl text-center"
          >

            {/* Badge */}

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#c89d3c]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c89d3c]">
                {whyJoinBadge}
              </p>

              <span className="h-px w-8 bg-[#c89d3c]" />

            </div>

            {/* Title */}

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10283f] sm:text-4xl">
              {whyJoinTitle}
            </h2>

            {/* Subtitle */}

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
              {whyJoinSubtitle}
            </p>

          </motion.div>


          {/* Benefit Cards */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
          >

            {benefits.map((benefit) => (
              <motion.div
                key={benefit.number}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 25,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                    },
                  },
                }}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c89d3c]/40 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)] sm:p-7"
              >

                {/* Number */}

                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#c89d3c]/10 text-xs font-bold text-[#c89d3c]">
                  {benefit.number}
                </div>

                {/* Title */}

                <h3 className="mt-6 font-serif text-lg font-bold leading-snug text-[#10283f] sm:text-xl">
                  {benefit.title}
                </h3>

                {/* Description */}

                <p className="mt-3 text-xs leading-6 text-slate-500 sm:text-[13px]">
                  {benefit.description}
                </p>

              </motion.div>
            ))}

          </motion.div>

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
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
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