"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  FileText,
  Handshake,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  ShieldCheck,
  Building2,
  LucideIcon,
} from "lucide-react";

import PromotionAgentForm from "@/components/admin/form/Promotion-form";
import { Container } from "@/components/Container";

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  Users,
  Zap,
  FileText,
  Handshake,
  Rocket,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
};

function getIcon(
  name?: string,
  fallback: LucideIcon = Sparkles
): LucideIcon {
  if (!name) return fallback;
  return ICON_MAP[name] ?? fallback;
}

interface HeroContent {
  badge?: string;
  headlinePrefix?: string;
  headlineAccent?: string;
  subheadline?: string;
}

interface BenefitsContent {
  badge?: string;
  title?: string;
  subtitle?: string;

  benefit1Icon?: string;
  benefit1Title?: string;
  benefit1Description?: string;

  benefit2Icon?: string;
  benefit2Title?: string;
  benefit2Description?: string;

  benefit3Icon?: string;
  benefit3Title?: string;
  benefit3Description?: string;

  statValue1?: string;
  statLabel1?: string;

  statValue2?: string;
  statLabel2?: string;

  statValue3?: string;
  statLabel3?: string;
}

interface ProcessContent {
  badge?: string;
  title?: string;
  subtitle?: string;

  step1Icon?: string;
  step1Title?: string;
  step1Description?: string;

  step2Icon?: string;
  step2Title?: string;
  step2Description?: string;

  step3Icon?: string;
  step3Title?: string;
  step3Description?: string;

  step4Icon?: string;
  step4Title?: string;
  step4Description?: string;
}

interface ApplicationContent {
  badge?: string;
  title?: string;
  description?: string;

  checklist1?: string;
  checklist2?: string;
  checklist3?: string;
  checklist4?: string;

  formPanelTitle?: string;
  formPanelDescription?: string;

  noteTitle?: string;
  noteDescription?: string;
}

interface CtaContent {
  eyebrow?: string;
  title?: string;
  description?: string;
  btnText?: string;
  btnLink?: string;
}

interface PromotionAgentContentProps {
  heroContent?: HeroContent;
  benefitsContent?: BenefitsContent;
  processContent?: ProcessContent;
  applicationContent?: ApplicationContent;
  ctaContent?: CtaContent;
}

