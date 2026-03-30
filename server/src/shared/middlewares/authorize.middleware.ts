import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { AppError } from "../errors/app-error";
import { cookieUtils } from "../utils/cookie";
import { prisma } from "../../database/prisma";
import { Role, UserStatus } from "../../../generated/prisma-client";

export const authorize = (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = cookieUtils.getCookie(req, "better-auth.session_token");

      if (!sessionToken) {
        throw new AppError(status.UNAUTHORIZED, "No session token provided");
      }

      const sessionExists = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: { gt: new Date() },
        },
        include: { user: true },
      });

      if (!sessionExists || !sessionExists.user) {
        throw new AppError(status.UNAUTHORIZED, "Invalid or expired session");
      }

      const user = sessionExists.user;

      // Session expiry warning
      const now = new Date();
      const expiresAt = new Date(sessionExists.expiresAt);
      const createdAt = new Date(sessionExists.createdAt);
      const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
      const timeRemaining = expiresAt.getTime() - now.getTime();
      const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

      if (percentRemaining < 20) {
        res.setHeader("X-Session-Refresh", "true");
        res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
        res.setHeader("X-Time-Remaining", timeRemaining.toString());
      }

      if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
        throw new AppError(status.UNAUTHORIZED, "User is not active");
      }

      if (user.isDeleted) {
        throw new AppError(status.UNAUTHORIZED, "User is deleted");
      }

      if (authRoles.length > 0 && !authRoles.includes(user.role)) {
        throw new AppError(status.FORBIDDEN, "You do not have permission");
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error: unknown) {
      next(error);
    }
  };