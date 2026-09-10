import express from "express";

import {
    register,
    login,
    getMe
} from "./auth.controller.js";

import {
    registerSchema,
    loginSchema
} from "./auth.validator.js";

import validate from "../../middlewares/validate.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(register)
);

router.post(
    "/login",
    validate(loginSchema),
    asyncHandler(login)
);

router.get(
    "/me",
    authMiddleware,
    asyncHandler(getMe)
);

export default router;