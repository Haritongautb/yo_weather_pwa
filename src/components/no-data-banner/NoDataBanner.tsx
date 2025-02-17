"use client";
import React from "react";
import cn from "clsx";
import { motion } from "framer-motion";
import { INoDataBannerProps } from "./no-data-banner.interface";
import { FaFaceSadCry } from "react-icons/fa6";

export const NoDataBanner = React.forwardRef(
  (
    { title, children, className, Icon, isOnline }: INoDataBannerProps,
    ref: React.Ref<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(
          "flex flex-col items-center mt-[50px] py-[50px] w-full h-full bg-yellow-400 dark:bg-yellow-700 text-black dark:text-white rounded-lg shadow-lg",
          className
        )}
        ref={ref}
      >
        <h2 className="text-center text-[40px] font-semibold">{title}</h2>
        {children}
        {isOnline && Icon ? (
          <Icon className="w-[40px] h-[40px]" />
        ) : (
          <FaFaceSadCry className="w-[40px] h-[40px]" />
        )}
      </div>
    );
  }
);

export const FMNoDataBanner = motion.create(NoDataBanner);
