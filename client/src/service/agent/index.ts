"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

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
  return await res.json();
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
    credentials: "include",
    cache: "no-store",
  });
  return await res.json();
};

export const updateAgentStatus = async (
  id: string,
  status: "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED",
) => {
  const res = await fetch(`${BASE_URL}/agents/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  return await res.json();
};

export const deleteAgent = async (id: string) => {
  const res = await fetch(`${BASE_URL}/agents/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};