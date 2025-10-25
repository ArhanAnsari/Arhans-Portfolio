/**
 * Vite Server Plugin for AI Twin API Route
 * Add this to your vite.config.js as middleware
 */

export function aiTwinRoute(app) {
  app.post("/api/ai-twin", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({
          error: "Invalid message format",
        });
      }

      const apiKey = process.env.ANTHROPIC_API_KEY;

      if (!apiKey) {
        console.warn("ANTHROPIC_API_KEY not set, using demo response");
        return res.json({
          response: getDemoResponse(message),
        });
      }

      // Call Anthropic API
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
          system: getSystemPrompt(),
          messages: [
            ...(conversationHistory || []),
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Claude API error");
      }

      const data = await response.json();
      const aiResponse =
        data.content[0]?.text || "I couldn't generate a response.";

      res.json({
        response: aiResponse,
      });
    } catch (error) {
      console.error("AI Twin API Error:", error);
      res.status(500).json({
        error: "Failed to process request",
        response:
          "Sorry, I'm having trouble right now. Please try again later.",
      });
    }
  });
}

function getSystemPrompt() {
  return `You are Arhan's AI Twin, an intelligent assistant that knows everything about Arhan Ansari. You are available 24/7 to answer questions about Arhan's skills, projects, experience, and availability.

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

Be friendly, professional, and authentic. Show enthusiasm about development and learning.`;
}

function getDemoResponse(message) {
  const responses = {
    default: "I'm currently in demo mode. Please set up an API key to enable full AI Twin functionality!",
    skills: "Arhan is skilled in React, Three.js, Node.js, and modern web development! What else would you like to know?",
    projects: "Arhan has completed 250+ projects including interactive 3D portfolios and enterprise applications!",
    availability: "Arhan is currently open for new opportunities! You can contact him through the portfolio.",
  };

  const messageLower = message.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (key !== "default" && messageLower.includes(key)) {
      return response;
    }
  }
  return responses.default;
}
