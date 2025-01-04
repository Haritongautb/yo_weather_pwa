"use client";
import React from "react";
import cn from "clsx";
import { motion } from "framer-motion";
import { IHeaderProps } from "./header.interface";
import "./header.css";

export const Header = React.forwardRef(
  (
    { className, children, ...rest }: IHeaderProps,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <header className={cn("header", className)} {...rest} ref={ref}>
        {children}
      </header>
    );
  }
);

export const FMHeader = motion.create(Header);
