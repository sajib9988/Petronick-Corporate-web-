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

  backgroundImage?: string;
}

// ============================================================
// WHY JOIN CONTENT
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
// PROCESS CONTENT
// ============================================================

interface ProcessContent {
  badge?: string;
  title?: string;
  subtitle?: string;

  step1Title?: string;
  step1Description?: string;

  step2Title?: string;
  step2Description?: string;

  step3Title?: string;
  step3Description?: string;

  step4Title?: string;
  step4Description?: string;
}

// ============================================================
// CLOSING CONTENT
// ============================================================

interface ClosingContent {
  label?: string;
  headline?: string;
  paragraph?: string;
}

// ============================================================
// SNAPSHOT CONTENT
// ============================================================

interface SnapshotContent {
  label?: string;
  title?: string;

  entityTypeLabel?: string;
  entityType?: string;

  headquartersLabel?: string;
  headquarters?: string;

  structureLabel?: string;
  structure?: string;

  businessModelLabel?: string;
  businessModel?: string;

  industryFocusLabel?: string;
  industryFocus?: string;
}

// ============================================================
// APPLICATION CONTENT
// ============================================================

interface ApplicationContent {
  badge?: string;
  title?: string;
  description?: string;

  checklistTitle?: string;
  checklistDescription?: string;

  checklist1Title?: string;
  checklist1Desc?: string;

  checklist2Title?: string;
  checklist2Desc?: string;

  checklist3Title?: string;
  checklist3Desc?: string;

  formPanelTitle?: string;
  formPanelDescription?: string;

  noteTitle?: string;
  noteDescription?: string;
}

// ============================================================
// PROPS
// ============================================================
interface PromotionAgentContentProps {
  heroContent?: HeroContent;
  heroImage?: string | null;        
  heroContent1?: HeroContent;
  heroImage1?: string | null;     
  whyJoinContent?: WhyJoinContent;
  processContent?: ProcessContent;
  snapshotContent?: SnapshotContent;
  applicationContent?: ApplicationContent;
  closingContent?: ClosingContent;
}

// ============================================================
// COMPONENT
// ============================================================

