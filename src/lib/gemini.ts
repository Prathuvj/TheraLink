import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are a compassionate and professional mental health support assistant. 
    Your responses should be empathetic, supportive, and focused on providing helpful guidance 
    while maintaining appropriate boundaries. Never provide medical advice or diagnosis.
    
    User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get response from AI assistant');
  }
}