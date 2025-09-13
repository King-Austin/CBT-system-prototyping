
import { GoogleGenAI } from "@google/genai";
import type { Question } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder check. The actual key is expected to be in the environment.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAnswerExplanation = async (question: Question, userAnswer: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    I am a student reviewing my exam. Please provide a clear and concise explanation for the following question.

    Question: "${question.text}"
    
    The options were:
    ${question.options.map(opt => `- ${opt}`).join('\n')}
    
    The correct answer is: "${question.correctAnswer}"
    My answer was: "${userAnswer}"
    
    Please explain why my answer "${userAnswer}" is incorrect and why "${question.correctAnswer}" is the correct answer. Structure the explanation to be easy to understand for a student.
    `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating explanation from Gemini:", error);
    return "Sorry, I couldn't generate an explanation at this time. Please check your API key and network connection.";
  }
};
