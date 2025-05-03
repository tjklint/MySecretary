import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyDXlf0tCD7YL2sIRX0MlPLcvp9r4fu_peE";

export async function getTravelInfo(originCoords: { latitude: number; longitude: number }, destination: string) {
  const origin = `${originCoords.latitude},${originCoords.longitude}`;

  const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
    params: {
      origin,
      destination,
      key: GOOGLE_MAPS_API_KEY,
      mode: 'transit',
      alternatives: false,
      units: 'metric',
      region: 'ca', // optional, make sure you stay in Canada context
    }
  });

  console.log('Google API Raw Response:', response.data);

  const route = response.data.routes?.[0]?.legs?.[0];
  if (!route) {
    throw new Error(`No route found. API status: ${response.data.status || 'unknown'}`);
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
