
import { GoogleGenAI, Type } from "@google/genai";
import { IslamicNote } from "../types";

// Initialize the AI client using the provided environment key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIslamicNote = async (zakatAmount: number, isApplicable: boolean): Promise<IslamicNote> => {
  const prompt = isApplicable
    ? `The user is paying ${zakatAmount} Zakat. Provide a brief, inspiring Islamic note (max 3 sentences) about purifying wealth. Mention the charcoal and emerald spirit of growth.`
    : `The user is below Nisab. Provide a brief, encouraging Islamic note about Sadaqah and Barakah in small deeds.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING },
            reference: { type: Type.STRING }
          },
          required: ["content"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      content: result.content || "Zakat is the growth and purification of your provision.",
      reference: result.reference || "Quranic Wisdom"
    };
  } catch (error) {
    return {
      content: "Zakat is a mandatory charitable contribution, the right of the needy upon our wealth.",
      reference: "General Principle"
    };
  }
};

export interface GoldPriceResult {
  price: number;
  sources: string[];
}

export const getLiveGoldPrice = async (currency: string): Promise<GoldPriceResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for the current gold price in ${currency} per gram from hamariweb.com/finance/gold_rate/ and return ONLY the numerical value.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    const text = response.text || "";
    const match = text.match(/\d+(\.\d+)?/);
    const price = match ? parseFloat(match[0]) : 19200;

    // Extract grounding sources URLs
    const sources: string[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) sources.push(chunk.web.uri);
      });
    }

    return { price, sources: [...new Set(sources)] };
  } catch (e) {
    console.warn("Falling back to simulated price", e);
    return { price: 19200, sources: [] };
  }
};
