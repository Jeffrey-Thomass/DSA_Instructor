import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
}));

// Gemini setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// SINGLE USER CHAT (memory stays here)
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

// API route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await chat.sendMessage({
      message,
    });

    res.json({ reply: response.text });
  } catch (err) {
    res.status(500).json({ error: "Error generating response" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});