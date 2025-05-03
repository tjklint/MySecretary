import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getLocationFromPrompt(userInput: string) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    `Extract only the location (address or place name) from this: "${userInput}". Only give the address or place name, no extra text.`
  ]);

  const location = (await result.response.text()).trim();
  return { location };
}

export async function getScheduleAndPackingList(userInput: string, travelDuration: string) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    `Given the event: "${userInput}" and a travel time of ${travelDuration}, assume the user needs 30 minutes to get ready. Generate a JSON object with two fields: "packingList" (array of strings) and "schedule" (array of {time: string, task: string}). No extra explanation.`
  ]);

  const text = await result.response.text();
  try {
    const json = JSON.parse(text);
    return json;
  } catch (e) {
    throw new Error("Failed to parse Gemini output as JSON: " + text);
  }
}
