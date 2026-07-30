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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
<header className="w-full relative sticky top-0 z-50 border-b-2 border-amber-700/30">
  <div 
    className="absolute inset-0"
    style={{
      background: `
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0,0,0,0.15) 0%, transparent 50%),
        linear-gradient(135deg, #1a1d23 0%, #2a2e35 50%, #1a1d23 100%)
      `,
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(255,255,255,0.03)",
    }}
  />
  
  <div className="relative max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6">
    <div className="flex items-center justify-between h-20">

      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo1.PNG"
          alt=""
          width={220}
          height={80}
          priority
          className="h-14 w-auto object-contain"
        />
      </Link>

      {/* Desktop Nav — gap বাড়ানো */}
      <nav className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative h-20 flex items-center text-[17px] font-semibold tracking-wide transition-all duration-300 group",
              isActive(link.href)
                ? "text-amber-400"
                : "text-stone-300 hover:text-amber-300"
            )}
            style={{
              textShadow: isActive(link.href)
                ? "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,193,7,0.2)"
                : "0 1px 1px rgba(0,0,0,0.7), 0 -1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {link.label}

            <span className="absolute bottom-6 left-0 h-[2px] bg-amber-400 transition-all duration-300 w-0 group-hover:w-full" />

            {isActive(link.href) && (
              <span 
                className="absolute bottom-6 left-0 right-0 h-[2px] bg-amber-500"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-2">
        <AuthSection />
      </div>

      <button
        className="lg:hidden p-2 rounded-md text-stone-300 hover:text-amber-300 hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  </div>

  {/* Mobile Nav */}
  {isOpen && (
    <div className="relative lg:hidden border-t border-amber-700/20 bg-[#1a1d23]/98 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6 py-3 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all",
              isActive(link.href)
                ? "bg-amber-400/10 text-amber-400 font-medium"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            )}
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-2 pb-1 space-y-2 border-t border-white/10 mt-2">
          <AuthSection isMobile />
        </div>
      </div>
    </div>
  )}
</header>
  );
}