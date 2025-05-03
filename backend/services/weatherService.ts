import axios from "axios";

const WEATHER_API_KEY = "fd472ab9f63c41a5aa5180223250305 "; // Replace with your actual key.

export async function getWeather(city: string) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

  const response = await axios.get(url);
  const data = response.data;

  return {
    condition: data.current.condition.text,
    tempC: data.current.temp_c,
    isRaining: data.current.condition.text.toLowerCase().includes("rain"),
    isSnowing: data.current.condition.text.toLowerCase().includes("snow"),
    isSunny: data.current.condition.text.toLowerCase().includes("sun"),
  };
}
