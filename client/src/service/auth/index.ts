"use server";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 

const getAuthHeaders = async (headers: Record<string, string> = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return {
    ...headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    return await fetch(url, options);
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};






export const registerUser = async (userData: FieldValues) => {
  const { confirmPassword, ...rest } = userData;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    
  });

  const data = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
};



export const loginUser = async (userData: FieldValues) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-store",
  });

  const data = await res.json();

  // console.log("LOGIN RESPONSE:", data);

  // backend যদি token return করে
  if (data?.data?.accessToken) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refreshToken", data.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return {
    ok: res.ok,
    data,
  };
};


export const logoutUser = async () => {
  const cookieStore = await cookies();

  // ✅ remove token from Next.js cookie
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  const res = await safeFetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  if (!res) return null;

  return await res.json();
};







export const getMe = async () => {
  const res = await safeFetch(`${BASE_URL}/auth/me`, {
    headers: await getAuthHeaders(),
    cache: "no-store",        // ← এটা যোগ করো
    
  });

  if (!res || !res.ok) return null;
  const data = await res.json();
  // console.log("User data:", data);
  return data?.success === false ? null : data;
};



const safeJson = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return { success: false, message: "Invalid JSON response from server" };
  }
};

export const forgetPassword = async (email: string, turnstileToken: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/forget-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, turnstileToken }),
      cache: "no-store",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error requesting OTP:", err);
    return { success: false, message: "Failed to send reset code" };
  }
};

export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error resetting password:", err);
    return { success: false, message: "Failed to reset password" };
  }
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: await getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
      cache: "no-store",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error changing password:", err);
    return { success: false, message: "Failed to change password" };
  }
}


export const verifyEmail = async (data: { email: string; otp: string }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error verifying email:", err);
    return { success: false, message: "Failed to verify email" };
  }
};


export const resendVerification = async (email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });
    return await safeJson(res);
  } catch (err) {
    console.error("Error resending verification:", err);
    return { success: false, message: "Failed to resend code" };
  }
};

