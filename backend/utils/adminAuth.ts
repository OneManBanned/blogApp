import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client"

declare global {
    namespace Express {
        interface User extends currentUser {}
    }
}

export type currentUser = User

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.author) {
       next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
