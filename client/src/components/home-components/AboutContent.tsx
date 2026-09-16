"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Settings, BarChart3 } from "lucide-react";

import { Container } from "@/components/Container";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";
import { Button } from "../ui/button";

// ============================================================
// TRUST CARDS (static icon + label, shown beside the About text)
// ============================================================

const TRUST_CARDS = [
  {
    icon: Users,
    title: "Shared Strategy",
    description:
      "Portfolio level leadership helps align priorities, resources, and long term business direction.",
  },
  {
    icon: Settings,
    title: "Operational Support",
    description:
      "Marketing, technology, procurement, logistics, fulfillment, and advisory capabilities support execution.",
  },
  {
    icon: BarChart3,
    title: "Independent Growth",
    description:
      "Each company serves its own market while benefiting from shared infrastructure and expertise.",
  },
];

interface AboutContentProps {
  // ============================================================
  // HERO
  // ============================================================

  heroImage?: string | null;

  heroContent?: {
    badge?: string;
    headline?: string;
    subheadline?: string;
    primaryBtn?: string;
    primaryBtnLink?: string;
    secondaryBtn?: string;
    secondaryBtnLink?: string;
  };

  // ============================================================
  // ABOUT
  // ============================================================

  aboutContent?: {
    title?: string;
    subtitle?: string;
    body?: string;
    btnText?: string;
    btnLink?: string;
  };

  // ============================================================
  // VALUES
  // ============================================================

  valuesContent?: {
    label?: string;
    title?: string;

    value1Title?: string;
    value1Description?: string;

    value2Title?: string;
    value2Description?: string;

    value3Title?: string;
    value3Description?: string;

    value4Title?: string;
    value4Description?: string;
  };

  // ============================================================
  // CTA
  // ============================================================

  ctaContent?: {
    title?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
  };
}

export default function AboutContent({
  heroImage,
  heroContent = {},
  aboutContent = {},
  valuesContent = {},
  ctaContent = {},
}: AboutContentProps) {
  // ============================================================
  // HERO DATA
  // ============================================================

  const heroBadge = heroContent.badge ?? "About Petronick";

  const headline =
    heroContent.headline ??
    "Building Businesses Through Strategic Ownership and Operational Collaboration";

  const subheadline =
    heroContent.subheadline ??
    "Petronick Corporate Holdings LLC owns and supports a connected portfolio of companies designed to operate independently while benefiting from shared strategy, technology, marketing, logistics, fulfillment, procurement, and leadership.";

  const primaryBtn = heroContent.primaryBtn ?? "Explore Our Companies";
  const primaryBtnLink = heroContent.primaryBtnLink ?? "/companies";
  const secondaryBtn = heroContent.secondaryBtn ?? "Contact Us";
  const secondaryBtnLink = heroContent.secondaryBtnLink ?? "/contact";

  // ============================================================
  // ABOUT DATA
  // ============================================================

  const missionSubtitle =
    aboutContent.subtitle ?? "Our Story";

  const missionTitle =
    aboutContent.title ??
    "One Holding Company. Multiple Specialized Businesses.";

  const missionBody =
    aboutContent.body ??
    "Petronick Corporate Holdings LLC was established to organize, support, and scale multiple business ventures through shared resources and strategic leadership. Each business maintains its own market focus while benefiting from a connected operational ecosystem that helps accelerate launches, improve execution, and create long term growth opportunities.";

  const aboutBtnText =
    aboutContent.btnText ?? "Explore Our Companies";

  const aboutBtnLink =
    aboutContent.btnLink ?? "/companies";

  // ============================================================
  // VALUES DATA
  // ============================================================

  const coreValues = [
    {
      title: valuesContent.value1Title,
      desc: valuesContent.value1Description,
    },
    {
      title: valuesContent.value2Title,
      desc: valuesContent.value2Description,
    },
    {
      title: valuesContent.value3Title,
      desc: valuesContent.value3Description,
    },
    {
      title: valuesContent.value4Title,
      desc: valuesContent.value4Description,
    },
  ].filter((v) => Boolean(v.title));

  const valuesLabel =
    valuesContent.label ?? "Our DNA";

  const valuesTitle =
    valuesContent.title ?? "How We Operate as a Company";

  // ============================================================
  // CTA DATA
  // ============================================================

  const ctaTitle =
    ctaContent.title ?? "Ready to Partner With Us?";

  const ctaDescription =
    ctaContent.description ??
    "Qualified Promotion Agents can represent one or multiple Petronick business units. Join our growing ecosystem today.";

  const ctaBtnText =
    ctaContent.btnText ?? "Apply as Promotion Agent";

  const ctaBtnLink =
    ctaContent.btnLink ?? "/promotion-agent";

  const secondaryBtnText =
    ctaContent.secondaryBtnText ?? "Contact Us";

  const ctaSecondaryBtnLink =
    ctaContent.secondaryBtnLink ?? "/contact";

  return (
    <main className="min-h-screen ">
      <Container>

        {/* ======================================================
            PART 1 — HERO
        ====================================================== */}
   
<section className="pt-4 sm:pt-6">
  <div className="relative bg-gray-950 rounded-3xl overflow-hidden py-8 sm:py-10 lg:py-12">

    {heroImage && (
      <Image
        src={heroImage}
        alt="Petronick Corporate Holdings"
        fill
        priority
        className="object-cover opacity-30"
      />
    )}

    <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/70 to-gray-950" />

    <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

    <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />

    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.15, 0.1)}
      className="relative max-w-3xl mx-auto px-6 text-center"
    >

      <motion.p
        variants={fadeUp(0, 0.6)}
        className="text-amber-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-5"
      >
        — {heroBadge} —
      </motion.p>

      <motion.h1
        variants={fadeUp(0.05, 0.9)}
        className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15]"
      >
        {headline}
      </motion.h1>

      <motion.p
        variants={fadeUp(0.15, 0.9)}
        className="mt-6 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
      >
        {subheadline}
      </motion.p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

        <motion.div variants={fadeSlide("left", 0, 80, 0.9)}>
          <Button
            asChild
            size="lg"
            className="bg-amber-400 hover:bg-amber-300 text-gray-950! font-semibold border-0 rounded-md shadow-lg shadow-amber-900/30 hover:scale-[1.03] transition-all"
          >
            <Link href={primaryBtnLink}>
              {primaryBtn}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeSlide("right", 0, 80, 0.9)}>
          <Button
            asChild
            size="lg"
            className="bg-transparent text-white! font-semibold border border-white/50 rounded-md hover:bg-white/10 hover:border-white hover:scale-[1.03] transition-all"
          >
            <Link href={secondaryBtnLink}>
              {secondaryBtn}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </motion.div>
  </div>
