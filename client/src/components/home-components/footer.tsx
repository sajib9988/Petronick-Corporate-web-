
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { motion, type Variants } from "framer-motion";

import { Container } from "../Container";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Petronick", href: "/about" },
      { label: "Our Companies", href: "/companies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      {
        label: "Become a Promotion Agent",
        href: "/promotion-agent",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: FaYoutube,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: FaXTwitter,
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const linkColumn: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: "easeOut",
    },
  }),
};

const socialItem: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.9,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.08,
      ease: "easeOut",
    },
  }),
};

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background: `linear-gradient(
          107.4deg,
          rgba(255,242,239,1) 11.1%,
          rgba(255,219,182,1) 37.5%,
          rgba(247,165,165,1) 54.3%,
          rgba(26,42,79,1) 84.3%
        )`,
      }}
    >
      {/* Main Footer */}
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.4fr_1fr]">
            {/* Brand */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <Link href="/" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src="/Word Mark.png"
                    alt="Petronick Logo"
                    width={105}
                    height={105}
                    priority
                    className="h-auto w-[105px] object-contain"
                  />
                </motion.div>
              </Link>

              <p className="mt-1 max-w-sm text-[15px] font-medium leading-7 text-[#1A2A4F]/85">
                A vertically integrated holding company operating multiple
                revenue-generating business units across digital, fulfillment,
                advisory, and e-commerce sectors.
              </p>
            </motion.div>

            {/* Link Columns */}
            {footerLinks.map((section, sectionIndex) => {
              const isLegal = section.title === "Legal";

              return (
                <motion.div
                  key={section.title}
                  variants={linkColumn}
                  custom={(sectionIndex + 1) * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                >
                  <h3
                    className={`mb-4 text-sm font-bold uppercase tracking-[0.15em] ${
                      isLegal
                        ? "text-white"
                        : "text-[#1A2A4F]"
                    }`}
                  >
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`group relative inline-block text-[15px] font-medium transition-colors duration-300 ${
                            isLegal
                              ? "text-white/80 hover:text-white"
                              : "text-[#1A2A4F]/80 hover:text-[#1A2A4F]"
                          }`}
                        >
                          {link.label}

                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-current transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Social Links */}
          <motion.div
            className="mt-7 flex flex-col items-end"
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
              duration: 0.6,
              delay: 0.35,
              ease: "easeOut",
            }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1A2A4F]">
              Follow Us
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.div
                    key={social.label}
                    variants={socialItem}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{
                      y: -5,
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/20 text-[#1A2A4F] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/40 hover:text-[#0F1A30] hover:shadow-md"
                    >
                      <Icon
                        size={17}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-white/20"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
      >
        <Container>
          <div className="flex flex-col items-center justify-between gap-2 py-4 sm:flex-row">
            <p className="text-sm font-semibold text-[#0F1A30]">
              © {new Date().getFullYear()} Petronick Corporate Holdings LLC.
              All rights reserved.
            </p>

            <p className="text-sm font-medium text-[#0F1A30]/80">
              Digital Development by{" "}
              <a
                href="https://fusiondigiweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0F1A30] underline underline-offset-2 transition-colors hover:text-amber-700"
              >
                Fusion DigiWeb
              </a>
            </p>
          </div>
        </Container>
      </motion.div>
    </footer>
  );
}