"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Layers,
  Users,
  Mail,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";


const menuGroups = [
  {
    group: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        label: "Companies",
        href: "/admin/companies",
        icon: Building2,
        exact: false,
      },
      {
        label: "Pages",
        href: "/admin/pages",
        icon: FileText,
        exact: false,
      },
      {
        label: "Sections",
        href: "/admin/sections",
        icon: Layers,
        exact: false,
      },
    ],
  },
  {
    group: "CRM",
    items: [
      {
        label: "Promotion Agents",
        href: "/admin/agents",
        icon: Users,
        exact: false,
        badge: "New",
      },
      {
        label: "Contacts",
        href: "/admin/contacts",
        icon: Mail,
        exact: false,
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        exact: false,
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
      {/* Logo */}
      <SidebarHeader className="border-b border-gray-100 px-4 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 leading-none truncate">
              Petronick
            </p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              Admin Panel
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-2 py-3 gap-0">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.group} className="mb-2">
            <SidebarGroupLabel className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-1">
              {group.group}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      isActive={active}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 w-full",
                          active
                            ? "bg-gray-900 text-white font-medium shadow-sm"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                        )}
                      >
                        <item.icon
                          size={16}
                          className={cn(
                            "flex-shrink-0",
                            active ? "text-white" : "text-gray-400",
                          )}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-4 bg-emerald-100 text-emerald-700"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {active && (
                          <ChevronRight
                            size={14}
                            className="text-white/60 flex-shrink-0"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-gray-100 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarFallback className="bg-gray-900 text-white text-xs font-bold">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  Admin
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  Super Admin
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}