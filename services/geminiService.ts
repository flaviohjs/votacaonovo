
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDishFact = async (dishName: string): Promise<string> => {
  try {
    const prompt = `Gere uma curiosidade gastronômica curta e interessante sobre o prato '${dishName}'. Fale sobre sua origem, um ingrediente especial ou uma harmonização. Mantenha a resposta em uma única frase ou duas no máximo, em português do Brasil.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error(`Error generating content for ${dishName}:`, error);
    return "Não foi possível gerar uma curiosidade para este prato no momento.";
  }
};
