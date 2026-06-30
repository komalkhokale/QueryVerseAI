import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage, SystemMessage, AIMessage,createAgent, tool} from "langchain"
import {ChatMistralAI, MistralAI} from "@langchain/mistralai"
import * as z from "zod"
import { searchInternet } from "./internet.service.js";
import { el } from "zod/v4/locales";

const geminiModel = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const minstralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
)

const agent = createAgent({
    model: minstralModel,
    tools: [ searchInternetTool ],
})


export async function generateResponse(messages) {
    console.log(messages)

    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            })) ]

       
    });

    return response.messages[ response.messages.length - 1 ].text;

}

export async function  generateChatTitle(message) {
    const response = await minstralModel.invoke([
        new SystemMessage(`You are a helpful, intelligent, and professional AI assistant.
            
           User will provide you with the first message of a chat conversation.
Your task is to generate a relevant and natural AI response.
Capture the essence in 2–4 words as a short conversation title.
Keep the response friendly, clear, and context-aware.
            `),

            new HumanMessage(`
                Generate a title for a chat conversation based on the following first message:
                "${message}"
                `)
    ])

    return response.text;
}
