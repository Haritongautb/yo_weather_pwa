"use client";
import React from "react";
import cn from "clsx";
import { motion } from "framer-motion";
import { RotatingSquare } from "react-loader-spinner";
import { ICurrentDateProps } from "./current-date.interface";
import { useCurrentDate, useHourlyForecast } from "@/hooks";
import { animationFunc } from "@/utils";
import { NoDataBanner } from "../no-data-banner/NoDataBanner";
import { MicrophoneIcon } from "../microphone-icon/MicrophoneIcon";
import { LocationIcon } from "../location-icon/LocationIcon";
import { LocalStorageService } from "@/services";
import { NavigatorPermissionsEnum } from "@/types";

export const CurrentDate: React.FC<ICurrentDateProps> = ({ className }) => {
  const { currentTime, currentDate, currentLocation } = useCurrentDate();
  const { data, isLoading, isFetching } = useHourlyForecast();
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
        <h2 className="text-center text-[36px] font-bold">{currentLocation}</h2>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[30px] md:text-[50px] lg:text-[96px]">
            {currentTime}
          </span>
          <span className="font-normal text-[20px]">{currentDate}</span>
        </div>
      </>
    );
  }
  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center justify-center xl:justify-between min-h-[250px] sm:min-h-0 h-auto p-0 md:p-[20px] sm:p-[40px] 2xl:py-[50px] 2xl:px-[107px] rounded-[30px] bg-[#d9d9d9] dark:bg-[#444] shadow-card_shadow text-[#292929] dark:text-white",
        className
      )}
      initial="hidden"
      variants={animationFunc(true)}
      whileInView="visible"
      viewport={{
        amount: 0.1,
        once: true,
      }}
      custom={1}
      layout
    >
      {LocalStorageService.getItem(NavigatorPermissionsEnum.ALIAS) ===
        NavigatorPermissionsEnum.GRANTED && (
        <LocationIcon className="absolute top-[10px] right-[10px] sm:top-[20px] sm:right-[20px]" />
      )}
      <MicrophoneIcon className="absolute top-[10px] left-[10px] sm:top-[20px] sm:left-[20px]" />
      {renderData}
    </motion.div>
  );
};
