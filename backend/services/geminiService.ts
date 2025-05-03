import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyA5jlggpRwNycWE5EDieg8g29I_aqSWm2c"; 

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getLocationFromPrompt(userInput: string) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    `Extract only the location (address or place name) from this: "${userInput}". Only give the address or place name, no extra text.`
  ]);

  const location = (await result.response.text()).trim();
  return location;
}

export async function getScheduleAndPackingList(userInput: string, travelDuration: string) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    `Given the event: "${userInput}" and a travel time of ${travelDuration}, assume the user needs 30 minutes to get ready. Respond ONLY with JSON like {"packingList": ["item1", "item2"], "schedule": [{"time": "6:00am", "task": "Wake up"}, {"time": "6:30am", "task": "Leave house"}]}. No extra words.`
  ]);

  const text = await result.response.text();
  try {
    const json = JSON.parse(text);
    return json;
  } catch (e) {
    throw new Error("Failed to parse Gemini output as JSON: " + text);
  }
}
