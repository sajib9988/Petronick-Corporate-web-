"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

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
  return await res.json();
};

export const getCompanyById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/company/${id}`, {
    cache: "no-store",
  });
  return await res.json();
};

export const createCompany = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/company`, {
    method: "POST",
    credentials: "include",
    body: formData, // multipart/form-data
  });
  return await res.json();
};

export const updateCompany = async (id: string, formData: FormData) => {
  const res = await fetch(`${BASE_URL}/company/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });
  return await res.json();
};

export const deleteCompany = async (id: string) => {
  const res = await fetch(`${BASE_URL}/company/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};