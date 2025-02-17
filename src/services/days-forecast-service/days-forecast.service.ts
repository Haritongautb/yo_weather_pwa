import axios from "axios";
import { toast } from "sonner";

export class DaysForecastService {
  static async getDaysForecast(lat: number, long: number) {
    try {
      const response = await axios.get(process.env.WEATHER_URL as string, {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${lat},${long}`,
          days: 8,
          aqi: "yes",
          alerts: "yes",
        },
      });

      if (response.status === 200 || response.status === 201) {
        return response;
      }
      return [];
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data.message) {
        console.error("Axios error:", err.response.data.message);
        toast.error(
          `Something went wrong - Error: ${err.response.data.message}. Try this again in 3 minutes`
        );
      } else if (err instanceof Error && err.message) {
        console.error("Error:", err.message);
        toast.error(
          `Something went wrong - Error: ${err.message}. Try this again in 3 minutes`
        );
      } else {
        console.error("An unknown error occurred:", err);
        toast.error("An unknown error occurred");
      }
      return [];
    }
  }
}