export default function PromotionAgentContent({
  heroContent = {},
  heroImage,
  whyJoinContent = {},
  processContent = {},
  snapshotContent = {},
  applicationContent = {},
  closingContent = {},
  heroContent1 = {},
  heroImage1,
}: PromotionAgentContentProps) {
  // ============================================================
  // HERO DATA
  // ============================================================

  const heroBadge =
    heroContent.badge?.trim() ||
    "Promotion Agent Opportunity";

  const heroTitle =
    heroContent.title?.trim() ||
    "Become a Promotion Agent";

  const heroDescription =
    heroContent.description?.trim() ||
    "Introduce businesses and customers to products, services, and opportunities across the Petronick Corporate Holdings ecosystem. Choose one or multiple companies based on your experience, network, and market focus.";

  const primaryButtonText =
    heroContent.primaryButtonText?.trim() ||
    "Start Your Application";

  const primaryButtonLink =
    heroContent.primaryButtonLink?.trim() ||
    "#application";

  const secondaryButtonText =
    heroContent.secondaryButtonText?.trim() ||
    "See How It Works";

  const secondaryButtonLink =
    heroContent.secondaryButtonLink?.trim() ||
    "#how-it-works";
const backgroundImage =
  heroImage || heroContent.backgroundImage?.trim() || "";

  // ============================================================
  // SECOND HERO DATA
  // ============================================================

  const heroBadge1 =
    heroContent1.badge?.trim() ||
    "Promotion Agent Opportunity";

  const heroTitle1 =
    heroContent1.title?.trim() ||
    "Become a Promotion Agent";

  const heroDescription1 =
    heroContent1.description?.trim() ||
    "Introduce businesses and customers to products, services, and opportunities across the Petronick Corporate Holdings ecosystem. Choose one or multiple companies based on your experience, network, and market focus.";

  const primaryButtonText1 =
    heroContent1.primaryButtonText?.trim() ||
    "Start Your Application";

  const primaryButtonLink1 =
    heroContent1.primaryButtonLink?.trim() ||
    "#application";

  const secondaryButtonText1 =
    heroContent1.secondaryButtonText?.trim() ||
    "See How It Works";

  const secondaryButtonLink1 =
    heroContent1.secondaryButtonLink?.trim() ||
    "#how-it-works";

const backgroundImage1 =
  heroImage1 || heroContent1.backgroundImage?.trim() || "";


  // ============================================================
  // HERO STATS
  // ============================================================

  const trustItems = [
    {
      value:
        heroContent.stat1Value?.trim() ||
        "10",
      label:
        heroContent.stat1Label?.trim() ||
        "Core Business Units",
    },
    {
      value:
        heroContent.stat2Value?.trim() ||
        "1",
      label:
        heroContent.stat2Label?.trim() ||
        "Connected Ecosystem",
    },
    {
      value:
        heroContent.stat3Value?.trim() ||
        "$0",
      label:
        heroContent.stat3Label?.trim() ||
        "Upfront Cost",
    },
  ];

  // ============================================================
  // WHY JOIN DATA
  // ============================================================

  const whyJoinBadge =
    whyJoinContent.badge?.trim() ||
    "Why Join the Ecosystem";

  const whyJoinTitle =
    whyJoinContent.title?.trim() ||
    "More Opportunities. One Connected Ecosystem.";

  const whyJoinSubtitle =
    whyJoinContent.subtitle?.trim() ||
    "Represent the PCH companies that best align with your experience, relationships, and market focus while working within one connected business ecosystem.";

  const benefits = [
    {
      number: "01",
      title:
        whyJoinContent.benefit1Title?.trim() ||
        "Multiple Company Options",
      description:
        whyJoinContent.benefit1Description?.trim() ||
        "Represent one or multiple approved PCH companies based on your experience and interests.",
    },
    {
      number: "02",
      title:
        whyJoinContent.benefit2Title?.trim() ||
        "Flexible Market Focus",
      description:
        whyJoinContent.benefit2Description?.trim() ||
        "Choose opportunities that align with B2B, B2C, or both market segments.",
    },
    {
      number: "03",
      title:
        whyJoinContent.benefit3Title?.trim() ||
        "No Upfront Cost",
      description:
        whyJoinContent.benefit3Description?.trim() ||
        "Applying to become a Promotion Agent requires no financial commitment from the applicant.",
    },
  ];

  // ============================================================
  // CLOSING DATA
  // ============================================================

  const closingLabel =
    closingContent.label?.trim() ||
    "Start Your Application";

  const closingHeadline =
    closingContent.headline?.trim() ||
    "Tell Us Where You Can Create the Most Value.";

  const closingParagraph =
    closingContent.paragraph?.trim() ||
    "Complete the form below and select the companies and market areas that best fit your experience.";

  // ============================================================
  // PROCESS DATA
  // ============================================================

  const processBadge =
    processContent.badge?.trim() ||
    "Simple Process";

  const processTitle =
    processContent.title?.trim() ||
    "How It Works";

  const processSubtitle =
    processContent.subtitle?.trim() ||
    "From application to next steps, the process should be easy to understand.";

  const processSteps = [
    {
      number: "01",
      title:
        processContent.step1Title?.trim() ||
        "Submit",
      description:
        processContent.step1Description?.trim() ||
        "Tell us about your experience, market focus, and the companies you are interested in representing.",
    },
    {
      number: "02",
      title:
        processContent.step2Title?.trim() ||
        "Review",
      description:
        processContent.step2Description?.trim() ||
        "The PCH team reviews your profile and areas of interest.",
    },
    {
      number: "03",
      title:
        processContent.step3Title?.trim() ||
        "Connect",
      description:
        processContent.step3Description?.trim() ||
        "The team contacts you regarding fit, questions, and next steps.",
    },
    {
      number: "04",
      title:
        processContent.step4Title?.trim() ||
        "Start",
      description:
        processContent.step4Description?.trim() ||
        "Approved Promotion Agents can begin introducing opportunities for the selected companies.",
    },
  ];

  // ============================================================
  // START YOUR JOURNEY DATA
  // ============================================================

  const journeyBadge =
    applicationContent.badge?.trim() ||
    "Start Your Journey";

  const journeyTitle =
    applicationContent.title?.trim() ||
    "Build Your Role Inside the PCH Ecosystem.";

  const journeyDescription =
    applicationContent.description?.trim() ||
    "Tell us about your background, experience, market focus, and the companies you are interested in representing.";

  const checklistTitle =
    applicationContent.checklistTitle?.trim() ||
    "Choose the Companies That Fit You";

  const checklistDescription =
    applicationContent.checklistDescription?.trim() ||
    "You can select one or multiple companies based on your experience and interests.";

  const journeyChecklist = [
    {
      title:
        applicationContent.checklist1Title?.trim() ||
        "Business aligned",
      description:
        applicationContent.checklist1Desc?.trim() ||
        "Match your professional background and relationships.",
    },
    {
      title:
        applicationContent.checklist2Title?.trim() ||
        "Market aligned",
      description:
        applicationContent.checklist2Desc?.trim() ||
        "Select B2B, B2C, or both.",
    },
    {
      title:
        applicationContent.checklist3Title?.trim() ||
        "Portfolio aligned",
      description:
        applicationContent.checklist3Desc?.trim() ||
        "Represent one or several approved PCH companies.",
    },
  ];

  // ============================================================
  // SNAPSHOT DATA
  // ============================================================

  const snapshotStats = [
    {
      value:
        snapshotContent.entityTypeLabel?.trim() ||
        "10",
      label:
        snapshotContent.entityType?.trim() ||
        "Core Business Units",
    },
    {
      value:
        snapshotContent.headquartersLabel?.trim() ||
        "1",
      label:
        snapshotContent.headquarters?.trim() ||
        "Connected Ecosystem",
    },
    {
      value:
        snapshotContent.structureLabel?.trim() ||
        "$0",
      label:
        snapshotContent.structure?.trim() ||
        "Upfront Cost",
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

        {/* Hero banner image */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${backgroundImage}")`,
            }}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#10283f]/85" />

        {/* Decorative overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[20%] top-[25%] h-[420px] w-[75%] rotate-[-10deg] rounded-[50%] border border-[#c89d3c]/15" />

          <div className="absolute -right-[25%] top-[5%] h-[360px] w-[75%] rotate-[8deg] rounded-[50%] border border-white/10" />

          <div className="absolute bottom-[-35%] left-[10%] h-[500px] w-[80%] rotate-[-5deg] rounded-[50%] border border-white/10" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,157,60,0.08),transparent_55%)]" />
        </div>

        <Container>
          <div className="relative z-10 flex min-h-[430px] flex-col items-center justify-center px-4 py-16 text-center">

            <motion.div
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
              className="flex items-center justify-center gap-3"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c89d3c]">
                {heroBadge}
              </p>

              <span className="h-px w-8 bg-[#c89d3c]" />
            </motion.div>

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
              className="mt-4 max-w-[900px] font-serif text-[36px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[46px] lg:text-[56px]"
            >
              {heroTitle}
            </motion.h1>

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
              className="mt-5 max-w-[720px] text-[14px] leading-7 text-slate-300 sm:text-[15px]"
            >
              {heroDescription}
            </motion.p>

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
              className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <a
                href={primaryButtonLink}
                className="inline-flex h-[50px] min-w-[190px] items-center justify-center rounded-md bg-[#c99a3c] px-7 text-[13px] font-semibold text-white transition hover:bg-[#b78b32]"
              >
                {primaryButtonText}
              </a>

              <a
                href={secondaryButtonLink}
                className="inline-flex h-[50px] min-w-[190px] items-center justify-center rounded-md border border-[#c99a3c] px-7 text-[13px] font-semibold text-white transition hover:bg-white/5"
              >
                {secondaryButtonText}
              </a>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ========================================================
          STATS
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

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c89d3c]/10 text-sm font-bold text-[#c89d3c] sm:h-14 sm:w-14 sm:text-base">
                  {item.value}
                </div>

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

      <section className="bg-white py-12 sm:py-16">
        <Container>

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

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#c89d3c]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c89d3c]">
                {whyJoinBadge}
              </p>

              <span className="h-px w-8 bg-[#c89d3c]" />

            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10283f] sm:text-4xl">
              {whyJoinTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
              {whyJoinSubtitle}
            </p>

          </motion.div>

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

                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#c89d3c]/10 text-xs font-bold text-[#c89d3c]">
                  {benefit.number}
                </div>

                <h3 className="mt-6 font-serif text-lg font-bold leading-snug text-[#10283f] sm:text-xl">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-500 sm:text-[13px]">
                  {benefit.description}
                </p>

              </motion.div>
            ))}

          </motion.div>

        </Container>
      </section>

      {/* ========================================================
          HOW IT WORKS
      ========================================================= */}

      <section
        id="how-it-works"
        className="bg-slate-50 py-12 sm:py-16"
      >
        <Container className="py-4 lg:py-2">

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

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#c89d3c]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c89d3c]">
                {processBadge}
              </p>

              <span className="h-px w-8 bg-[#c89d3c]" />

            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10283f] sm:text-4xl">
              {processTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
              {processSubtitle}
            </p>

          </motion.div>

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
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >

            {processSteps.map((step) => (
              <motion.div
                key={step.number}
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
                className="relative flex min-h-[190px] flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c89d3c]/40 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10283f] text-[11px] font-bold text-white shadow-sm">
                  {step.number}
                </div>

                <h3 className="mt-4 font-serif text-lg font-bold text-[#10283f]">
                  {step.title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  {step.description}
                </p>

              </motion.div>
            ))}

          </motion.div>

        </Container>
      </section>

      {/* ========================================================
          START YOUR JOURNEY
      ========================================================= */}

      <section className="bg-white py-12 sm:py-14 lg:py-[52px]">
        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid w-full items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-[56px]"
          >

            {/* LEFT SIDE */}

            <div className="pt-[2px]">

              <div className="flex items-center gap-4">

                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#b98b34]">
                  {journeyBadge}
                </p>

                <span className="h-px w-[36px] bg-[#b98b34]" />

              </div>

              <h2 className="mt-5 font-serif text-[38px] font-bold leading-[1.12] tracking-[-0.02em] text-[#10283f] sm:text-[44px] lg:text-[46px]">
                {journeyTitle}
              </h2>

              <p className="mt-6 text-[16px] leading-[1.75] text-[#66758a] sm:text-[17px]">
                {journeyDescription}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                {snapshotStats.map((item, index) => (
                  <motion.div
                    key={`${item.label}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 14,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="flex min-h-[106px] flex-col items-center justify-center rounded-[12px] border border-[#d9e0e8] bg-white px-4 py-5 text-center"
                  >

                    <p className="font-serif text-[30px] font-bold leading-none text-[#10283f]">
                      {item.value}
                    </p>

                    <p className="mt-3 text-[12px] leading-[1.4] text-[#66758a]">
                      {item.label}
                    </p>

                  </motion.div>
                ))}

              </div>

            </div>

            {/* RIGHT SIDE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full rounded-[18px] bg-[#10283f] px-7 py-8 text-white sm:px-9 sm:py-9 lg:min-h-[335px] lg:px-[36px] lg:py-[34px]"
            >

              <h3 className="font-serif text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-white sm:text-[30px]">
                {checklistTitle}
              </h3>

              <p className="mt-4 text-[15px] leading-[1.7] text-[#d5dce6]">
                {checklistDescription}
              </p>

              <div className="mt-6 space-y-5">

                {journeyChecklist.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-start gap-3"
                  >

                    <div className="mt-[1px] flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-[#c99a3c] text-[13px] font-bold text-white">
                      ✓
                    </div>

                    <div>

                      <p className="text-[15px] font-semibold leading-[1.3] text-white sm:text-[16px]">
                        {item.title}
                      </p>

                      <p className="mt-[2px] text-[12px] leading-[1.45] text-[#cfd8e3] sm:text-[13px]">
                        {item.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </motion.div>

          </motion.div>

        </Container>
      </section>

      {/* ========================================================
          START YOUR APPLICATION
      ========================================================= */}

      <section
        id="application"
        className="bg-[#f2f4f7] py-14 sm:py-16 lg:py-20"
      >
        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
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
            className="w-full overflow-hidden rounded-[18px] bg-[#10283f] px-5 py-8 text-white shadow-[0_18px_55px_rgba(15,23,42,0.12)] sm:px-8 lg:px-12 lg:py-10"
          >

            {/* HEADER */}

            <div className="mb-7 text-center">

              <div className="flex items-center justify-center gap-3">

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c99a3c] sm:text-[10px]">
                  {closingLabel}
                </p>

                <span className="h-px w-8 bg-[#c99a3c]" />

              </div>

              <h2 className="mt-3 font-serif text-[24px] font-bold leading-tight text-white sm:text-[28px] lg:text-[32px]">
                {closingHeadline}
              </h2>

              <p className="mx-auto mt-3 max-w-[760px] text-[11px] leading-5 text-slate-300 sm:text-[12px]">
                {closingParagraph}
              </p>

            </div>

            <PromotionAgentForm />

          </motion.div>

        </Container>
      </section>

      {/* ========================================================
          SECOND HERO / CLOSING BANNER
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#16324f] text-white">

        {/* HeroContent1 banner image */}
      {backgroundImage1 && (
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url("${backgroundImage1}")`,
    }}
  />
)}

        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-[#16324f]/88" />

        {/* Decorative ellipse */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-1/2 h-[120px] w-[500px] -translate-x-1/2 -translate-y-[48%] rounded-[50%] border border-[#c99a3c]/20 sm:h-[145px] sm:w-[650px]" />

          <div className="absolute left-1/2 top-1/2 h-[210px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.05]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,154,60,0.07),transparent_62%)]" />

        </div>

        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
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
              amount: 0.15,
            }}
            className="relative z-10 flex min-h-[285px] flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[330px] sm:py-14"
          >

            {/* Badge */}

            <div className="flex items-center justify-center gap-3">

              <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#d2a33d] sm:text-[11px]">
                {heroBadge1}
              </p>

              <span className="h-px w-8 bg-[#c99a3c]" />

            </div>

            {/* Heading */}

            <h2 className="mt-3 max-w-[680px] font-serif text-[28px] font-bold leading-[1.08] tracking-[-0.015em] text-white sm:text-[36px] lg:text-[40px]">
              {heroTitle1}
            </h2>

            {/* Description */}

            <p className="mt-4 max-w-[600px] text-[12px] leading-[1.7] text-slate-300 sm:text-[13px]">
              {heroDescription1}
            </p>

            {/* CTA buttons */}

            <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">

              <a
                href={primaryButtonLink1}
                className="inline-flex h-[48px] min-w-[178px] items-center justify-center rounded-[5px] bg-[#c99a3c] px-6 text-[12px] font-semibold text-white transition hover:bg-[#b88b32]"
              >
                {primaryButtonText1}
              </a>

              <a
                href={secondaryButtonLink1}
                className="inline-flex h-[48px] min-w-[178px] items-center justify-center rounded-[5px] border border-[#c99a3c] bg-transparent px-6 text-[12px] font-semibold text-white transition hover:bg-white/5"
              >
                {secondaryButtonText1}
              </a>

            </div>

          </motion.div>

        </Container>




      </section>

    </main>
  );
}