export default function PromotionAgentContent({
  heroContent = {},
  benefitsContent = {},
  processContent = {},
  applicationContent = {},
  ctaContent = {},
}: PromotionAgentContentProps) {
  // ============================================================
  // HERO
  // ============================================================

  const heroBadge =
    heroContent.badge ?? "Partnership Opportunity";

  const heroPrefix =
    heroContent.headlinePrefix ?? "Become";

  const heroAccent =
    heroContent.headlineAccent ?? "a Promotion Agent";

  const heroSubheadline =
    heroContent.subheadline ??
    "Represent one or multiple Petronick business units and help connect businesses and consumers with products, services, and opportunities.";

  // ============================================================
  // BENEFITS
  // ============================================================

  const benefitsBadge =
    benefitsContent.badge ?? "Why Join the Ecosystem?";

  const benefitsTitle =
    benefitsContent.title ??
    "More opportunities.\nOne connected ecosystem.";

  const benefitsSubtitle =
    benefitsContent.subtitle ??
    "Work across the Petronick ecosystem and represent the business units that best align with your experience, network, and focus.";

  const perks = [
    {
      icon: getIcon(
        benefitsContent.benefit1Icon,
        TrendingUp
      ),
      title:
        benefitsContent.benefit1Title ??
        "Multiple Revenue Streams",
      desc:
        benefitsContent.benefit1Description ??
        "Represent one or multiple business units based on your expertise.",
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    },

    {
      icon: getIcon(
        benefitsContent.benefit2Icon,
        Users
      ),
      title:
        benefitsContent.benefit2Title ??
        "Ecosystem Access",
      desc:
        benefitsContent.benefit2Description ??
        "Gain access to our vertically integrated network of companies.",
      iconClass: "text-blue-600",
      bgClass: "bg-blue-50",
    },

    {
      icon: getIcon(
        benefitsContent.benefit3Icon,
        Zap
      ),
      title:
        benefitsContent.benefit3Title ??
        "Revenue Ready",
      desc:
        benefitsContent.benefit3Description ??
        "Our subsidiaries are operational and ready to generate income.",
      iconClass: "text-amber-600",
      bgClass: "bg-amber-50",
    },
  ];

  // ============================================================
  // STATS
  // ============================================================

  const trustStats = [
    {
      value: benefitsContent.statValue1 ?? "8+",
      label:
        benefitsContent.statLabel1 ?? "Business Units",
    },

    {
      value: benefitsContent.statValue2 ?? "5",
      label:
        benefitsContent.statLabel2 ?? "Day Avg. Review",
    },

    {
      value: benefitsContent.statValue3 ?? "0%",
      label:
        benefitsContent.statLabel3 ?? "Upfront Cost",
    },
  ];

  // ============================================================
  // PROCESS
  // ============================================================

  const processBadge =
    processContent.badge ?? "Simple Process";

  const processTitle =
    processContent.title ?? "How It Works";

  const processSubtitle =
    processContent.subtitle ??
    "From application to opportunity, the process is simple and straightforward.";

  const steps = [
    {
      number: "01",
      title: processContent.step1Title ?? "Submit",
      description:
        processContent.step1Description ??
        "Tell us about your experience and interests.",
      icon: getIcon(
        processContent.step1Icon,
        FileText
      ),
    },

    {
      number: "02",
      title: processContent.step2Title ?? "Review",
      description:
        processContent.step2Description ??
        "Our team reviews your profile and market focus.",
      icon: getIcon(
        processContent.step2Icon,
        Users
      ),
    },

    {
      number: "03",
      title: processContent.step3Title ?? "Connect",
      description:
        processContent.step3Description ??
        "We reach out regarding your next steps.",
      icon: getIcon(
        processContent.step3Icon,
        Handshake
      ),
    },

    {
      number: "04",
      title: processContent.step4Title ?? "Start",
      description:
        processContent.step4Description ??
        "Begin representing your selected business units.",
      icon: getIcon(
        processContent.step4Icon,
        Rocket
      ),
    },
  ];

  // ============================================================
  // APPLICATION
  // ============================================================

  const appBadge =
    applicationContent.badge ?? "Start Your Journey";

  const appTitle =
    applicationContent.title ??
    "Build Your Role Inside Our Ecosystem.";

  const appDescription =
    applicationContent.description ??
    "Tell us about your background, experience, and the business units you are interested in representing.";

  const checklist = [
    applicationContent.checklist1 ??
      "Submit your application below",

    applicationContent.checklist2 ??
      "Our team reviews your profile",

    applicationContent.checklist3 ??
      "We reach out regarding next steps",

    applicationContent.checklist4 ??
      "Begin representing selected business units",
  ];

  const formPanelTitle =
    applicationContent.formPanelTitle ??
    "Start Your Application";

  const formPanelDescription =
    applicationContent.formPanelDescription ??
    "Tell us where you can create the most value.";

  const noteTitle =
    applicationContent.noteTitle ?? "No upfront cost";

  const noteDescription =
    applicationContent.noteDescription ??
    "Becoming a Promotion Agent requires no financial commitment from your side.";

  // ============================================================
  // FINAL CTA
  // ============================================================

  const ctaEyebrow =
    ctaContent.eyebrow ?? "Ready to Get Started?";

  const ctaTitle =
    ctaContent.title ??
    "Turn Your Network Into New Opportunities.";

  const ctaDescription =
    ctaContent.description ??
    "Apply to become a Promotion Agent and explore opportunities across the Petronick Corporate Holdings ecosystem.";

  const ctaBtnText =
    ctaContent.btnText ?? "Submit Application";

  const ctaBtnLink =
    ctaContent.btnLink ?? "#application";

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate overflow-hidden bg-[#0a0f14] text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

          <div className="absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <Container>
          <div className="relative mx-auto flex min-h-[650px] max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                {heroBadge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.65,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              {heroPrefix}{" "}

              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                {heroAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.65,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
            >
              {heroSubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.65,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
            >

              {/* FIXED <a> */}
              <a
                href="#application"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10"
              >
                Apply Now

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* FIXED <a> */}
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                How It Works
              </a>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 0.8,
                },
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <a
                href="#benefits"
                className="flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-white"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                  Explore
                </span>

                <ArrowDown
                  size={15}
                  className="animate-bounce"
                />
              </a>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* =====================================================
          WHY JOIN
      ====================================================== */}

      <section
        id="benefits"
        className="bg-white py-24 sm:py-28"
      >
        <Container>

          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                {benefitsBadge}
              </p>

              <h2 className="mt-4 whitespace-pre-line text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {benefitsTitle}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                {benefitsSubtitle}
              </p>
            </motion.div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {perks.map((perk, index) => {
              const Icon = perk.icon;

              return (
                <motion.div
                  key={perk.title}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  whileHover={{
                    y: -7,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${perk.bgClass} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      size={22}
                      className={perk.iconClass}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-950">
                    {perk.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {perk.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </Container>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section
        id="how-it-works"
        className="relative overflow-hidden bg-slate-50 py-24 sm:py-28"
      >
        <Container>

          <div className="text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                {processBadge}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {processTitle}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                {processSubtitle}
              </p>
            </motion.div>
          </div>

          <div className="relative mt-16">

            <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-slate-200 lg:block">
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="h-full origin-left bg-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0,
                      y: 28,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.12,
                        ease: [0.22, 1, 0.36, 1] as const,
                      },
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-950 text-white shadow-lg">
                      <Icon size={20} />
                    </div>

                    <p className="mt-5 text-xs font-bold tracking-[0.2em] text-emerald-600">
                      {step.number}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}

            </div>
          </div>

        </Container>
      </section>

      {/* =====================================================
          APPLICATION
      ====================================================== */}

      <section
        id="application"
        className="bg-white py-24 sm:py-28"
      >
        <Container>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.7fr] lg:items-start lg:gap-16">

            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                x: -80,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="lg:sticky lg:top-24"
            >

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                {appBadge}
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                {appTitle}
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                {appDescription}
              </p>

              {/* STATS */}

              <div className="mt-8 grid grid-cols-3 gap-3">
                {trustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-4 text-center"
                  >
                    <div className="text-xl font-bold text-slate-950">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-[10px] font-medium uppercase leading-tight tracking-wide text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CHECKLIST */}

              <div className="mt-8 space-y-5">
                {checklist.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 flex-shrink-0 text-emerald-600"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* TRUST BADGES */}

              <div className="mt-8 flex flex-wrap gap-2">
                {perks.map((perk) => {
                  const Icon = perk.icon;

                  return (
                    <span
                      key={perk.title}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600"
                    >
                      <Icon
                        size={12}
                        className={perk.iconClass}
                      />

                      {perk.title}
                    </span>
                  );
                })}
              </div>

              {/* NOTE */}

              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <CheckCircle2
                      size={20}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-emerald-900">
                      {noteTitle}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      {noteDescription}
                    </p>
                  </div>

                </div>
              </div>

            </motion.div>

            {/* FORM */}

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
                  ease: [0.22, 1, 0.36, 1] as const,
                },
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10"
            >

              <div className="mb-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <FileText size={18} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-950">
                      {formPanelTitle}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {formPanelDescription}
                    </p>
                  </div>

                </div>

              </div>

              <PromotionAgentForm />

            </motion.div>

          </div>

        </Container>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0a0f14] py-24 text-white sm:py-28">

        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="relative mx-auto max-w-3xl text-center"
          >

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              {ctaEyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              {ctaTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              {ctaDescription}
            </p>

            {/* FIXED <a> */}

            <a
              href={ctaBtnLink}
              className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10"
            >
              {ctaBtnText}

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

          </motion.div>

        </Container>
      </section>

    </main>
  );
}