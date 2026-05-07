import status from "http-status";
import bcrypt from "bcrypt";

import { prisma } from "../../database/prisma.js";
import { AppError } from "../../shared/errors/app-error.js";

import {
  IChangePasswordPayload,
  ILoginUserPayload,
  IRegisterUserPayload,
  IRequestUser,
} from "./auth.type.js";

import {
  createToken,
  verifyToken,
} from "../../shared/utils/auth.token.js";

// ================= REGISTER =================

const registerUser = async (payload: IRegisterUserPayload) => {
  const { name, email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(status.CONFLICT, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

// ================= LOGIN =================

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
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

  // password check
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// ================= GET ME =================

const getMe = async (user: IRequestUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return isUserExists;
};

// ================= CHANGE PASSWORD =================

const changePassword = async (
  user: IRequestUser,
  payload: IChangePasswordPayload
) => {
  const { currentPassword, newPassword } = payload;

  const isUserExists = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      password: true,
    },
  });

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    isUserExists.password as string
  );

  if (!isPasswordValid) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Current password is incorrect"
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  return null;
};

// ================= REFRESH TOKEN =================

const refreshToken = async (token: string) => {
  const verifiedToken = verifyToken(token);

  if (!verifiedToken.success || !verifiedToken.data) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Invalid refresh token"
    );
  }

  const decoded = verifiedToken.data as {
    id: string;
    email: string;
    role: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // create new access token
  const accessToken = createToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
  };
};

// ================= VERIFY EMAIL =================

const verifyEmail = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // TODO: verify OTP

  await prisma.user.update({
    where: { email },
    data: {
      emailVerified: true,
    },
  });
};

// ================= FORGET PASSWORD =================

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!user.emailVerified) {
    throw new AppError(
      status.BAD_REQUEST,
      "Email not verified"
    );
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // TODO: send OTP to email
};

// ================= RESET PASSWORD =================

const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!user.emailVerified) {
    throw new AppError(
      status.BAD_REQUEST,
      "Email not verified"
    );
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // TODO: verify OTP

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12
  );

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });
};

// ================= EXPORT =================

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