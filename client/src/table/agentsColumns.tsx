"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, Loader2 } from "lucide-react";

export type BusinessUnit = { id: string; name: string };

export type Agent = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  focus: string;
  focusType?: "B2B" | "B2C" | "BOTH" | null;
  message: string;
  status: "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED";
  businessUnits: BusinessUnit[];
  createdAt: string;
};

const STATUS_OPTIONS = ["PENDING", "REVIEWED", "APPROVED", "REJECTED"] as const;

const statusColor: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  REVIEWED: "bg-blue-50 text-blue-700 border-blue-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};

type Props = {
  onView: (agent: Agent) => void;
  onDelete: (id: string, name: string) => void;
  onStatusChange: (id: string, status: Agent["status"]) => void;
  updatingId?: string | null;
};

export const agentsColumns = ({
  onView,
  onDelete,
  onStatusChange,
  updatingId,
}: Props): ColumnDef<Agent>[] => [
  {
    accessorKey: "fullName",
    header: "Applicant",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm text-gray-900">{row.original.fullName}</span>
        <span className="text-xs text-gray-400">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-gray-700">{row.original.phone}</span>
        <span className="text-xs text-gray-400">{row.original.location}</span>
      </div>
    ),
  },
  {
    accessorKey: "focus",
    header: "Focus",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">{row.original.focus}</span>
        {row.original.focusType && (
          <span className="w-fit text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {row.original.focusType}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "businessUnits",
    header: "Business Units",
    cell: ({ row }) => {
      const units = row.original.businessUnits ?? [];
      const visible = units.slice(0, 2);
      const rest = units.length - visible.length;
      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {visible.map((u) => (
            <span
              key={u.id}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700"
            >
              {u.name}
            </span>
          ))}
          {rest > 0 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              +{rest} more
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const agent = row.original;
      const isUpdating = updatingId === agent.id;
      return (
        <div className="relative inline-block">
          <select
            aria-label="Update agent status"
            value={agent.status}
            disabled={isUpdating}
            onChange={(e) => onStatusChange(agent.id, e.target.value as Agent["status"])}
            className={`text-[11px] font-semibold px-2 py-1 rounded-full border cursor-pointer focus:outline-none disabled:opacity-50 ${
              statusColor[agent.status] ?? "bg-gray-50 text-gray-600 border-gray-200"
            }`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {isUpdating && (
            <Loader2
              size={11}
              className="animate-spin absolute -right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Applied",
    cell: ({ row }) => (
      <span className="text-xs text-gray-400">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const agent = row.original;
      return (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(agent)}
            className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
            title="View details"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onDelete(agent.id, agent.fullName)}
            className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      );
    },
  },
];