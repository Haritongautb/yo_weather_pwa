"use client";
import React from "react";
import cn from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { RotatingSquare } from "react-loader-spinner";
import { IDaysForecastProps } from "./days-forecast.interface";
import { DaysForecastCard } from "../days-forecast-card/DaysForecastCard";
import { NoDataBanner } from "../no-data-banner/NoDataBanner";
import { animationFunc, formatDate } from "@/utils";
import { useDaysForecast } from "@/hooks";

export const DaysForecast: React.FC<IDaysForecastProps> = ({ className }) => {
  const { data, isFetching, isLoading } = useDaysForecast();
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

  if ((!data || !data.days_forecast.length) && !isLoading && !isFetching) {
    renderData = (
      <NoDataBanner title="No data" className="mt-[0px]">
        <p className="block mb-[20px] text-[20px] text-center font-semibold">
          Something went wrong, please try in 2 minutes
        </p>
      </NoDataBanner>
    );
  }

  if (data && !!data.days_forecast.length) {
    renderData = (
      <>
        {data.days_forecast.map((weather) => (
          <DaysForecastCard
            key={weather.id}
            img={`https:${weather.img}`}
            temperature={weather.temperature}
            date={formatDate(weather.date)}
            id={weather.id}
            hours={[]}
          />
        ))}
      </>
    );
  }

  return (
    <LayoutGroup>
      <motion.div
        className={cn(
          "p-[20px] bg-[#d9d9d9] dark:bg-[#444] shadow-card_shadow rounded-[30px] text-[#292929] dark:text-white",
          className
        )}
        initial="hidden"
        variants={animationFunc(true)}
        whileInView="visible"
        viewport={{
          amount: 0.1,
          once: true,
        }}
        custom={3}
      >
        <h2 className="text-center text-[32px] font-bold">3 days Forecast:</h2>
        <div className="flex flex-col items-center gap-[10px]">
          {renderData}
        </div>
      </motion.div>
    </LayoutGroup>
  );
};
