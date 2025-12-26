import { GoogleGenAI } from "@google/genai";
import { PROFILE, PUBLICATIONS, PROJECTS, BLOG_POSTS } from '../data/content';

// Construct a system context based on the portfolio data
const SYSTEM_CONTEXT = `
You are an AI assistant for ${PROFILE.name}, a ${PROFILE.role} at ${PROFILE.institution}.
Your goal is to answer questions from recruiters, researchers, and students visiting ${PROFILE.name}'s academic website.

Here is ${PROFILE.name}'s background:
Bio: ${PROFILE.bio}
Contact: ${PROFILE.email}

Publications:
${PUBLICATIONS.map(p => `- ${p.title} (${p.year}) at ${p.venue}. Abstract: ${p.abstract}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Blog Posts:
${BLOG_POSTS.map(b => `- ${b.title} (${b.date}): ${b.excerpt}`).join('\n')}

Guidelines:
1. Be professional, concise, and helpful.
2. If asked about contact, provide the email or mention the 'Book Meeting' tab.
3. If asked about specific research, summarize the relevant publication.
4. You can speak in the first person as if you are ${PROFILE.name}'s digital twin, or as a third-person assistant. Default to helpful assistant.
`;

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return "I'm currently in demo mode and strictly need an API Key to function correctly. Please clone the repo and add your GOOGLE_API_KEY to the environment variables to chat with me!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_CONTEXT }] },
        { role: 'user', parts: [{ text: "The user asks: " + userMessage }] }
      ]
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a temporary error. Please try again later.";
  }
};