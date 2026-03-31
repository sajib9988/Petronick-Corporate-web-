import {
  Building2,
  Users,
  Mail,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

import StatsCard from "@/components/admin/stats-card";
import { getAllCompanies } from "@/service/company";
import { getAllAgents } from "@/service/agent";
import { getAllContacts } from "@/service/contact";

export default async function AdminDashboardPage() {
  const [companies, contacts, agents] = await Promise.all([
    getAllCompanies(),
    getAllContacts(),
    getAllAgents(),
  ]);

  const stats = [
    {
      label: "Total Companies",
      value: companies?.meta?.total ?? 0,
      icon: Building2,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      href: "/admin/companies",
      trend: "Business units",
      delay: 0,
    },
    {
      label: "Promotion Agents",
      value: agents?.meta?.total ?? 0,
      icon: Users,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      href: "/admin/agents",
      trend: "Applications",
      delay: 0.1,
    },
    {
      label: "Contact Messages",
      value: contacts?.meta?.total ?? 0,
      icon: Mail,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/admin/contacts",
      trend: "Total messages",
      delay: 0.2,
    },
    {
      label: "Active Units",
      value: 7,
      icon: TrendingUp,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      href: "/admin/companies",
      trend: "Revenue ready",
      delay: 0.3,
    },
  ];

  const agentStatusColor: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700",
    REVIEWED: "bg-blue-50 text-blue-700",
    APPROVED: "bg-emerald-50 text-emerald-700",
    REJECTED: "bg-red-50 text-red-700",
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Good morning, Admin 👋
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Here&apos;s what&apos;s happening with Petronick today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
          <Clock size={12} />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Agents */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900 text-sm">
              Recent Agent Applications
            </h3>
            <Link
              href="/admin/agents"
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {agents?.data?.length > 0 ? (
              agents.data
                .slice(0, 5)
                .map(
                  (agent: {
                    id: string;
                    fullName: string;
                    email: string;
                    status: string;
                    focus: string;
                  }) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0 flex-1 mr-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {agent.fullName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {agent.focus} · {agent.email}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${agentStatusColor[agent.status] ?? "bg-gray-50 text-gray-600"}`}
                      >
                        {agent.status}
                      </span>
                    </div>
                  ),
                )
            ) : (
              <div className="px-5 py-8 text-center">
                <Users size={24} className="text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No applications yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900 text-sm">
              Recent Contact Messages
            </h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {contacts?.data?.length > 0 ? (
              contacts.data
                .slice(0, 5)
                .map(
                  (contact: {
                    id: string;
                    name: string;
                    email: string;
                    message: string;
                  }) => (
                    <div
                      key={contact.id}
                      className="px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-400">{contact.email}</p>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {contact.message}
                      </p>
                    </div>
                  ),
                )
            ) : (
              <div className="px-5 py-8 text-center">
                <Mail size={24} className="text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No messages yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}