import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICurrentDate {
  currentCity: string;
  currentTime: Date;
  currentDate: Date;
}

export interface ICurrentDateProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
