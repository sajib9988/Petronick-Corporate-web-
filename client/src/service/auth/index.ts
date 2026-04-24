"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";



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

export const registerUser = async (userData: FieldValues) => {
  const { confirmPassword, ...rest } = userData;

  const res = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  });

  const data = await safeJson(res);

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
};

export const loginUser = async (userData: FieldValues) => {
  const res = await fetch(`${process.env.BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await safeJson(res);

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
};

export const logoutUser = async () => {
  const res = await fetch(`${process.env.BASE_URL}/auth/logout`, {
    method: "POST",
    headers: await getAuthHeaders(),
  });
  return await safeJson(res);
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  if (!sessionToken) return null;

  const res = await fetch(`${process.env.BASE_URL}/auth/me`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await safeJson(res);
  return data?.success === false ? null : data;
};