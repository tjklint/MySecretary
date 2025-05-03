import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI("AIzaSyA5jlggpRwNycWE5EDieg8g29I_aqSWm2c"); // <- PUT YOUR API KEY HERE

export async function getLocationFromPrompt(prompt: string): Promise<string> {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = `
You are helping find a destination.
ONLY respond with the exact name of the location/place the user is going to.
Do not explain anything else.

User says: ${prompt}
`;

  const result = await model.generateContent([fullPrompt]);
  const text = result.response.text().trim();

  console.log('Destination extracted from Gemini:', text);
  return text;
}

export async function getScheduleAndPackingList(prompt: string, travelDuration: string): Promise<any> {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = `
You are an assistant helping plan a trip. 
The user needs to wake up, get ready, travel for ${travelDuration}, and arrive on time. 
Also suggest a packing list.

Respond ONLY as JSON. DO NOT explain anything.

Format:
{
  "packingList": ["Item1", "Item2"],
  "schedule": [
    { "time": "6:00am", "task": "Wake up" },
    { "time": "6:30am", "task": "Leave house" }
  ]
}

User says: ${prompt}
`;

  const result = await model.generateContent([fullPrompt]);
  let text = result.response.text();

  console.log('Gemini raw output:', text);

  // --- Clean the response if wrapped in triple backticks ---
  text = text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/```json|```/g, "").trim();
  }
  // ----------------------------------------------------------

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error('Failed parsing Gemini output:', text);
    throw new Error('Failed to parse Gemini output as JSON.');
  }
}
