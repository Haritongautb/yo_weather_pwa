import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IHourlyForecastCardProps } from "../hourly-forecast-card/hourly-forecast-card.interface";

export interface IHourlyForecastProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IHourlyForecastCardProps[] | null;
  isFetching: boolean;
  isLoading: boolean;
}
