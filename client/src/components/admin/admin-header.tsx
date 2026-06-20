"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/admin": {
    title: "Dashboard",
    description: "Overview of your business",
  },
  "/admin/companies": {
    title: "Companies",
    description: "Manage your business units",
  },
  "/admin/pages": {
    title: "Pages",
    description: "Manage website pages",
  },
  "/admin/sections": {
    title: "Sections",
    description: "Manage page sections",
  },
  "/admin/agents": {
    title: "Promotion Agents",
    description: "Review agent applications",
  },
  "/admin/contacts": {
    title: "Contacts",
    description: "View contact messages",
  },
  "/admin/settings": {
    title: "Settings",
    description: "Manage your account",
  },
};

export default function AdminHeader() {
  const pathname = usePathname();

  const current = Object.entries(pageTitles).find(([key]) =>
    pathname === key || pathname.startsWith(key + "/"),
  );

  const title = current?.[1]?.title ?? "Dashboard";
  const description = current?.[1]?.description ?? "";

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 sm:px-6 shadow-sm">
      <SidebarTrigger className="-ml-1 text-gray-500 hover:text-gray-900" />
      <Separator orientation="vertical" className="h-5" />

      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
          {description && (
            <p className="text-xs text-gray-400 hidden sm:block">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Site */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900"
            asChild
          >
            <Link href="/" target="_blank">
              <ExternalLink size={13} />
              View Site
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-4 hidden sm:block" />

          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative"
          >
            <Bell size={15} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}