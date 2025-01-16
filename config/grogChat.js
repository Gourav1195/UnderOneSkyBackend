import OpenAI from "openai"
import dotenv from 'dotenv'

dotenv.config();
const client = new OpenAI({
  apiKey: process.env.GROQ_CLOUD_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// Function to get AI response
export const getGroqResponse = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    return response.choices[0].message.content; 
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch AI response");
  }
};
