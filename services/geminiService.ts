
import { GoogleGenAI, Type } from "@google/genai";
import { IslamicNote } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIslamicNote = async (zakatAmount: number, isApplicable: boolean): Promise<IslamicNote> => {
  const prompt = isApplicable
    ? `The user is eligible to pay ${zakatAmount} in Zakat. Provide a brief, inspiring Islamic note (maximum 3 sentences) about the virtues of Zakat and its role in purifying wealth. Include a short Quranic or Hadith reference.`
    : `The user's earnings are below the Nisab threshold for Zakat. Provide a brief, encouraging Islamic note (maximum 3 sentences) about the value of Sadaqah (voluntary charity) and trust in Allah's provision. Include a short Quranic or Hadith reference.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING, description: "The main note text" },
            reference: { type: Type.STRING, description: "The source reference" }
          },
          required: ["content"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      content: result.content || "Zakat is one of the five pillars of Islam, purifying one's wealth and soul.",
      reference: result.reference || "Quran 2:43"
    };
  } catch (error) {
    console.error("Error fetching Islamic note:", error);
    return {
      content: "Zakat is a mandatory charitable contribution, often considered a tax, which is the right of the poor and needy.",
      reference: "General Principle"
    };
  }
};

export const getLiveGoldPrice = async (currency: string): Promise<number> => {
  // Simulating an API call for live gold price based on current market trends
  // In a real app, this would fetch from a Finance API
  const basePrices: Record<string, number> = {
    'PKR': 18500,
    'USD': 65,
    'SAR': 245,
    'AED': 240,
    'GBP': 52
  };
  return basePrices[currency] || 18500;
};
