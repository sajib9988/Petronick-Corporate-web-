import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/utils/catch-async.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";
import { tokenUtils } from "../../shared/utils/token.js";
import { cookieUtils } from "../../shared/utils/cookie.js";


const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  // ✅ token তৈরি করে cookie-তে রাখো
  const accessToken = tokenUtils.getAccessToken({ id: result.id, email: result.email, role: result.role });
  const refreshToken = tokenUtils.getRefreshToken({ id: result.id, email: result.email, role: result.role });

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User logged in successfully",
    data: result, // শুধু user data, token না
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.getMe(req.user);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.changePassword(req.user, req.body);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax") as "lax" | "none",
    path: "/",
  };

  cookieUtils.clearCookie(res, "accessToken", cookieOptions);
  cookieUtils.clearCookie(res, "refreshToken", cookieOptions);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User logged out successfully",
    data: null,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // ✅ cookie থেকে refresh token পড়ো
  const token = cookieUtils.getCookie(req, "refreshToken");

  if (!token) {
    throw new Error("Refresh token not found");
  }

  const result = await authService.refreshToken(token);

  // ✅ নতুন access token cookie-তে সেট করো
  tokenUtils.setAccessTokenCookie(res, result.accessToken);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Token refreshed successfully",
    data: null,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await authService.verifyEmail(email, otp);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Email verified successfully",
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await authService.forgetPassword(email);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Password reset OTP sent to email successfully",
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  await authService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Password reset successfully",
  });
});

export const authController = {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  logoutUser,
  refreshToken,
  verifyEmail,
  forgetPassword,
  resetPassword,
};