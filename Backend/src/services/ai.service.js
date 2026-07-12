import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  createAgent,
  tool,
} from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";
import * as z from "zod";

import { searchInternet } from "./internet.service.js";

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-2.0-flash",
];

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description:
    "Use this tool when the user asks for current, latest, recent, or real-time information from the internet.",
  schema: z.object({
    query: z
      .string()
      .min(1)
      .describe("The search query to look up on the internet."),
  }),
});

const mistralAgent = createAgent({
  model: mistralModel,
  tools: [searchInternetTool],
  systemPrompt: `
    You are a helpful, accurate, and concise AI assistant.

    Follow these rules:
    - Answer clearly and directly.
    - If you do not know the answer, say that you do not know.
    - For current, recent, latest, live, or time-sensitive information,
      use the searchInternet tool before answering.
    - Base current-information answers on the search results.
    - Do not invent facts or sources.
  `,
});

function convertMessages(messages = []) {
  return messages
    .map((message) => {
      if (!message?.content) {
        return null;
      }

      if (message.role === "user") {
        return new HumanMessage(message.content);
      }

      if (message.role === "ai" || message.role === "assistant") {
        return new AIMessage(message.content);
      }

      if (message.role === "system") {
        return new SystemMessage(message.content);
      }

      return null;
    })
    .filter(Boolean);
}

function getErrorStatus(error) {
  return (
    error?.status ||
    error?.response?.status ||
    error?.cause?.status ||
    error?.code
  );
}

function shouldTryNextModel(error) {
  const status = getErrorStatus(error);

  return (
    status === 404 ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504 ||
    String(error?.message || "").toLowerCase().includes("quota") ||
    String(error?.message || "").toLowerCase().includes("rate limit") ||
    String(error?.message || "").toLowerCase().includes("not found") ||
    String(error?.message || "").toLowerCase().includes("unavailable")
  );
}

async function invokeGeminiWithFallback(messages) {
  let lastError = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = new ChatGoogleGenerativeAI({
        model: modelName,
        apiKey: process.env.GEMINI_API_KEY,
        temperature: 0.4,
        maxRetries: 1,
      });

      const response = await model.invoke(messages);

      return {
        response,
        modelName,
      };
    } catch (error) {
      lastError = error;

      console.error(
        `Gemini model ${modelName} failed:`,
        error?.message || error,
      );

      if (!shouldTryNextModel(error)) {
        throw error;
      }
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

export async function generateResponse(messages) {
  const convertedMessages = convertMessages(messages);

  if (convertedMessages.length === 0) {
    throw new Error("At least one valid message is required");
  }

  try {
    const response = await mistralAgent.invoke({
      messages: convertedMessages,
    });

    const lastMessage = response.messages?.at(-1);

    if (!lastMessage) {
      throw new Error("Mistral returned an empty response");
    }

    return lastMessage.text || lastMessage.content;
  } catch (mistralError) {
    console.error(
      "Mistral agent failed. Trying Gemini fallback:",
      mistralError?.message || mistralError,
    );

    const geminiMessages = [
      new SystemMessage(`
        You are a helpful, accurate, and concise AI assistant.

        Answer clearly and directly.
        If you do not know something, say so.
        Do not invent current information because internet search is not
        available in this fallback response.
      `),
      ...convertedMessages,
    ];

    const { response } = await invokeGeminiWithFallback(geminiMessages);

    return response.text || response.content;
  }
}

export async function analyzeImage(
  imageBase64,
  prompt = "Describe this image.",
) {
  if (!imageBase64) {
    throw new Error("Image is required");
  }

  const imageMessage = new HumanMessage({
    content: [
      {
        type: "text",
        text: prompt,
      },
      {
        type: "image_url",
        image_url: {
          url: imageBase64,
        },
      },
    ],
  });

  const { response } = await invokeGeminiWithFallback([imageMessage]);

  return response.text || response.content;
}

export async function generateChatTitle(message) {
  if (!message?.trim()) {
    return "New Chat";
  }

  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`
        Generate only a short conversation title.

        Rules:
        - Use 2 to 4 words.
        - Do not answer the user's question.
        - Do not use quotation marks.
        - Do not add punctuation at the end.
        - Return only the title.
      `),
      new HumanMessage(message.trim()),
    ]);

    const title = String(response.text || response.content || "")
      .replace(/^["']|["']$/g, "")
      .trim();

    return title || "New Chat";
  } catch (mistralError) {
    console.error(
      "Mistral title generation failed. Trying Gemini:",
      mistralError?.message || mistralError,
    );

    try {
      const { response } = await invokeGeminiWithFallback([
        new SystemMessage(`
          Generate only a short conversation title.

          Rules:
          - Use 2 to 4 words.
          - Do not answer the question.
          - Return only the title.
        `),
        new HumanMessage(message.trim()),
      ]);

      return (
        String(response.text || response.content || "")
          .replace(/^["']|["']$/g, "")
          .trim() || "New Chat"
      );
    } catch {
      return message.trim().split(/\s+/).slice(0, 4).join(" ") || "New Chat";
    }
  }
}