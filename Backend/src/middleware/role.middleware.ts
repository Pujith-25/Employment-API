import {
  Request,
  Response,
  NextFunction
} from "express";

export const authorizeRole =
  (...roles: string[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const role =
      (req as any).role;

    if (!role) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    if (!roles.includes(role)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();

  };