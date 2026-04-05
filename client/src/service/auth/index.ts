"use server";

import { FieldValues } from "react-hook-form";

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
  const res = await fetch(`${BASE_URL}/auth/me`, {
    credentials: "include",
    cache: "no-store",
  });
  return await res.json();
};

// Google login — redirect only, no server action needed
// export const googleLoginUrl = () => {
//   return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google`;
// };