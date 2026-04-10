"use client";

import { useEffect, useState } from "react";
import {
  getSectionsByPage,
  deleteSection,
  updateSection,
} from "@/service/cms";
import SectionForm, {
  SectionFormValues,
} from "@/components/admin/section-form";
import { DataTable } from "@/table/data-table";

export default function SectionsPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const PAGE_ID = "PUT_YOUR_PAGE_ID"; // 🔥 replace

  // 🔹 load sections
  const loadSections = async () => {
    const res = await getSectionsByPage(PAGE_ID);
    setSections(res.data || []);
  };

  useEffect(() => {
    loadSections();
  }, []);

  // 🔹 delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this section?")) return;
    await deleteSection(id);
    loadSections();
  };

  // 🔹 update
  const handleUpdate = async (
    values: SectionFormValues,
    imageFile: File | null
  ) => {
    if (!selected) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("data", JSON.stringify(values));

      if (imageFile) {
        formData.append("file", imageFile);
      }

      await updateSection(selected.id, formData);

      setSelected(null);
      loadSections();
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 TanStack Columns
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
      cell: ({ row }: any) =>
        row.original.isVisible ? "Yes" : "No",
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
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(s.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Sections</h2>

      {/* 🔥 TanStack Table */}
      <DataTable columns={columns} data={sections} />

      {/* 🔹 EDIT MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h3 className="text-lg font-semibold mb-4">
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