import { ICurrentWeather } from "@/store";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IHourlyForecastCardProps } from "../hourly-forecast-card/hourly-forecast-card.interface";

export interface IDaysForecastCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    ICurrentWeather {
  id: string;
  img: string;
  temperature: number;
  date: string;
  hours: IHourlyForecastCardProps[];
  location?: string;
}
