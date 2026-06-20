"use client";

import { useEffect, useState } from "react";
import {
  getSectionsByPage,
  deleteSection,
  updateSection,
  getAllPages,
} from "@/service/cms";
import SectionForm, {
  SectionFormValues,
} from "@/components/admin/section-form";
import { DataTable } from "@/table/data-table";

export default function SectionsPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [selected, setSelected] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // ─── Load pages ─────────────────────────────────────────
  useEffect(() => {
    const loadPages = async () => {
      const res = await getAllPages();
      const list = res.data || [];
      setPages(list);
      if (list.length > 0) setSelectedPageId(list[0].id);
    };
    loadPages();
  }, []);

  // ─── Load sections when page changes ────────────────────
  useEffect(() => {
    if (!selectedPageId) return;
    const load = async () => {
      const res = await getSectionsByPage(selectedPageId);
      setSections(res.data || []);
    };
    load();
  }, [selectedPageId]);

  // ─── Delete ─────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this section?")) return;
    await deleteSection(id);
    const res = await getSectionsByPage(selectedPageId);
    setSections(res.data || []);
  };

  // ─── Update ─────────────────────────────────────────────
  const handleUpdate = async (
    values: SectionFormValues,
    imageFile: File | null
  ) => {
    if (!selected) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (imageFile) formData.append("file", imageFile);
      await updateSection(selected.id, formData);
      setSelected(null);
      const res = await getSectionsByPage(selectedPageId);
      setSections(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ─── Columns ─────────────────────────────────────────────
  const columns = [
    {
      accessorKey: "sectionType",
      header: "Type",
    },
    {
      accessorKey: "sortOrder",
      header: "Order",
    },
    {
      accessorKey: "isVisible",
      header: "Visible",
      cell: ({ row }: any) => (row.original.isVisible ? "Yes" : "No"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const s = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setSelected(s)}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(s.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Sections</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage page sections by selecting a page below.
        </p>
      </div>

      {/* Page selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Page</label>
        <select
          value={selectedPageId}
          onChange={(e) => setSelectedPageId(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {pages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.slug}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={sections} />

      {/* Edit modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Edit Section
            </h3>
            <SectionForm
              defaultValues={{
                type: selected.sectionType,
                content: selected.content,
                order: selected.sortOrder,
                isVisible: selected.isVisible,
              }}
              existingImage={selected.image}
              onSubmit={handleUpdate}
              onCancel={() => setSelected(null)}
              isLoading={loading}
              submitLabel="Update"
            />
          </div>
        </div>
      )}
    </div>
  );
}