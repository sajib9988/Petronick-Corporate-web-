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

export const createAgent = async (data: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  focus: string;
  message: string;
  businessUnits: string[];
}) => {
  const res = await fetch(`${BASE_URL}/agents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await safeJson(res);
};

export const getAllAgents = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);

  const res = await fetch(`${BASE_URL}/agents?${query}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  return await safeJson(res);
};

export const updateAgentStatus = async (
  id: string,
  status: "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED",
) => {
  const res = await fetch(`${BASE_URL}/agents/${id}/status`, {
    method: "PATCH",
    headers: await getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ status }),
  });
  return await safeJson(res);
};

export const deleteAgent = async (id: string) => {
  const res = await fetch(`${BASE_URL}/agents/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  return await safeJson(res);
};