"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import { companiesColumns } from "./columns";

export default function CompaniesPage() {
  const [data, setData] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string;
    name: string;
  }>({ open: false, id: "", name: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/company?limit=100`,
        { credentials: "include", cache: "no-store" },
      );
      const result = await res.json();
      setData(result.data ?? []);
    } catch {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({ open: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/company/${deleteDialog.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setDeleteDialog({ open: false, id: "", name: "" });
      fetchCompanies();
    } catch {
      console.error("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = companiesColumns(handleDeleteClick);

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Companies</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage your subsidiary business units
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/companies/new">
            <Plus size={14} className="mr-1" />
            Add Company
          </Link>
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Search companies..."
        isLoading={isLoading}
        emptyMessage="No companies found. Add your first company."
        toolbar={
          <Button variant="outline" size="sm">
            <Download size={13} className="mr-1.5" />
            Export
          </Button>
        }
      />

      {/* Delete Confirm Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !isDeleting && setDeleteDialog((d) => ({ ...d, open }))
        }
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteDialog.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog((d) => ({ ...d, open: false }))}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 size={13} className="mr-1.5 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}