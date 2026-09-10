import {
    registerUser,
    loginUser
} from "./auth.service.js";

import sendResponse from "../../utils/apiResponse.js";
import { env } from '../../configs/env.js';

export const register = async (req, res) => {
    const user = await registerUser(req.body);

    return sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: {
            user
        }
    });
};

export const login = async (req, res) => {
    const result = await loginUser(req.body);

    res.cookie("token", result.token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
    });

    return sendResponse(res, {
        message: "Login successful",
        data: {
            user: result.user
        }
    });
};

export const getMe = async (req, res) => {
    return sendResponse(res, {
        message: "User fetched successfully",
        data: {
            user: req.user
        }
    });
};