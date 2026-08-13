import { z } from "zod";

const forgetPassword = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPassword = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const verifyEmail = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});


export const authValidation = { forgetPassword, resetPassword, verifyEmail };