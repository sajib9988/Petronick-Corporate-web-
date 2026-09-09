"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthSection } from "./AuthSection";
import { navLinks } from "./nav-links";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#0B1220] border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-20">
          {/* Logo — left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/PCH Logo.png"
              alt="Petronick Corporate Holdings LLC"
              width={220}
              height={180}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Nav — center (desktop only) */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative h-20 flex items-center text-[15px] font-semibold tracking-wide transition-colors duration-200",
                  isActive(link.href)
                    ? "text-amber-400"
                    : "text-white/80 hover:text-amber-300"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-6 left-0 right-0 h-[2px] bg-amber-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right — auth section (desktop) / hamburger (mobile) */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden lg:flex">
              <AuthSection />
            </div>
            <button
              className="lg:hidden p-2 rounded-md text-white/80 hover:text-amber-300 hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0B1220]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all",
                  isActive(link.href)
                    ? "bg-amber-400/10 text-amber-400 font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 mt-2 border-t border-white/10">
              <AuthSection isMobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}