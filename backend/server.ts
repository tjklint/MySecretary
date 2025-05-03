import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { getTravelInfo } from "./services/mapsService";
import { getLocationFromPrompt, getScheduleAndPackingList } from "./services/geminiService";

config(); // load .env

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/plan", (req: Request, res: Response) => {
  (async () => {
    try {
      const { userInput, origin } = req.body;

      if (!userInput || !origin) {
        return res.status(400).json({ error: "Missing userInput or origin" });
      }

      const destination = await getLocationFromPrompt(userInput);
      const travelInfo = await getTravelInfo(origin, destination);
      const plan = await getScheduleAndPackingList(userInput, travelInfo.duration);

      return res.json({
        destination,
        travelInfo,
        plan,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: (error as Error).message });
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
