"use client";
import React from "react";
import cn from "clsx";
import date from "date-and-time";
import { motion } from "framer-motion";
import { RotatingSquare } from "react-loader-spinner";
import { HourlyForecastCard } from "../hourly-forecast-card/HourlyForecastCard";
import { IHourlyForecastProps } from "./hourly-forecast.interface";
import { useIsDarkModeStore } from "@/store";
import { NoDataBanner } from "../no-data-banner/NoDataBanner";
import { animationFunc, windDirections } from "@/utils";

export const HourlyForecast: React.FC<IHourlyForecastProps> = ({
  className,
  isLoading,
  isFetching,
  data,
}) => {
  const isDarkMode = useIsDarkModeStore((state) => state.isDarkMode);
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

  if ((!data || !data.length) && !isLoading && !isFetching) {
    renderData = (
      <NoDataBanner title="No data" className="mt-[0px]">
        <p className="block mb-[20px] text-[20px] text-center font-semibold">
          Something went wrong, please try in 2 minutes
        </p>
      </NoDataBanner>
    );
  }

  if (data && !!data.length) {
    renderData = (
      <>
        {data.map((item: any, index: number) => {
          let time = item.condition
            ? date.format(date.parse(item.time, "YYYY-MM-DD HH:mm"), "HH:mm")
            : item.time;
          return (
            <HourlyForecastCard
              key={index}
              isDarkMode={isDarkMode}
              darkModeStyle="dark:bg-[#373636]"
              lightModeStyle="bg-hourly_forecast_card"
              time={time}
              img={`https:${item.condition?.icon || item.img}`}
              temperature={item.temp_c}
              windDirectionSrc={
                windDirections(item.windDegree) || item.windDirectionSrc
              }
              windSpeed={item.condition ? item.wind_kph : item.wind_speed}
            />
          );
        })}
      </>
    );
  }

  return (
    <motion.div
      className={cn(
        "overflow-x-auto scrollbar-custom py-[30px] px-[20px] md:px-[10px] 2xl:py-[15px] 2xl:px-[80px] bg-[#d9d9d9] dark:bg-[#444] shadow-card_shadow rounded-[30px] text-[#292929] dark:text-white",
        className
      )}
      initial="hidden"
      variants={animationFunc()}
      whileInView="visible"
      viewport={{
        amount: 0.1,
        once: true,
      }}
      custom={4}
    >
      <h2 className="text-center mb-[20px] font-bold text-[32px]">
        Hourly Forecast:
      </h2>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-around md:flex-row gap-[10px] sm:gap-[20px] lg:justify-around w-full">
        {renderData}
      </div>
    </motion.div>
  );
};
