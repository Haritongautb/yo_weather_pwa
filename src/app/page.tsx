"use client";
import React from "react";
import cn from "clsx";
import { FMHeader } from "@/partials";
import { animationFunc } from "@/utils";
import {
  CurrentDate,
  CurrentLocationBtn,
  CurrentWeather,
  DarkMode,
  DaysForecast,
  HourlyForecast,
  MicrophoneBtn,
  OfflineCards,
  ResetBtn,
  Search,
} from "@/components";
import { useCurrentWeather } from "@/store";
import { useHourlyForecast, useOnline } from "@/hooks";

export const dynamic = "force-static";
const HomePage: React.FC = () => {
  const { current_weather, isLoading, isFetching } = useCurrentWeather();
  const { isOnline } = useOnline();
  const {
    data,
    isLoading: isLoadingForecast,
    isFetching: isFetchingForecast,
  } = useHourlyForecast();
  return (
    <div className="min-h-screen">
      <FMHeader
        initial="hidden"
        variants={animationFunc()}
        whileInView="visible"
        viewport={{
          amount: 0.1,
          once: true,
        }}
        custom={2}
        className={cn({
          "justify-center": !isOnline,
          "justify-between": isOnline,
        })}
      >
        <div className={"flex flex-col w-full sm:w-[290px]"}>
          <DarkMode />
          {isOnline && <MicrophoneBtn />}
        </div>
        {isOnline ? (
          <Search />
        ) : (
          <div className="text-black dark:text-white text-center font-bold">
            <h2 className="text-[20px]">The application is in offline mode.</h2>
            <span className="text-[#FFCC00]">
              Check your internet connection
            </span>
          </div>
        )}

        {isOnline && (
          <div className="flex flex-col w-full sm:w-[290px]">
            <CurrentLocationBtn />
            <ResetBtn />
          </div>
        )}
      </FMHeader>
      {isOnline ? (
        <div className="flex flex-wrap justify-between 2xl:justify-around items-center gap-[30px] px-[10px] overflow-x-hidden">
          <CurrentDate className="order-1 w-full md:w-1/3 xl:w-1/4 2xl:w-[510px] min-h-[200px] md:min-h-[310px]" />
          <CurrentWeather
            className="order-3 xl:order-2 w-full xl:w-2/3 2xl:w-[780px] h-auto"
            data={current_weather}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <DaysForecast className="order-2 xl:order-3 w-full md:w-1/2 xl:w-1/4 2xl:w-[510px]" />
          <HourlyForecast
            className="order-4 w-full xl:w-2/3 2xl:w-[850px]"
            data={data}
            isLoading={isLoadingForecast}
            isFetching={isFetchingForecast}
          />
        </div>
      ) : (
        <OfflineCards />
      )}
    </div>
  );
};
export default HomePage;
