"use client";
import React from "react";
import cn from "clsx";
import Image from "next/image";
import { FaTemperatureHigh } from "react-icons/fa";
import { IHourlyForecastCardProps } from "./hourly-forecast-card.interface";

export const HourlyForecastCard: React.FC<IHourlyForecastCardProps> = ({
  isDarkMode,
  darkModeStyle,
  lightModeStyle,
  img,
  time,
  temperature,
  windDirectionSrc,
  windSpeed,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[5px] px-[25px] py-[15px] rounded-[40px]",
        {
          [darkModeStyle]: isDarkMode,
          [lightModeStyle]: !isDarkMode,
        }
      )}
    >
      <div className="font-bold text-[24px]">{time}</div>
      <Image src={img} alt="weather image" width={80} height={80} priority />
      <div className="flex flex-row gap-[5px] justify-center">
        <div className="font-bold text-[20px]">{temperature}</div>
        <FaTemperatureHigh className="w-[32px] h-[32px]" />
      </div>
      <Image
        src={windDirectionSrc}
        alt="weather image"
        width={55}
        height={55}
        priority
      />
      <div className="font-bold text-[20px] text-center">
        {windSpeed} <span>km/h</span>
      </div>
    </div>
  );
};
