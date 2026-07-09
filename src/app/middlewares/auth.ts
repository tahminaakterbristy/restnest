import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import AppError from "../errors/AppError";
import prisma from "../config/prisma";

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, "Unauthorized");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret
      ) as jwt.JwtPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (user.isBlocked) {
        throw new AppError(403, "Your account is blocked");
      }

      (req as any).user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(403, "Forbidden Access");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;