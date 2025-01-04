import { DetailedHTMLProps, HTMLProps } from "react";

export interface IShowNotificationToastProps
  extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
  toastID?: string | number;
  title: string;
  isApproved?: boolean;
}

export interface IShowNotificationProps {
  title: string;
  duration?: number;
  isApproved?: boolean;
}
