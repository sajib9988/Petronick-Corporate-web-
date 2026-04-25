import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/app-error";
import { prisma } from "../../database/prisma";
import { Role, UserStatus } from "../../../generated/prisma-client";

export const authorize = (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ✅ Read token from cookies first, then fallback to Authorization header
      let token: string | undefined;

      if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
      } else {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          token = authHeader.split(" ")[1];
        }
      }

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "No access token provided");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id as string },
      });

      if (!user) {
        throw new AppError(status.UNAUTHORIZED, "User not found");
      }

      if (user.status !== UserStatus.ACTIVE) {
        throw new AppError(status.FORBIDDEN, "User is not active");
      }

      if (user.isDeleted) {
        throw new AppError(status.FORBIDDEN, "User is deleted");
      }

      if (!authRoles.includes(user.role)) {
        throw new AppError(status.FORBIDDEN, "User does not have the required role");
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
      }
    }
  };

