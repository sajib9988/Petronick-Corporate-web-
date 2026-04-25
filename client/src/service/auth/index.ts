import { FieldValues } from "react-hook-form";


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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
    credentials: "include",
  });

  const data = await safeJson(res);

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
};
export const loginUser = async (userData: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include", // ✅ ব্রাউজারে কুকি সেভ হবে
  });

  return {
    ok: res.ok,
    data: await safeJson(res),
  };
};

export const logoutUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return await safeJson(res);
};

export const getMe = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  const data = await safeJson(res);
    console.log("User data:", data);
  return data?.success === false ? null : data;

};