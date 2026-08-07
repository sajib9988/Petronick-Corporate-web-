"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Helper to get auth header
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
  focusType: "B2B" | "B2C" | "BOTH";
  message: string;
  businessUnits: string[];
}) => {
  try {
    const res = await fetch(`${BASE_URL}/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error creating agent:", err);
    return { success: false, message: "Failed to create agent" };
  }
};

export const getAllAgents = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  try {
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
  } catch (err) {
    console.error("Error fetching agents:", err);
    return { success: false, data: [], meta: { total: 0 }, message: "Failed to fetch agents" };
  }
};

export const updateAgentStatus = async (
  id: string,
  status: "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED",
) => {
  try {
    const res = await fetch(`${BASE_URL}/agents/${id}/status`, {
      method: "PATCH",
      headers: await getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ status }),
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error updating agent status:", err);
    return { success: false, message: "Failed to update agent status" };
  }
};

export const deleteAgent = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/agents/${id}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error deleting agent:", err);
    return { success: false, message: "Failed to delete agent" };
  }
};

export const exportAgentsCSV = async () => {
  try {
    const res = await fetch(`${BASE_URL}/agents/export/csv`, {
      headers: await getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return { success: false, message: "Failed to export agents" };
    const csv = await res.text();
    return { success: true, csv };
  } catch (err) {
    console.error("Error exporting agents:", err);
    return { success: false, message: "Failed to export agents" };
  }
};