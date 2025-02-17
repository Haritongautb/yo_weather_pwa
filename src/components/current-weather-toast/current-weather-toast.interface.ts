import { DetailedHTMLProps, HTMLProps } from "react";

export interface ICurrentWeatherToastProps
  extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
  toastID?: string | number;
}
