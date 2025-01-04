import { create } from "zustand";
import { IDaysForecastCardProps } from "@/components/days-forecast-card/days-forecast-card";
export interface IUseDaysWeather {
  days_forecast: IDaysForecastCardProps[] | null;
  setData: (data: IDaysForecastCardProps[]) => void;
}
export const useDaysWeather = create<IUseDaysWeather>((set) => ({
  days_forecast: null,
  setData: (data) =>
    set((state) => ({
      ...state,
      days_forecast: [...data],
    })),
}));
