"use client";
import React from "react";
import cn from "clsx";
import { motion } from "framer-motion";
import { FaTemperatureHigh } from "react-icons/fa";
import { RotatingSquare } from "react-loader-spinner";
import { ICurrentWeatherProps } from "./current-weather.interface";
import { useIsDarkModeStore } from "@/store";
import { NoDataBanner } from "../no-data-banner/NoDataBanner";
import { animationFunc } from "@/utils";

export const CurrentWeather: React.FC<ICurrentWeatherProps> = ({
  className,
  data,
  isLoading,
  isFetching,
}) => {
  const isDarkMode = useIsDarkModeStore((state) => state.isDarkMode);
  const image: string = isDarkMode ? "" : "-black";

  let renderData = null;
  if (
    isLoading ||
    isFetching ||
    (isFetching && !data) ||
    (isLoading && !data)
  ) {
    renderData = (
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#4cbb17"
        ariaLabel="rotating-square-loading"
      />
    );
  }

  if ((!data || !Object.keys(data).length) && !isLoading && !isFetching) {
    renderData = (
      <NoDataBanner title="No data" className="mt-0">
        <p className="block mb-[20px] text-[20px] text-center font-semibold">
          Something went wrong, please try in 2 minutes
        </p>
      </NoDataBanner>
    );
  }

  if (data && !!Object.keys(data).length) {
    renderData = (
      <>
        {/* first column */}
        <div className="flex flex-col sm:flex-row md:flex-col items-center justify-around md:justify-normal w-full md:w-1/3">
          <div className="flex flex-col items-center w-full mb-[27px]">
            <div className="flex items-center gap-[5px]">
              <span className="text-[40px] sm:text-[80px] font-bold">
                {data.current_temp}
              </span>
              <FaTemperatureHigh className="w-[32px] h-[32px]" />
            </div>
            <div className="flex flex-row items-center gap-[8px]">
              <span className="block w-full">Feels like: </span>
              <div className="flex items-center gap-[5px]">
                <span className="text-[25px] sm:text-[32px] font-semibold">
                  {data.feels_like}
                </span>
                <FaTemperatureHigh className="w-[32px] h-[32px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <img
                src={`/images/sunrise${image}.png`}
                alt="sunrise image"
                width={48}
                height={48}
              />
              <div className="flex flex-col items-center font-semibold">
                <span className="text-[20px]">Sunrise</span>
                <span className="text-[16px]">{data.sunrise}</span>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <img
                src={`/images/sunset${image}.png`}
                alt="sunrise image"
                width={48}
                height={48}
              />
              <div className="flex flex-col items-center font-semibold ">
                <span className="text-[20px]">Sunset</span>
                <span className="text-[16px]">{data.sunset}</span>
              </div>
            </div>
          </div>
        </div>
        {/* second column */}
        <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center w-full md:w-1/3">
          <img
            src={`https:${data.current_weather_icon}`}
            alt="sunny image"
            className="w-[200px] h-[200px] md:w-[150px] md:h-[150px] object-fit"
          />
          <h2 className="font-semibold text-[32px] text-center">
            {data.current_weather_text}
          </h2>
        </div>
        {/* third column */}
        <div className="flex justify-around flex-col sm:flex-row md:grid md:auto-rows-card_column md:grid-cols-card_column md:items-center gap-[15px] md:w-1/3 w-full">
          <div className="flex flex-col items-center gap-[20px] sm:gap-0 h-full">
            <img
              src={`/images/humidity${image}.png`}
              alt="humidity image"
              width={50}
              height={50}
            />
            <div className="mt-auto mb-0 text-center">
              <div className="mb-[10px] text-[20px] font-semibold">
                {data.humidity}%
              </div>
              <div className="text-[16px] font-medium">Humidity</div>
            </div>
          </div>
          <div className="flex flex-col items-center h-full">
            <img
              src={`/images/windy${image}.png`}
              alt="humidity image"
              width={60}
              height={50}
            />
            <div className="mt-auto mb-0 text-center">
              <div className="mb-[10px] text-[20px] font-semibold">
                {data.wind_speed}km/h
              </div>
              <div className="text-[16px] font-medium">Wind Speed</div>
            </div>
          </div>
          <div className="flex flex-col items-center h-full">
            <img
              src={`/images/pressure${image}.png`}
              alt="pressure image"
              width={60}
              height={50}
            />
            <div className="mt-auto mb-0 text-center">
              <div className="mb-[10px] text-[20px] font-semibold">
                {data.pressure}hPa
              </div>
              <div className="text-[16px] font-medium">Pressure</div>
            </div>
          </div>
          <div className="flex flex-col items-center h-full">
            <img
              src={`/images/uv${image}.png`}
              alt="uv image"
              width={60}
              height={50}
            />
            <div className="mt-auto mb-0 text-center">
              <div className="mb-[10px] text-[20px] font-semibold">
                {data.UV}
              </div>
              <div className="mb-0 mt-auto text-[16px] font-medium">UV</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <motion.div
      className={cn(
        "flex flex-wrap justify-center md:flex-nowrap gap-[30px] sm:gap-0 bg-[#d9d9d9] dark:bg-[#444] p-[10px] md:p-[25px] shadow-card_shadow rounded-[30px] text-[#292929] dark:text-white",
        className
      )}
      initial="hidden"
      variants={animationFunc()}
      whileInView="visible"
      viewport={{
        amount: 0.1,
        once: true,
      }}
      custom={2}
    >
      {renderData}
    </motion.div>
  );
};
