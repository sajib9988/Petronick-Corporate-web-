"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 



const getAuthHeaders = async(extra: Record<string, string>= {})=>{
  const cookieStore= await cookies()
  const token = cookieStore.get("accessToken")?.value;
  return {
    ...extra,
    ...(token && { Authorization: `Bearer ${token}` }),
  }

}

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
  // pass `revalidate: false` for admin/dashboard views that need fresh data
  // (skips the Data Cache entirely). Public pages should omit this and keep
  // the default 60s ISR caching.
  revalidate?: number | false;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    if (params?.isVisible !== undefined) query.set("isVisible", String(params.isVisible));

    const fetchOptions: RequestInit =
      params?.revalidate === false
        ? { cache: "no-store" }
        : { next: { revalidate: params?.revalidate ?? 60 } };

    const res = await fetch(`${BASE_URL}/company?${query}`, fetchOptions);

    return await safeJson(res);
  } catch (err) {
    console.error("Error fetching companies:", err);
    return { success: false, data: [], meta: { total: 0 }, message: "Failed to fetch companies" };
  }
};

export const getCompanyById = async (
  id: string,
  options?: { revalidate?: number | false },
) => {
  try {
    const fetchOptions: RequestInit =
      options?.revalidate === false
        ? { cache: "no-store" }
        : { next: { revalidate: options?.revalidate ?? 60 } };

    const res = await fetch(`${BASE_URL}/company/${id}`, fetchOptions);

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
      headers: await getAuthHeaders(),
      body: formData, 
    });
    const result = await safeJson(res);

    if (result?.success) {
      // Bust the ISR cache so public pages show the new company immediately
      // instead of waiting up to 60s.
      revalidatePath("/companies");
      revalidatePath("/");
    }

    return result;
  } catch (err) {
    console.error("Error creating company:", err);
    return { success: false, message: "Failed to create company" };
  }
};


export const updateCompany = async (id: string, formData: FormData) => {
  try {
    const res = await fetch(`${BASE_URL}/company/${id}`, {
      method: "PATCH",
      headers: await getAuthHeaders(),
      body: formData,
    });
    const result = await safeJson(res);

    if (result?.success) {
      // Bust cache for the list, the home page grid, and this company's own
      // detail page so a logo/description change shows up right away.
      revalidatePath("/companies");
      revalidatePath(`/companies/${id}`);
      revalidatePath("/");
    }

    return result;
  } catch (err) {
    console.error("Error updating company:", err);
    return { success: false, message: "Failed to update company" };
  }
};

export const deleteCompany = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/company/${id}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
      
    });
    const result = await safeJson(res);

    if (result?.success) {
      revalidatePath("/companies");
      revalidatePath(`/companies/${id}`);
      revalidatePath("/");
    }

    return result;
  } catch (err) {
    console.error("Error deleting company:", err);
    return { success: false, message: "Failed to delete company" };
  }
};