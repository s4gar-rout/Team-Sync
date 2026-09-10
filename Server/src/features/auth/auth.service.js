import jwt from "jsonwebtoken";
import User from "./auth.model.js";
import { env } from '../../configs/env.js';
export const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "15m"
        }
    );

    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};