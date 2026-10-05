"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const footerLinks = {
  company: [
    {
      label: "About Petronick",
      href: "/about",
    },
    {
      label: "Our Companies",
      href: "/companies",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],

  opportunities: [
    {
      label: "Become a Promotion Agent",
      href: "/promotion-agent",
    },
  ],

  legal: [
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms of Use",
      href: "/terms",
    },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedinIn,
  },
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
    label: "X",
    href: "https://x.com/",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0C1D31] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-[54px]">

        {/* Main Footer */}
        <div
          className="
            grid
            grid-cols-1
            gap-9
            pt-[42px]
            pb-[76px]
            sm:grid-cols-2
            lg:grid-cols-[1.65fr_0.9fr_1.08fr_0.82fr_0.8fr]
            lg:gap-[44px]
          "
        >

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/Word Mark.png"
                alt="Petronick Corporate Holdings LLC"
                width={130}
                height={40}
                priority
                className="h-auto w-[130px] object-contain"
              />
            </Link>

            <p
              className="
                mt-[17px]
                max-w-[280px]
                text-[13px]
                font-normal
                leading-[1.6]
                text-[#F0F3F7]
              "
            >
              A connected holding company supporting specialized
              businesses across digital growth, fulfillment,
              ecommerce, advisory, product development, gifting,
              title services, and specialty commerce.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3
              className="
                mb-[15px]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.04em]
                text-[#B99346]
              "
            >
              Company
            </h3>

            <ul className="space-y-[10px]">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-[12px]
                      font-normal
                      leading-[1.5]
                      text-[#EEF2F6]
                      transition-colors
                      hover:text-[#B99346]
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h3
              className="
                mb-[15px]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.04em]
                text-[#B99346]
              "
            >
              Opportunities
            </h3>

            <ul className="space-y-[10px]">
              {footerLinks.opportunities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      whitespace-nowrap
                      text-[12px]
                      font-normal
                      leading-[1.5]
                      text-[#EEF2F6]
                      transition-colors
                      hover:text-[#B99346]
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="
                mb-[15px]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.04em]
                text-[#B99346]
              "
            >
              Legal
            </h3>

            <ul className="space-y-[10px]">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-[12px]
                      font-normal
                      leading-[1.5]
                      text-[#EEF2F6]
                      transition-colors
                      hover:text-[#B99346]
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3
              className="
                mb-[17px]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.04em]
                text-[#B99346]
              "
            >
              Follow Us
            </h3>

            <div className="flex items-center gap-[10px]">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      flex
                      h-[30px]
                      w-[30px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#B99346]
                      text-[#F5F7FA]
                      transition-all
                      duration-200
                      hover:bg-[#B99346]
                      hover:text-[#0C1D31]
                    "
                  >
                    <Icon size={11} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#2B3D51]" />

        {/* Bottom Footer */}
        <div
          className="
            flex
            flex-col
            gap-3
            py-[18px]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-[11px] font-normal text-[#D9E0E7]">
            © {new Date().getFullYear()} Petronick Corporate Holdings LLC.
            All rights reserved.
          </p>

          <p className="text-[11px] font-normal text-[#D9E0E7]">
            Digital Development by{" "}
            <a
              href="https://fusiondigiweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[#B99346]
                transition-colors
                hover:text-[#D4AE5B]
              "
            >
              Fusion DigiWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}