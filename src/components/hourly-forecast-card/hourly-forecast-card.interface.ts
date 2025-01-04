import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IHourlyForecastCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isDarkMode: boolean;
  darkModeStyle: string;
  lightModeStyle: string;
  time: string;
  img: string;
  temperature: number;
  windDirectionSrc: string;
  windSpeed: number;
}
