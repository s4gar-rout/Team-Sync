import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./features/auth/auth.routes.js";

import notFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/errorHandler.js";

import sendResponse from "./utils/apiResponse.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Health check route
app.get("/api/health", (req, res) => {
    sendResponse(res, {
        message: "Server is healthy",
    });
});

// Auth routes
app.use("/api/auth", authRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;