"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getAuthHeaders = async (headers: Record<string, string> = {}) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;
  return {
    ...headers,
    Cookie: `better-auth.session_token=${sessionToken}`,
  };
};

const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return { success: false, message: "Invalid JSON response from server" };
  }
};

// ─── PAGE ────────────────────────────────────────────────

export const getAllPages = async () => {
  const res = await fetch(`${BASE_URL}/cms/pages`, { cache: "no-store" });
  return await safeJson(res);
};

export const getPageBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/cms/pages/${slug}`, {
    next: { revalidate: 60 },
  });
  return await safeJson(res);
};

export const createPage = async (data: { slug: string; title: string }) => {
  const res = await fetch(`${BASE_URL}/cms/pages`, {
    method: "POST",
    headers: await getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  // ✅ FIX: safeJson দিয়ে parse করো, আর caller-এ আবার .json() ডাকো না
  return await safeJson(res);
};

export const updatePage = async (slug: string, data: { title: string }) => {
  const res = await fetch(`${BASE_URL}/cms/pages/${slug}`, {
    method: "PATCH",
    headers: await getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  return await safeJson(res);
};

export const deletePage = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/cms/pages/${slug}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  // ✅ FIX: raw Response return করা বন্ধ, parsed result return করো
  return await safeJson(res);
};

// ─── SECTION ─────────────────────────────────────────────

export const getSectionsByPage = async (pageId: string) => {
  const res = await fetch(`${BASE_URL}/cms/sections/page/${pageId}`, {
    cache: "no-store",
  });
  return await safeJson(res);
};

export const createSection = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/cms/sections`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: formData,
  });
  return await safeJson(res);
};

export const updateSection = async (id: string, formData: FormData) => {
  const res = await fetch(`${BASE_URL}/cms/sections/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: formData,
  });
  return await safeJson(res);
};

export const deleteSection = async (id: string) => {
  const res = await fetch(`${BASE_URL}/cms/sections/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  return await safeJson(res);
};

export const getSectionById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/cms/sections/${id}`, {
    cache: "no-store",
  });
  return await safeJson(res);
};

export const getAllSections = async () => {
  const res = await fetch(`${BASE_URL}/cms/sections`, { cache: "no-store" });
  return await safeJson(res);
};