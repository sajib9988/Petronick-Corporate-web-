import status from "http-status";
import bcrypt from "bcrypt";


import { prisma } from "../../database/prisma.js";
import { AppError } from "../../shared/errors/app-error.js";
import { IChangePasswordPayload, ILoginUserPayload, IRegisterUserPayload, IRequestUser } from "./auth.type.js";
import { jwtUtils } from "../../shared/utils/jwt.js";
import { envVars } from "../../config/env.js";
import { tokenUtils } from "../../shared/utils/token.js";

const registerUser = async (payload: IRegisterUserPayload) => {
  const { name, email, password } = payload;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(status.CONFLICT, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return user;
};

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

 const user = await prisma.user.findUnique({
  where: { email },
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    password: true, // ✅ important
    status: true,
    isDeleted: true,
  },
});

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (user.status === "BLOCKED") {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // ✅ password check
  const isPasswordValid = await bcrypt.compare(password, user.password as string);
  if (!isPasswordValid) {
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
  }

  // controller token বানাবে, service শুধু user return করবে
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const getMe = async (user: IRequestUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return isUserExists;
};

const changePassword = async (user: IRequestUser, payload: IChangePasswordPayload) => {
  const { currentPassword, newPassword } = payload;

 const isUserExists = await prisma.user.findUnique({
  where: { id: user.id },
  select: {
    id: true,
    password: true, // ✅ MUST ADD
  },
});

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // ✅ current password check
  const isPasswordValid = await bcrypt.compare(currentPassword, isUserExists.password as string);
  if (!isPasswordValid) {
    throw new AppError(status.UNAUTHORIZED, "Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return null;
};

const refreshToken = async (token: string) => {
  // ✅ refresh token verify করো
  const result = jwtUtils.verifyToken(token, envVars.REFRESH_TOKEN_SECRET);

  if (!result.success || !result.data) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const user = await prisma.user.findUnique({ where: { id: result.data.id } });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // ✅ নতুন access token তৈরি করো
  const accessToken = tokenUtils.getAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
};

const verifyEmail = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // OTP verify logic তোমার নিজের implementation অনুযায়ী
  await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });
};

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // OTP generate করে email পাঠাও — তোমার mail service অনুযায়ী
};

const resetPassword = async (email: string, otp: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // OTP verify করো তারপর password update করো
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
};

export const authService = {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  refreshToken,
  verifyEmail,
  forgetPassword,
  resetPassword,
};