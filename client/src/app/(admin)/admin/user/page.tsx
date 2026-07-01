"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, ShieldCheck, Shield, User as UserIcon } from "lucide-react";
import { getAllUsers, updateUserRole } from "@/service/user";
import { toast } from "react-hot-toast";

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  status: string;
  createdAt: string;
};




const roleBadge: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-50 text-purple-700",
  ADMIN: "bg-blue-50 text-blue-700",
  USER: "bg-gray-100 text-gray-600",
};

export default function UserPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllUsers({ limit: 100 });
      setUsers(result?.data ?? []);
    } catch {
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id: string, role: "ADMIN" | "USER") => {
    setUpdatingId(id);
    try {
      const res = await updateUserRole(id, role);
      if (res?.success) {
        toast.success("Role updated successfully");
        fetchUsers();
      } else {
        toast.error(res?.message || "Failed to update role");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-gray-900">User Management</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Promote users to Admin or demote them back to User
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-white rounded-xl border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleBadge[user.role]}`}>
                  {user.role}
                </span>

                {user.role !== "SUPER_ADMIN" && (
                  <button
                    onClick={() =>
                      handleRoleChange(user.id, user.role === "ADMIN" ? "USER" : "ADMIN")
                    }
                    disabled={updatingId === user.id}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {updatingId === user.id && <Loader2 size={12} className="animate-spin" />}
                    {user.role === "ADMIN" ? (
                      <>
                        <UserIcon size={12} /> Make User
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={12} /> Make Admin
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

