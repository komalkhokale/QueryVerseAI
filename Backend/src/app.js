import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import imageRouter from "./routes/image.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/images", imageRouter);

// ------------------------
// React Build
// ------------------------

const frontendPath = path.resolve(__dirname, "../public");

app.use(express.static(frontendPath));

// Health check
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

// React Router
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;