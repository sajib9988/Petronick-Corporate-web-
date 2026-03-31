"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

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
  return await res.json();
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
    credentials: "include",
    cache: "no-store",
  });
  return await res.json();
};

export const deleteContact = async (id: string) => {
  const res = await fetch(`${BASE_URL}/contact/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};