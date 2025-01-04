"use client";
import React from "react";
import cn from "clsx";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useLocation, useMedia } from "@/hooks";
import { Button } from "../button/Button";
import { useCurrentLocation } from "@/store";
import { LocalStorageService } from "@/services";
import { NavigatorPermissionsEnum } from "@/types";
import { handleNotificationToast } from "@/utils";

export const CurrentLocationBtn: React.FC = () => {
  const { isDesktop: isNotDesktop } = useMedia("min-width: 1024px");
  const { lat, long } = useCurrentLocation((state) => state);
  const { setAccess } = useLocation();

  const handleClick = () => {
    if (
      LocalStorageService.getItem(NavigatorPermissionsEnum.ALIAS) &&
      LocalStorageService.getItem(NavigatorPermissionsEnum.ALIAS) !==
        NavigatorPermissionsEnum.GRANTED
    ) {
      handleNotificationToast({
        title: "YO_Weather",
        text: "Enable access to your geolocation",
      });
      return;
    }
    setAccess(true);
  };

  return (
    <Button
      className={cn(
        "block w-full h-[65px] 2xl:py-[14px] px-[25px] rounded-[40px] shadow-current_location_btn_shadow transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-white text-black font-extrabold text-[18px]",
        {
          ["animate-bounce"]: !lat || !long,
          [isNotDesktop ? "active:animate-none" : "hover:animate-none"]:
            !lat || !long,
        }
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-[12px] md:gap-[5px] xl:gap-[12px]">
        <FaLocationCrosshairs className="w-[35px] h-[35px]" />
        <span>Current Location</span>
      </div>
    </Button>
  );
};
