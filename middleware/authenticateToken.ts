import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            status: "Failed",
            message: "Unauthorized: Token not provided",
        });
    }

    jwt.verify(token, "your-secret-key", (err, user) => {
        if (err) {
            return res.status(403).json({
                status: "Failed",
                message: "Forbidden: Invalid token",
            });
        }

        // Add the user information to the request for further use in the route handlers
        req.user = user;
        next();
    });
};

export default authenticateToken;
