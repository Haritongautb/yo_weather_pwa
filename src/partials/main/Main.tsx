"use client";
import React from "react";
import cn from "clsx";
import { motion } from "framer-motion";
import { IMainProps } from "./main.interface";

export const Main = React.forwardRef(
  (
    { children, className, ...rest }: IMainProps,
    ref: React.Ref<HTMLElement>
  ): JSX.Element => {
    return (
      <main className={cn("w-full h-full", className)} {...rest} ref={ref}>
        {children}
      </main>
    );
  }
);

export const FMMain = motion.create(Main);
