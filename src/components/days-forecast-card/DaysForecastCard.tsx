"use client";
import React from "react";
import Image from "next/image";
import { FaTemperatureHigh } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IDaysForecastCardProps } from "./days-forecast-card";

export const DaysForecastCard: React.FC<IDaysForecastCardProps> = ({
  id,
  img,
  temperature,
  date,
}) => {
  const { push } = useRouter();

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between w-full h-full p-[10px] hover:transform hover:scale-[1.05] transition-transform duration-200 cursor-pointer border-[3px] text-black border-white bg-white rounded-lg shadow-md`}
      onClick={() => push(`weather_day/${id}`)}
    >
      <div className="flex justify-center sm:justify-between order-1 sm:order-none w-1/2">
        <Image src={img} alt="weather image" width={60} height={60} priority />
        <div className="flex items-center gap-[5px]">
          <span className="font-semibold text-[24px]">{temperature}</span>
          <FaTemperatureHigh className="w-[32px] h-[32px]" />
        </div>
      </div>
      <div className="text-center md:text-right font-semibold text-[20px] order-0 sm:w-1/2 sm:order-none">
        {date}
      </div>
    </div>
  );
};
