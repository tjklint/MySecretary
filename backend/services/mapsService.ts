import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getTravelInfo(destination: string) {
  const origin = "YOUR_DEFAULT_ORIGIN_ADDRESS"; // OR use req.query.origin later if dynamic

  const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin,
      destination,
      key: process.env.GOOGLE_MAPS_API_KEY,
      mode: 'transit',
    }
  });

  const route = response.data.routes[0]?.legs[0];
  if (!route) {
    throw new Error("No route found.");
  }

  return {
    duration: route.duration.text,
    departureTime: route.departure_time?.text || "Unknown",
    steps: route.steps.map((step: any) => ({
      instructions: step.html_instructions,
      duration: step.duration.text,
    })),
  };
}
