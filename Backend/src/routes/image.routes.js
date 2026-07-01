import { Router } from "express";
import {
  generateImageController,
  analyzeUploadedImage,
} from "../controllers/image.controller.js";

import { authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const imageRouter = Router();

imageRouter.post("/generate", authUser, generateImageController);

imageRouter.post(
  "/analyze",
  authUser,
  upload.single("image"),
  analyzeUploadedImage
);

export default imageRouter;