import { ICurrentWeather } from "@/store";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICurrentWeatherProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: ICurrentWeather | null;
  isLoading: boolean;
  isFetching: boolean;
  title?: string;
  date?: string;
}
