import { ComponentType, DetailedHTMLProps, HTMLAttributes } from "react";

export interface INoDataBannerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  Icon?: React.ElementType;
  isOnline?: boolean;
}
