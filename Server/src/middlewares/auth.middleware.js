import jwt from "jsonwebtoken";
import User from "../features/auth/auth.model.js";
import { env } from "../configs/env.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            const error = new Error("Authentication required");
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(
            token,
            env.JWT_ACCESS_SECRET
        );

        const user = await User
            .findById(decoded.id)
            .select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            error.statusCode = 401;
            error.message = "Invalid token";
        }

        if (error.name === "TokenExpiredError") {
            error.statusCode = 401;
            error.message = "Token expired";
        }

        next(error);
    }
};

export default authMiddleware;