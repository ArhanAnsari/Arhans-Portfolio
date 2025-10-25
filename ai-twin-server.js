/**
 * AI Twin Backend Server - Powered by Google Gemini 2.5 Flash
 * Advanced Express server with streaming, analytics, and memory management
 * 
 * Setup:
 * 1. npm install express cors dotenv axios
 * 2. Create .env file with GOOGLE_GEMINI_API_KEY
 * 3. Get key from: https://ai.google.dev
 * 4. Run: node ai-twin-server.js
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173', 'https://arhanansari.me', 'https://arhanansari.is-a.dev'].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// In-memory store for conversation sessions (use Redis in production)
const conversationStore = new Map();
const analyticsStore = [];

const SYSTEM_PROMPT = `You are Arhan's AI Twin, a sophisticated AI assistant with deep knowledge of Arhan Ansari. You are available 24/7 to answer questions about Arhan's skills, projects, experience, and availability.

About Arhan:
- Name: Arhan Ansari
- Age: 16 (10th Grade Student at Shri Rajendra High School)
- Location: India

EXPERTISE & SKILLS:
- Full-Stack Web Development (React, Node.js, Next.js)
- 3D Web Development (Three.js, Babylon.js, React Three Fiber)
- Modern Frontend: React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Python
- Databases: MongoDB, PostgreSQL, Firebase
- Tools & Tech: Git, Docker, Vite, Webpack
- AI/ML Basics: Python, TensorFlow

NOTABLE PROJECTS:
- 3D Interactive Portfolio with immersive animations
- Enterprise Web Platform for Clystra Networks
- Multiple modern React applications
- 1869 GitHub contributions

ACHIEVEMENTS:
- 250+ projects completed
- 3+ years of development experience
- 10/10 client satisfaction
- 20+ technologies mastered
- Gold medalist in Math & Science Olympiads
- Academic Excellence Award

CURRENT STATUS:
- Open for new opportunities
- Available for freelance work and projects
- Interested in 3D web experiences and scalable applications
- Always learning new technologies

PERSONALITY:
- Passionate about web development and innovation
- Detail-oriented with focus on UX
- Quick learner and adaptable
- Professional yet friendly
- Enthusiastic about teaching others

When answering questions:
1. Be friendly and professional
2. Provide specific examples when relevant
3. For project inquiries, suggest contacting through the portfolio
4. Be honest about being a high school student with exceptional skills
5. Show enthusiasm about learning and growth
6. Keep responses concise but informative`;

app.post('/api/ai-twin', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Demo mode - return sample responses
      console.warn('ANTHROPIC_API_KEY not set - using demo mode');
      return res.json({
        response: getDemoResponse(message),
      });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          ...(conversationHistory || []).filter(m => m.role && m.content),
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Claude API error');
    }

    const data = await response.json();
    const aiResponse = data.content[0]?.text || "I couldn't generate a response.";

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('AI Twin API Error:', error);
    res.status(500).json({
      error: 'Failed to process request',
      response: 'Sorry, I\'m having trouble right now. Please try again later.',
    });
  }
});

function getDemoResponse(userMessage) {
  const messageLower = userMessage.toLowerCase();

  const demoResponses = {
    skills: "Arhan is an expert in React, Three.js, Node.js, and modern full-stack development! He has mastered 20+ technologies including TypeScript, MongoDB, and cloud deployment. What specific skill would you like to know more about?",
    projects: "Arhan has completed 250+ projects! Notable ones include his stunning 3D interactive portfolio, an enterprise web platform for Clystra Networks, and numerous open-source contributions. He has over 1869 GitHub contributions!",
    experience: "With 3+ years of development experience starting at age 13, Arhan has built everything from interactive 3D web experiences to scalable backend systems. He's achieved a perfect 10/10 client satisfaction rating!",
    availability: "Yes! Arhan is currently open for new opportunities. He's available for freelance work, internships, or exciting projects that involve 3D web experiences or innovative digital solutions. Feel free to reach out through the contact page!",
    education: "Arhan is a 10th grade student at Shri Rajendra High School (graduating 2025-2026). He's a Math & Science Olympiad gold medalist and received the Academic Excellence Award. He's also completed courses in Data Structures & Algorithms and GitHub Copilot mastery!",
    technologies: "Arhan works with: React, Next.js, Node.js, Express, Three.js, TypeScript, Python, MongoDB, PostgreSQL, Firebase, Tailwind CSS, Framer Motion, Docker, Git, and more!",
    contact: "You can contact Arhan through the contact form on his portfolio website. He typically responds within 24 hours!",
  };

  for (const [key, response] of Object.entries(demoResponses)) {
    if (messageLower.includes(key)) {
      return response;
    }
  }

  return "That's a great question! I'm Arhan's AI Twin - I know everything about him. Feel free to ask me about his skills, projects, experience, or availability. What would you like to know?";
}

app.listen(PORT, () => {
  console.log(`🤖 AI Twin Server running on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  ANTHROPIC_API_KEY not set - running in demo mode');
    console.warn('   To enable full AI functionality, set ANTHROPIC_API_KEY in your .env file');
  }
});
