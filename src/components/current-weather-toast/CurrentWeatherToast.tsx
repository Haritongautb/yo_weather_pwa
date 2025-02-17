"use client";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import { FaTemperatureHigh } from "react-icons/fa";
import Image from "next/image";
import { useCurrentWeather } from "@/store";
import { ICurrentWeatherToastProps } from "./current-weather-toast.interface";

export const CurrentWeatherToast: React.FC<ICurrentWeatherToastProps> = ({
  toastID,
}) => {
  const { current_weather } = useCurrentWeather((state) => state);

  if (!current_weather) {
    return null;
  }
  return (
    <div
      className="relative text-center items-center cursor-pointer p-[20px] 
						 bg-yellow-400 dark:bg-yellow-700 
						 text-black dark:text-white 
						 rounded-lg shadow-lg"
      onClick={() => {
        return toast.dismiss(toastID);
      }}
    >
      <div className="flex items-center mb-[20px]">
        <h2 className="font-semibold">Today's weather - </h2>
        <p className="text-[18px] font-semibold">
          {current_weather.current_weather_text}
        </p>
      </div>

      <div className="flex gap-[30px] item-center justify-center">
        <div className="flex items-center gap-[5px]">
          <span className="text-[25px] sm:text-[32px] font-semibold">
            {current_weather.current_temp}
          </span>
          <FaTemperatureHigh className="w-[20px] h-[20px]" />
        </div>
        <Image
          width={40}
          height={40}
          src={`https://${current_weather.current_weather_icon}`}
          alt="weather icon"
        />
      </div>

      <IoMdCloseCircleOutline
        className="absolute top-[5px] sm:top-0 right-[5px] sm:right-0"
        size={30}
      />
    </div>
  );
};

export const showCurrentWeatherToast = () => {
  return toast.custom((id) => <CurrentWeatherToast toastID={id} />, {
    id: "currentWeatherToast",
    position: "top-center",
    duration: Infinity,
    onDismiss: (t) => t.id,
  });
};
