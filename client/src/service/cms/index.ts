"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

// PAGE
export const getAllPages = async () => {
  const res = await fetch(`${BASE_URL}/cms/pages`, {
    cache: "no-store",
  });
  return await res.json();
};

export const getPageBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/cms/pages/${slug}`, {
    next: { revalidate: 60 }, // 1 minute cache
  });
  return await res.json();
};

export const createPage = async (data: { slug: string; title: string }) => {
  const res = await fetch(`${BASE_URL}/cms/pages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const updatePage = async (slug: string, data: { title: string }) => {
  const res = await fetch(`${BASE_URL}/cms/pages/${slug}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deletePage = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/cms/pages/${slug}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};

// SECTION
export const getSectionsByPage = async (pageId: string) => {
  const res = await fetch(`${BASE_URL}/cms/sections/page/${pageId}`, {
    cache: "no-store",
  });
  return await res.json();
};

export const createSection = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/cms/sections`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return await res.json();
};

export const updateSection = async (id: string, formData: FormData) => {
  const res = await fetch(`${BASE_URL}/cms/sections/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });
  return await res.json();
};

export const deleteSection = async (id: string) => {
  const res = await fetch(`${BASE_URL}/cms/sections/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};

export const getSectionById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/cms/sections/${id}`, {
    cache: "no-store",
  });
  return await res.json();
};

export const getAllSections = async () => {
  const res = await fetch(`${BASE_URL}/cms/sections`, {
    cache: "no-store",
  });
  return await res.json();
};