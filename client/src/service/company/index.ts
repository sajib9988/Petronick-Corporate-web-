"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

// Helper to get auth header
const getAuthHeaders = async (headers: Record<string, string> = {}) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;
  return {
    ...headers,
    Cookie: `better-auth.session_token=${sessionToken}`,
  };
};

// Safe JSON helper
const safeJson = async (res: Response) => {
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: "Invalid JSON response from server" };
  }
};

export const getAllCompanies = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  isVisible?: boolean;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.isVisible !== undefined) query.set("isVisible", String(params.isVisible));

  const res = await fetch(`${BASE_URL}/company?${query}`, {
    cache: "no-store",
  });

  return await safeJson(res);
};

export const getCompanyById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/company/${id}`, {
    cache: "no-store",
  });

  return await safeJson(res);
};

export const createCompany = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/company`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: formData, // multipart/form-data
  });
  return await safeJson(res);
};

export const updateCompany = async (id: string, formData: FormData) => {
  const res = await fetch(`${BASE_URL}/company/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: formData,
  });
  return await safeJson(res);
};

export const deleteCompany = async (id: string) => {
  const res = await fetch(`${BASE_URL}/company/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  return await safeJson(res);
};