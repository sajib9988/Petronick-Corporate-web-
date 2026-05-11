"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  EyeOff,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";
import { Company } from "@/lib/type";



type Props = {
  onDelete: (id: string, name: string) => void;
  onEdit?: (company: Company) => void;
};

export const companiesColumns = ({
  onDelete,
  onEdit,
}: Props): ColumnDef<Company>[] => [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <div className="w-10 h-10 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
        <Image
          src={row.original.logo}
          alt={row.original.name}
          width={40}
          height={40}
          className="object-contain p-1"
        />
      </div>
    ),
  },

  {
    accessorKey: "name",
    header: "Company",
    cell: ({ row }) => {
      const company = row.original;

      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-900">
              {company.name}
            </span>

            {company.isVisible ? (
              <Eye size={13} className="text-emerald-500" />
            ) : (
              <EyeOff size={13} className="text-gray-300" />
            )}
          </div>

          <span
            className={`w-fit text-[10px] px-2 py-0.5 rounded-full font-medium ${
              company.isVisible
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {company.isVisible ? "Visible" : "Hidden"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p
        title={row.original.description}
        className="max-w-[250px] truncate text-xs text-gray-500"
      >
        {row.original.description}
      </p>
    ),
  },

  {
    accessorKey: "revenueStage",
    header: "Stage",
    cell: ({ row }) =>
      row.original.revenueStage ? (
        <span className="text-[10px] bg-amber-50 text-amber-700 font-medium px-2 py-1 rounded-full">
          {row.original.revenueStage}
        </span>
      ) : (
        <span className="text-xs text-gray-300">—</span>
      ),
  },

  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">
        {row.original.order}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created",
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
      const company = row.original;

      return (
        <div className="flex items-center gap-1">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              <ExternalLink size={14} />
            </a>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(company)}
              className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              <Pencil size={14} />
            </button>
          )}

          <button
            onClick={() => onDelete(company.id, company.name)}
            className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={14} />
          </button>
        </div>
      );
    },
  },
];