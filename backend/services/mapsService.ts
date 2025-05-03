import axios from 'axios';

const GOOGLE_MAPS_API_KEY = "AIzaSyDXlf0tCD7YL2sIRX0MlPLcvp9r4fu_peE"; // hardcoded or load from Constants if you want

export async function getTravelInfo(
  originCoords: { latitude: number; longitude: number },
  destination: string
) {
  const origin = `${originCoords.latitude},${originCoords.longitude}`;

  const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
    params: {
      origin,
      destination,
      key: GOOGLE_MAPS_API_KEY,
      mode: 'transit',
    }
  });

  const route = response.data.routes?.[0]?.legs?.[0];
  if (!route) {
    throw new Error('No route found.');
  }

  return {
    duration: route.duration.text,
    departureTime: route.departure_time?.text || 'Unknown',
    steps: route.steps.map((step: any) => ({
      instructions: step.html_instructions,
      duration: step.duration.text,
    })),
  };
}
