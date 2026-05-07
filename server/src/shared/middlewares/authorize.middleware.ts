import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role, UserStatus } from "../../../generated/prisma-client/index.js";
import { AppError } from "../errors/app-error.js";
import { prisma } from "../../database/prisma.js";
import { get } from "node:http";
import { getTokenFromRequest } from "../utils/auth.token.js";


export const authorize =
  (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("=== AUTHORIZE ===");

      const token = getTokenFromRequest(req);

      console.log("TOKEN:", token);

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "No access token provided");
      }

      const decoded = jwt.verify(
        token,
         process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      console.log("DECODED:", decoded);

      const user = await prisma.user.findUnique({
        where: { id: decoded.id as string },
      });

      console.log("USER:", user);

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
        throw new AppError(
          status.FORBIDDEN,
          "User does not have the required role"
        );
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      console.log("AUTH ERROR:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
        });
      } else {
        res.status(status.UNAUTHORIZED).json({
          message: "Invalid or expired token",
        });
      }
    }
  };

