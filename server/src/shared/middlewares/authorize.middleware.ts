import { NextFunction, Request, Response } from "express";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role, UserStatus } from "../../../generated/prisma-client/index.js";
import { AppError } from "../errors/app-error.js";
import { prisma } from "../../database/prisma.js";
import { get } from "node:http";
import { getTokenFromRequest } from "../utils/auth.token.js";


export const authorize = (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
   


      const token = getTokenFromRequest(req);

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "No access token provided");
      }

     const { success, data } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

      if (!success) {
        throw new AppError(status.UNAUTHORIZED, "Invalid access token");
      }
    
      const user = await prisma.user.findUnique({
        where: { id: data.id as string },
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

