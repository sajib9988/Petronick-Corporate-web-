import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "../Container";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Petronick", href: "/about" },
      { label: "Our Companies", href: "/companies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      { label: "Become a Promotion Agent", href: "/promotion-agent" },
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

export default function Footer() {
  return (
    
<footer className="bg-[#101828] text-white">
  <Container>
    {/* Main Footer */}
    <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">

      {/* Brand */}
      <div>
        <Image
          src="/Word Mark.png"
          alt="Petronick Logo"
          width={90}
          height={90}
        />

        <p className="mb-5 text-sm leading-relaxed text-[#A7B0C0]">
          A vertically integrated holding company operating multiple
          revenue-generating business units across digital, fulfillment,
          advisory, and e-commerce sectors.
        </p>

        <Link
          href="/promotion-agent"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
        >
          Apply as Agent
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Links */}
      {footerLinks.map((group) => (
        <div key={group.title}>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#CBD5E1]">
            {group.title}
          </h3>

          <ul className="space-y-3">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base text-[#A7B0C0] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Container>

  {/* Bottom Bar */}
  <div className="border-t border-white/10">
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">

      <p className="text-sm text-[#8994A6]">
        © {new Date().getFullYear()} Petronick Corporate Holdings LLC. All
        rights reserved.
      </p>

      <div className="flex items-center gap-4 text-sm text-[#8994A6]">
        <Link
          href="/privacy"
          className="transition-colors hover:text-white"
        >
          Privacy Policy
        </Link>

        <span className="text-[#4B5563]">·</span>

        <Link
          href="/terms"
          className="transition-colors hover:text-white"
        >
          Terms of Use
        </Link>
      </div>
    </div>
  </div>
</footer>
  );
}
