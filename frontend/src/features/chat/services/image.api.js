import axios from "axios";

const api = axios.create({
  baseURL: "https://queryverseai.onrender.com",
  withCredentials: true,
});

export async function generateImage(prompt) {
  const response = await api.post("/api/images/generate", {
    prompt,
  });

  return response.data;
}

export async function analyzeImage(formData) {
  const response = await api.post("/api/images/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}