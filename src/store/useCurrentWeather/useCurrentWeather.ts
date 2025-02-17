import { create } from "zustand";
export interface ICurrentWeather {
  current_weather_text?: string;
  current_weather_icon?: string;
  current_temp?: number | null;
  feels_like?: number | null;
  sunrise?: string;
  sunset?: string;
  humidity?: number | null;
  wind_speed?: number | null;
  pressure?: number | null;
  UV?: number | null;
}
interface IUseCurrentWeather {
  current_weather: ICurrentWeather | null;
  isLoading: boolean;
  isFetching: boolean;
  setData: (data: ICurrentWeather) => void;
  setIsLoading: (value: string, condition: boolean) => void;
}
export const useCurrentWeather = create<IUseCurrentWeather>((set) => ({
  current_weather: null,
  isLoading: true,
  isFetching: true,
  setData: (data) =>
    set((state) => ({
      ...state,
      current_weather: {
        ...state.current_weather,
        ...data,
      },
    })),
  setIsLoading: (value, condition) =>
    set((state) => ({
      ...state,
      [value]: condition,
    })),
}));
