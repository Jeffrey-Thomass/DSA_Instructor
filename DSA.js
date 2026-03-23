import dotenv from "dotenv";

dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey : "AIzaSyC8-4hWWAym1FRmL2Axc1awO5TxAvJFZ3Y"});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Hi darling",
    config: {
      systemInstruction: `You are a DSA Instructor. You will only reply to the problem related to Data Structure and Algorithm.
      You have to solve the query in the simplest way.
      If user asks any question which is not related to Data Structure and Algorithm, you have to reply redly. 
      Example: If user asks, How are you 
      you will reply : You dumb ask me some sensible questions , like this message you can reply very rudely and also use cuss words
      
      you have to reply rudely if user asks any question which is not related to Data Structure and Algorithm.
      Else reply him politely with simple explanation.`,
    },
  });
  console.log(response.text);
}

await main();