</section>

        {/* ======================================================
            PART 2 — ABOUT + SNAPSHOT
        ====================================================== */}

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT — ABOUT / MISSION */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={fadeSlide(
                "left",
                0,
                70,
                0.7
              )}
            >
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4">
                — {missionSubtitle}
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {missionTitle}
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 whitespace-pre-line">
                {missionBody}
              </p>

              <Link
                href={aboutBtnLink}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b-2 border-amber-500 pb-1 hover:gap-3 transition-all"
              >
                {aboutBtnText}

                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* RIGHT — TRUST CARDS */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={staggerContainer(0.1, 0.1)}
              className="flex flex-col gap-4"
            >
              {TRUST_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeSlide("right", 0, 60, 0.6)}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <card.icon size={20} />
                  </span>

                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {card.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 3 — VALUES
        ====================================================== */}

        <section className="py-8">
          <div className="rounded-3xl bg-gray-950 overflow-hidden px-6 sm:px-10 lg:px-14 py-16 sm:py-20">

            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                {valuesLabel}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {valuesTitle}
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={staggerContainer(0.1, 0)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {coreValues.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp(0, 0.5)}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-300 flex gap-5"
                >
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-stone-900 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-bold text-white text-base mb-2">
                      {v.title}
                    </h3>

                    {v.desc && (
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {v.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 4 — CTA
        ====================================================== */}

        <section className="py-8 pb-14">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white py-16 sm:py-20 px-6 sm:px-10 text-center">

            <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />

            <div className="relative">

              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {ctaTitle}
              </h2>

              <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
                {ctaDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">

                <Link
                  href={ctaBtnLink}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:scale-[1.03] transition-all"
                >
                  {ctaBtnText}

                  <ArrowRight size={14} />
                </Link>

                <Link
                  href={ctaSecondaryBtnLink}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {secondaryBtnText}
                </Link>

              </div>

            </div>
          </div>
        </section>

      </Container>
    </main>
  );
}