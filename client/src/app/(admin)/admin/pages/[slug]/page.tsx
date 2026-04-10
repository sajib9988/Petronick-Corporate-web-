"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SectionForm, { SectionFormValues } from "@/components/admin/section-form";
import { getPageBySlug, createSection } from "@/service/cms";

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Load page details by slug
  useEffect(() => {
    const loadPage = async () => {
      try {
        const res = await getPageBySlug(slug);
        if (res?.data) setPage(res.data);
      } catch (err) {
        console.error("Error loading page:", err);
      }
    };
    loadPage();
  }, [slug]);

  // 🔹 Create new section
  const handleCreateSection = async (values: SectionFormValues, imageFile: File | null) => {
    if (!page?.id) {
      alert("Page not loaded yet!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          ...values,
          pageId: page.id, // MUST
        })
      );

      if (imageFile) formData.append("image", imageFile);

      const res = await createSection(formData);
      console.log("Section created:", res);

      alert("Section created successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error creating section ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!page) return <p>Loading page...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Page: {page.title}</h2>

      <SectionForm
        onSubmit={handleCreateSection}
        onCancel={() => {}}
        isLoading={loading}
      />
    </div>
  );
}