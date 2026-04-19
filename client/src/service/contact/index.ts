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

export const createContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await safeJson(res);
};

export const getAllContacts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);

  const res = await fetch(`${BASE_URL}/contact?${query}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  return await safeJson(res);
};

export const deleteContact = async (id: string) => {
  const res = await fetch(`${BASE_URL}/contact/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  return await safeJson(res);
};