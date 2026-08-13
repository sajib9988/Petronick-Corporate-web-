import status from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../../shared/utils/email.js";
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
import { envVars } from "../../config/env.js";

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
  const role =
    email === envVars.SUPER_ADMIN_EMAIL ? "SUPER_ADMIN" : "USER";

  // ✅ OTP generate for email verification
  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      emailVerified: false, // ❌ was true
      otpCode: otp,
      otpExpiresAt,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      emailVerified: true,
    },
  });

  // ✅ Send verification email
  try {
    await sendEmail({
      to: email,
      subject: "Verify Your Email — Petronick Corporate Holdings",
      templateName: "otp",
      templateData: {
        userName: user.name,
        otp,
        expiresInMinutes: 10,
      },
    });
  } catch (err) {
    console.error("Verification email failed:", err);
    // Don't throw — user can resend
  }

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
      emailVerified: true,
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
  console.log("Decoded user:", user);

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

  console.log("DB user:", isUserExists);

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

  if (user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email already verified");
  }

  if (
    !user.otpCode ||
    !user.otpExpiresAt ||
    new Date() > user.otpExpiresAt ||
    otp.length !== 6
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "Invalid or expired OTP. Please request a new one."
    );
  }

  const isValidOtp = crypto.timingSafeEqual(
    Buffer.from(user.otpCode),
    Buffer.from(otp)
  );

  if (!isValidOtp) {
    throw new AppError(
      status.BAD_REQUEST,
      "Invalid or expired OTP. Please request a new one."
    );
  }

  await prisma.user.update({
    where: { email },
    data: {
      emailVerified: true,
      otpCode: null,
      otpExpiresAt: null,
    },
  });
};
// ================= FORGET PASSWORD =================



// ================= FORGET PASSWORD =================

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Removed: separate checks that do the same thing. Combined into one.
  if (!user || user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  // Fix: randomInt max is EXCLUSIVE. Old code (999999) never generated 999999.
  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  // Save OTP first
  await prisma.user.update({
    where: { email },
    data: { otpCode: otp, otpExpiresAt },
  });

  try {
    await sendEmail({
      to: email,
      subject: "Password Reset OTP — Petronick Corporate Holdings",
      templateName: "otp",
      templateData: {
        userName: user.name,
        otp,
        expiresInMinutes: 5,
      },
    });
  } catch (err) {
    // Rollback: clear OTP from DB if email fails, so user isn't locked with a ghost code
    await prisma.user.update({
      where: { email },
      data: { otpCode: null, otpExpiresAt: null },
    });
    console.error("OTP email failed:", err);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to send reset email. Please try again later."
    );
  }
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

  if (!user || user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  // Removed: separate error messages ("No OTP requested", "Invalid OTP", "Expired OTP").
  // Replaced with ONE generic message to prevent user enumeration / timing attacks.
  if (
    !user.otpCode ||
    !user.otpExpiresAt ||
    new Date() > user.otpExpiresAt ||
    otp.length !== 6
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "Invalid or expired OTP. Please request a new one."
    );
  }

  // Added: constant-time comparison to prevent timing attacks
  const isValidOtp = crypto.timingSafeEqual(
    Buffer.from(user.otpCode),
    Buffer.from(otp)
  );

  if (!isValidOtp) {
    throw new AppError(
      status.BAD_REQUEST,
      "Invalid or expired OTP. Please request a new one."
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      otpCode: null,
      otpExpiresAt: null,
    },
  });
};
// ================= EXPORT =================
const resendVerificationEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (user.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email already verified");
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: { otpCode: otp, otpExpiresAt },
  });

  try {
    await sendEmail({
      to: email,
      subject: "Verify Your Email — Petronick Corporate Holdings",
      templateName: "otp",
      templateData: {
        userName: user.name,
        otp,
        expiresInMinutes: 10,
      },
    });
  } catch (err) {
    await prisma.user.update({
      where: { email },
      data: { otpCode: null, otpExpiresAt: null },
    });
    console.error("Resend verification email failed:", err);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to send email. Please try again later."
    );
  }
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
  resendVerificationEmail,
};