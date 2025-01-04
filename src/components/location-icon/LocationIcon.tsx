"use client";
import React from "react";
import { IoLocation } from "react-icons/io5";
import cn from "clsx";
import { ILocationIconProps } from "./location-icon.interface";

export const LocationIcon: React.FC<ILocationIconProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-bounce bg-[#87CEEB] p-[10px] rounded-full",
        className
      )}
    >
      <IoLocation size={30} className="text-[#4cbb17]" />
    </div>
  );
};
