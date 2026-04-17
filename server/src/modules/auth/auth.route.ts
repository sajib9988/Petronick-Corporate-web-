// server/src/modules/auth/auth.route.ts

import { Router } from "express";
import { authorize } from "../../shared/middlewares/authorize.middleware";
import { authController } from "./auth.controller";
import { Role } from "../../../generated/prisma-client";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authorize(Role.ADMIN, Role.USER), authController.getMe);
router.post("/change-password", authorize(Role.ADMIN, Role.USER), authController.changePassword);
router.post("/logout", authorize(Role.ADMIN, Role.USER), authController.logoutUser);
router.post("/verify-email", authController.verifyEmail);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

// ✅ Better Auth handles OAuth automatically
// Just make sure this path matches your Google Redirect URI
router.get("/callback/google", authController.googleCallback);

export const authRoutes = router;