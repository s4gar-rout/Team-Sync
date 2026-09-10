import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import notFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/errorHandler.js";

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
    res.status(200).json({
        message: "Team Sync API is running",
        success: true,
    });
});

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;