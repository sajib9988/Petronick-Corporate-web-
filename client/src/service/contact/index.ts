
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

export const createContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error creating contact:", err);
    return { success: false, message: "Failed to create contact" };
  }
};

export const getAllContacts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);

    const res = await fetch(`${BASE_URL}/contact?${query}`, {
      credentials: "include",
    });

    return await safeJson(res);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    return { success: false, data: [], meta: { total: 0 }, message: "Failed to fetch contacts" };
  }
};

export const deleteContact = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error deleting contact:", err);
    return { success: false, message: "Failed to delete contact" };
  }
};