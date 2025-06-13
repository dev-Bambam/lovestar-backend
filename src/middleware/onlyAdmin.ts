import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utils/error/Custom.err";

export function adminOnly(req: Request, res: Response, next: NextFunction) {
   const user = (req as any).user;
   if (!user || user.role !== "admin") {
      throw new ForbiddenError();
   }
   next();
}
