import express from "express";

import {
    register,
    login
} from "./auth.controller.js";

import {
    registerSchema,
    loginSchema
} from "./auth.validator.js";

import validate from "../../middlewares/validate.js";
import asyncHandler from "../../utils/asyncHandler.js";

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

export default router;