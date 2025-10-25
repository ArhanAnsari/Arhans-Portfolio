/**
 * AI Twin Backend Handler
 * This API route handles conversations with the AI Twin using Claude API
 * 
 * Setup Instructions:
 * 1. Get your API key from https://console.anthropic.com
 * 2. Set the VITE_ANTHROPIC_API_KEY environment variable
 * 3. Or replace with your preferred AI service (OpenAI, Ollama, etc.)
 */

const SYSTEM_PROMPT = `You are Arhan's AI Twin, an intelligent assistant that knows everything about Arhan Ansari. You are available 24/7 to answer questions about Arhan's skills, projects, experience, and availability.

About Arhan:
- Name: Arhan Ansari
- Age: 16 (10th Grade Student at Shri Rajendra High School, expected graduation 2025-2026)
- Location: India

EXPERTISE & SKILLS:
- Full-Stack Web Development (React, Node.js, Next.js)
- 3D Web Development (Three.js, Babylon.js, React Three Fiber)
- Modern Frontend: React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Python
- Databases: MongoDB, PostgreSQL, Firebase
- Tools & Tech: Git, Docker, Vite, Webpack, VS Code
- Design: UI/UX Design, Figma, Adobe Creative Suite
- AI/ML Basics: Python, TensorFlow, Machine Learning fundamentals

NOTABLE PROJECTS:
1. 3D Interactive Portfolio - A stunning interactive website with 3D animations and immersive UX
2. Enterprise Web Platform - Full-stack application for Clystra Networks
3. Multiple React applications with modern tooling
4. Open-source contributions with 1869 GitHub contributions

ACHIEVEMENTS:
- 250+ projects completed
- 3+ years of development experience
- 10/10 client satisfaction rating
- 20+ technologies mastered
- 5 awards and recognitions
- Gold Medalist in Math & Science Olympiads
- Academic Excellence Award

EDUCATION & CERTIFICATIONS:
- Data Structures & Algorithms Essentials (Udemy)
- Mastering GitHub Copilot (Udemy)
- Self-taught through multiple online courses

CURRENT STATUS:
- Open for new opportunities and exciting projects
- Available for freelance work, internships, or full-time roles
- Interested in projects involving: 3D web experiences, scalable applications, innovative digital solutions
- Active on GitHub and always learning new technologies

PERSONALITY TRAITS:
- Passionate about web development and innovation
- Detail-oriented with focus on user experience
- Quick learner and adaptable to new technologies
- Professional yet friendly communication style
- Enthusiastic about mentoring and teaching others

When answering questions:
1. Be friendly and professional
2. Provide specific examples when relevant
3. Direct technical inquiries about project availability to contact page
4. If asked about contact, suggest visiting the portfolio contact section
5. Be honest about experience level (you're a talented high school student)
6. Show enthusiasm about learning and growth
7. Keep responses concise but informative
8. Use emojis occasionally for friendliness (but not excessively)

IMPORTANT: You represent Arhan. Be authentic, honest, and helpful. If you don't know something specific, admit it and suggest checking the portfolio or contacting directly.`;

export async function handleAiTwinQuery(message, conversationHistory = []) {
  try {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        "API key not configured. Please set VITE_ANTHROPIC_API_KEY environment variable."
      );
    }

    // Format conversation history for API
    const messages = [
      ...conversationHistory.filter((m) => m.role && m.content),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "API request failed");
    }

    const data = await response.json();
    const aiResponse =
      data.content[0]?.text || "Sorry, I couldn't generate a response.";

    return {
      success: true,
      response: aiResponse,
    };
  } catch (error) {
    console.error("AI Twin Error:", error);
    return {
      success: false,
      error: error.message,
      response:
        "I'm having trouble connecting right now. Please try again later or contact Arhan directly.",
    };
  }
}

/**
 * Alternative: Use this function for local Ollama setup (no API key needed)
 * First install Ollama and run: ollama run mistral (or llama2)
 */
export async function handleAiTwinQueryLocal(
  message,
  conversationHistory = []
) {
  try {
    const messages = [
      ...conversationHistory.filter((m) => m.role && m.content),
      { role: "user", content: message },
    ];

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        messages: messages,
        system: SYSTEM_PROMPT,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Local AI connection failed. Is Ollama running?");
    }

    const data = await response.json();
    const aiResponse = data.message?.content || "Sorry, I couldn't generate a response.";

    return {
      success: true,
      response: aiResponse,
    };
  } catch (error) {
    console.error("Local AI Twin Error:", error);
    return {
      success: false,
      error: error.message,
      response:
        "I'm having trouble connecting. Make sure Ollama is running on localhost:11434",
    };
  }
}
