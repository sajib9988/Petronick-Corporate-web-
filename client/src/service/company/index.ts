
"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

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
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    if (params?.isVisible !== undefined) query.set("isVisible", String(params.isVisible));

    const res = await fetch(`${BASE_URL}/company?${query}`, {
      credentials: "include",
    });

    return await safeJson(res);
  } catch (err) {
    console.error("Error fetching companies:", err);
    return { success: false, data: [], meta: { total: 0 }, message: "Failed to fetch companies" };
  }
};

export const getCompanyById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/company/${id}`);

    return await safeJson(res);
  } catch (err) {
    console.error("Error fetching company:", err);
    return { success: false, message: "Failed to fetch company" };
  }
};

export const createCompany = async (formData: FormData) => {
  try {
    const res = await fetch(`${BASE_URL}/company`, {
      method: "POST",
      credentials: "include",
      body: formData, // multipart/form-data
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error creating company:", err);
    return { success: false, message: "Failed to create company" };
  }
};

export const updateCompany = async (id: string, formData: FormData) => {
  try {
    const res = await fetch(`${BASE_URL}/company/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error updating company:", err);
    return { success: false, message: "Failed to update company" };
  }
};

export const deleteCompany = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/company/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error deleting company:", err);
    return { success: false, message: "Failed to delete company" };
  }
};
