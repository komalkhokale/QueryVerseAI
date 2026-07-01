import { generateImage } from "../services/image.service.js";
import { analyzeImage } from "../services/ai.service.js";

export async function generateImageController(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const imageUrl = await generateImage(prompt);

    res.status(200).json({
      success: true,
      image: imageUrl,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Image generation failed",
    });
  }
}

export async function analyzeUploadedImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageBase64 =
      `data:${req.file.mimetype};base64,` +
      req.file.buffer.toString("base64");

    const prompt = req.body.prompt || "Describe this image.";

    const result = await analyzeImage(imageBase64, prompt);

    res.status(200).json({
      success: true,
      result,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}