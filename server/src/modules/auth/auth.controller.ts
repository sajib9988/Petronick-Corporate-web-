import { Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";
import { auth } from "../../lib/auth";
import { AppError } from "../../shared/errors/app-error";
import { catchAsync } from "../../shared/utils/catch-async";
import { cookieUtils } from "../../shared/utils/cookie";
import { sendResponse } from "../../shared/utils/send-response";
import { authService } from "./auth.service";

const SESSION_COOKIE = "better-auth.session_token";

const setCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  if (result.token) {
    setCookie(res, result.token);
  }

  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      token: result.token,
      user: result.user,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  if (!result.token) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Session token is missing");
  }

  setCookie(res, result.token);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token: result.token,
      user: result.user,
    },
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
  const sessionToken = req.cookies[SESSION_COOKIE];
  const result = await authService.changePassword(req.body, sessionToken);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = req.cookies[SESSION_COOKIE];
  await authService.logoutUser(sessionToken);

  cookieUtils.clearCookie(res, SESSION_COOKIE, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User logged out successfully",
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

const googleLogin = catchAsync((req: Request, res: Response) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const encodedRedirectPath = encodeURIComponent(redirectPath as string);

  const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;

  res.render("googleRedirect", {
    provider: "google",
    signInEndpoint: `${envVars.BETTER_AUTH_URL}/api/v1/auth/signin`,
    callbackURL,
  });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  const redirectPath = (req.query.redirect as string) || "/dashboard";
  const sessionToken = req.cookies[SESSION_COOKIE];

  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
  }

  const session = await auth.api.getSession({
    headers: { Cookie: `${SESSION_COOKIE}=${sessionToken}` },
  });

  if (!session || !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
  }

  await authService.googleLoginSuccess(session);

  const isValid = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  res.redirect(`${envVars.FRONTEND_URL}${isValid ? redirectPath : "/dashboard"}`);
});

const handleOAuthError = catchAsync((req: Request, res: Response) => {
  const error = (req.query.error as string) || "oauth_failed";
  res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});

export const authController = {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  logoutUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  googleLogin,
  googleLoginSuccess,
  handleOAuthError,
};