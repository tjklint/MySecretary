import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyDXlf0tCD7YL2sIRX0MlPLcvp9r4fu_peE"; // Replace with yours

type OriginCoords = {
  latitude: number;
  longitude: number;
};

export async function getTravelInfo(
  originCoords: OriginCoords,
  destination: string,
  transportMode: "Driving" | "Public"
) {
  const origin = `${originCoords.latitude},${originCoords.longitude}`;
  const mode = transportMode === "Driving" ? "driving" : "transit";

  const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
    params: {
      origin,
      destination,
      key: GOOGLE_MAPS_API_KEY,
      mode,
    },
  });

  const route = response.data.routes?.[0]?.legs?.[0];
  console.log("Google API Raw Response:", response.data); // Debugging

  if (!route) {
    throw new Error(`No route found. API status: ${response.data.status}`);
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
