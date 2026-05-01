"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { logoutUser, getMe } from "@/service/auth";

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center ring-2 ring-orange-400/40 shadow-md shadow-orange-200/50 flex-shrink-0">
      <span className="text-white text-xs font-bold tracking-wide">{initials}</span>
    </div>
  );
}

export const AuthSection = ({ isMobile = false }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        console.log("Full res:", res);
        const userData = res?.data || null;
        console.log("Fetched user:", userData) // ✅ এখানে দাও
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await logoutUser();
      if (res?.success) {
        toast.success("Logged out successfully");
        window.location.reload();
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const isAdmin = user?.role === "ADMIN";

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-100 animate-pulse" />
        {!isMobile && <div className="h-4 w-20 bg-gray-100 animate-pulse rounded-md" />}
      </div>
    );
  }

  if (user) {
    return (
      <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-3"}`}>

        {/* Avatar + Name */}
        {isMobile ? (
          <div className="flex items-center gap-3 px-1 py-2 border-b border-gray-100 mb-1">
            <UserAvatar name={user.name} />
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold">{user.name}</span>
              <span className="text-gray-400 text-xs">{user.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserAvatar name={user.name} />
            <span className="text-shadow-amber-500ld text-sm">{user.name}</span>
          </div>
        )}

        {/* Admin Dashboard Button */}
        {isAdmin && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className={
              isMobile
                ? "w-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 bg-white"
                : "h-8 border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 bg-white text-xs px-3"
            }
          >
            <Link href="/admin">
              <LayoutDashboard size={13} className="mr-1.5" />
              Dashboard
            </Link>
          </Button>
        )}

        {/* Logout */}
        <Button
          size="sm"
          variant="ghost"
          className={
            isMobile
              ? "w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              : "h-8 text-black font-bold hover:text-red-500 hover:bg-red-50 px-3 text-xs transition-colors"
          }
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut size={13} className="mr-1.5" />
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  }

  // Not logged in
  return (
    <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-2"}`}>
      <Button
        asChild
        size="sm"
        variant="outline"
        className={
          isMobile
            ? "w-full border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
            : "h-8 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 bg-white text-xs px-4"
        }
      >
        <Link href="/login">Log in</Link>
      </Button>

      <Button
        asChild
        size="sm"
        className={
          isMobile
            ? "w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-none"
            : "h-8 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-none text-xs px-4 shadow-md shadow-orange-200"
        }
      >
        <Link href="/promotion-agent">Apply Now</Link>
      </Button>
    </div>
  );
};