"use client";
import React from "react";
import Image from "next/image";
import { FaTemperatureHigh } from "react-icons/fa";
import { LocalStorageEnum, LocalStorageService } from "@/services";
import { IOfflineCard } from "./offline-cards.interface";
import { useCurrentLocation } from "@/store";
import { NoDataBanner } from "../no-data-banner/NoDataBanner";

export const OfflineCards = () => {
  const current_location = useCurrentLocation((state) => state.currentLocation);
  const [data, setData] = React.useState<IOfflineCard[] | []>(() => {
    return LocalStorageService.getItem(LocalStorageEnum.PLACES)
      ? JSON.parse(LocalStorageService.getItem(LocalStorageEnum.PLACES) ?? "[]")
      : [];
  });

  React.useEffect(() => {
    if (LocalStorageService.getItem(LocalStorageEnum.PLACES)) {
      setData(() => {
        return JSON.parse(
          LocalStorageService.getItem(LocalStorageEnum.PLACES) ?? "[]"
        );
      });
    }
  }, [current_location]);

  return (
    <div>
      <h3 className="mb-[30px] font-semibold text-[40px] text-center">
        Previous searches
      </h3>
      <div className="flex flex-col gap-[20px]">
        {!!data.length ? (
          data.map((item) => (
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-[5px] w-full p-[10px] border-[3px] text-black border-white bg-white rounded-lg shadow-md"
              key={item.location_name}
            >
              <div className="flex flex-col sm:flex-row items-center gap-[10px] h-full">
                <div className="font-semibold text-[20px]">
                  Weather forecast for:
                </div>
                <span className="font-semibold text-[15px] underline">
                  {item.date}
                </span>
              </div>
              <span className="font-semibold text-[24px]">
                {item.location_name}
              </span>
              <Image
                src={`https:${item.icon}`}
                alt={`icon ${item.weather}`}
                width={50}
                height={50}
                unoptimized
              />

              <div className="flex gap-[10px]">
                <span className="font-semibold text-[24px]">
                  {item.temperature}
                </span>
                <FaTemperatureHigh className="w-[32px] h-[32px]" />
              </div>
              <span className="font-semibold text-[24px]">{item.weather}</span>
            </div>
          ))
        ) : (
          <>
            <NoDataBanner>
              <div className="text-[#dc2626] text-center font-bold text-[20px]">
                Please checkout your internet connection
              </div>
            </NoDataBanner>
          </>
        )}
      </div>
    </div>
  );
};
