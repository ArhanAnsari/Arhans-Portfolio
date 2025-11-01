// =============================================
// AI Twin API (Gemini 2.5 - Streaming + Bug-free)
// =============================================
import express from "express";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in environment variables");
}

const SYSTEM_PROMPT = `You are Arhan's AI Twin — a friendly, intelligent digital version of Arhan Ansari.
You answer professionally about Arhan’s skills, experience, projects, and journey as a teenage full-stack developer.
If someone asks for Arhan’s contact, tell them to visit his portfolio contact page.
Use emojis sparingly, keep answers concise, and sound natural like a human.`;

// Initialize Gemini client
const google = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });

router.post("/api/ai-twin", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Prepare response headers for SSE (Server-Sent Events)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Stream text directly from Gemini 2.5 Flash
    const response = await streamText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      messages: [
        ...(conversationHistory || []),
        { role: "user", content: message },
      ],
      temperature: 0.8,
    });

    for await (const delta of response.textStream) {
      res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
    }

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (error) {
    console.error("AI Twin Error:", error);
    res.write(
      `data: ${JSON.stringify({
        text:
          "⚠️ Oops! Something went wrong while talking to Gemini. Try again later!",
      })}\n\n`
    );
    res.end();
  }
});

export default router;