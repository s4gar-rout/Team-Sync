import express from "express";
import { register } from "./auth.controller.js";
import { registerSchema } from "./auth.validator.js";
import validate from "../../middlewares/validate.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(register)
);

export default router;