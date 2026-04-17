"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const registerUser = async (userData: FieldValues) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return await res.json();
};

export const loginUser = async (userData: FieldValues) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return await res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return await res.json();
};



export const getMe = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};
