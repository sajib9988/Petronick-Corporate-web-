"use server"

import { cookies } from "next/headers";
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


export const getAllUsers = async (Params: { search?: string; page?: number; limit?: number }) => {
  try{
    const query = new URLSearchParams();
    if (Params.search) query.append("search", Params.search);
    if (Params.page) query.append("page", Params.page.toString());
    if (Params.limit) query.append("limit", Params.limit.toString());

   const res = await fetch(`${BASE_URL}/users?${query}`,{
       headers: await getAuthHeaders(),
       cache: "no-store",
   });
    return await safeJson(res);

    }  catch (error) 
            {
            console.error("Error fetching users:", error);
      return { success: false, 
               data:[],
               meta: { total: 0, page: 1, limit: 10 },
        
                message: "Network error while fetching users" };
    }







  }


export const updateUserRole = async (Id: string, newRole: string) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${Id}/role`, {
      method: "PATCH",
      headers: await getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ role: newRole }),
    });
    return await safeJson(res);
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Network error while updating user role" };
  }
};