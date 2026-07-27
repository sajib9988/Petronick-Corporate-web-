"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { logoutUser, getMe } from "@/service/auth";

// ─── Menu Definition ─────────────────────────────
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
        href: "/admin/contact",
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
        href: "/admin/setting",
        icon: Settings,
        exact: false,
      },
      // ✅ "Users" item শুধু SUPER_ADMIN এর জন্য, নিচে render এর সময় filter করা হবে
      {
        label: "Users",
        href: "/admin/user",
        icon: Users,
        exact: false,
        requiredRole: "SUPER_ADMIN",
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // ✅ Current user এর role load করা
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await getMe();
        setRole(res?.data?.role ?? null);
      } catch {
        setRole(null);
      }
    };
    fetchRole();
  }, []);

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-800 bg-slate-900">
      {/* Logo */}
      <SidebarHeader className="border-b border-slate-800 px-4 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
            <span className="text-stone-900 text-xs font-bold">P</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white leading-none truncate">Petronick</p>
            <p className="text-xs text-slate-400 mt-0.5 truncate">Admin Panel</p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-2 py-3 gap-0">
        {menuGroups.map((group) => {
          // ✅ role অনুযায়ী items filter করা
          const visibleItems = group.items.filter((item) => {
            if ("requiredRole" in item && item.requiredRole) {
              return role === item.requiredRole;
            }
            return true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <SidebarGroup key={group.group} className="mb-2">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-1">
                {group.group}
              </SidebarGroupLabel>
              <SidebarMenu>
                {visibleItems.map((item) => {
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
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 font-semibold shadow-md shadow-amber-500/20"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white",
                          )}
                        >
                          <item.icon
                            size={16}
                            className={cn("flex-shrink-0", active ? "text-stone-900" : "text-slate-500")}
                          />
                          <span className="flex-1 truncate">{item.label}</span>
                          {"badge" in item && item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 bg-emerald-400/20 text-emerald-300"
                            >
                              {item.badge}
                            </Badge>
                          )}
                          {active && (
                            <ChevronRight size={14} className="text-stone-900/50 flex-shrink-0" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-slate-800 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 text-xs font-bold">A</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Admin</p>
                  <p className="text-[10px] text-slate-400 truncate">
                  {role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors flex-shrink-0"
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