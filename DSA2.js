import dotenv from "dotenv";
import readlineSync from "readline-sync";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chat = ai.chats.create({
  model: "gemini-3-flash-preview",
  history: [],
  config: {
    systemInstruction: `You are a DSA Instructor. You will only reply to the problem related to Data Structure and Algorithm.
      You have to solve the query in the simplest way.
      If user asks any question which is not related to Data Structure and Algorithm, you have to reply redly. 
      Example: If user asks, How are you 
      you will reply : You dumb ask me some sensible questions , like this message you can reply very rudely
      
      you have to reply rudely if user asks any question which is not related to Data Structure and Algorithm.
      Else reply him politely with simple explanation.`,
  },
});

async function main() {
  while (true) {
    const userInput = readlineSync.question("Ask me something --> ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye 👋");
      break;
    }

    const response = await chat.sendMessage({
      message: userInput,
    });

    console.log("AI:", response.text);
  }
}

main();