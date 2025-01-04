"use client";
import React from "react";
import cn from "clsx";
import { IButtonProps } from "./button.interface";

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  ...rest
}) => {
  return (
    <button className={cn(className)} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
