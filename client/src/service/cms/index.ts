"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = async (headers: Record<string, string> = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return {
    ...headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return { success: false, message: "Invalid JSON response from server" };
  }
};

// Helper to catch fetch errors
const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    return await fetch(url, options);
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

// ─── PAGE ────────────────────────────────────────────────

export const getAllPages = async () => {
  const res = await safeFetch(`${BASE_URL}/cms/pages`);
  if (!res) return { success: false, data: [], message: "Failed to fetch pages" };
  return await safeJson(res);
};

export const getPageBySlug = async (slug: string) => {
  const res = await safeFetch(`${BASE_URL}/cms/pages/${slug}`);
  if (!res) return { success: false, message: "Failed to fetch page" };
  return await safeJson(res);
};

export const createPage = async (data: { slug: string; title: string }) => {
  const res = await safeFetch(`${BASE_URL}/cms/pages`, {
    method: "POST",
    headers: await getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  if (!res) return { success: false, message: "Failed to create page" };
  return await safeJson(res);
};

export const updatePage = async (slug: string, data: { title: string }) => {
  const res = await safeFetch(`${BASE_URL}/cms/pages/${slug}`, {
    method: "PATCH",
    headers: await getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  if (!res) return { success: false, message: "Failed to update page" };
  return await safeJson(res);
};

export const deletePage = async (slug: string) => {
  const res = await safeFetch(`${BASE_URL}/cms/pages/${slug}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  if (!res) return { success: false, message: "Failed to delete page" };
  return await safeJson(res);
};

// ─── SECTION ─────────────────────────────────────────────

export const getSectionsByPage = async (pageId: string) => {
  const res = await safeFetch(`${BASE_URL}/cms/sections/page/${pageId}`);
  if (!res) return { success: false, data: [], message: "Failed to fetch sections" };
  return await safeJson(res);
};

export const createSection = async (formData: FormData) => {
  const res = await safeFetch(`${BASE_URL}/cms/sections`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: formData,
  });
  if (!res) return { success: false, message: "Failed to create section" };
  return await safeJson(res);
};

export const updateSection = async (id: string, formData: FormData) => {
  const res = await safeFetch(`${BASE_URL}/cms/sections/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: formData,
  });
  if (!res) return { success: false, message: "Failed to update section" };
  return await safeJson(res);
};

export const deleteSection = async (id: string) => {
  const res = await safeFetch(`${BASE_URL}/cms/sections/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  if (!res) return { success: false, message: "Failed to delete section" };
  return await safeJson(res);
};

export const getSectionById = async (id: string) => {
  const res = await safeFetch(`${BASE_URL}/cms/sections/${id}`);
  if (!res) return { success: false, message: "Failed to fetch section" };
  return await safeJson(res);
};

export const getAllSections = async () => {
  const res = await safeFetch(`${BASE_URL}/cms/sections`);
  if (!res) return { success: false, data: [], message: "Failed to fetch sections" };
  return await safeJson(res);
};