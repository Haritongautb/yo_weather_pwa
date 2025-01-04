"use client";
import React from "react";
import cn from "clsx";
import { useRouter } from "next/navigation";
import { RiRestartLine } from "react-icons/ri";
import { IResetBtnProps } from "./reset-btn.interface";

import { Button } from "../button/Button";
import { useCurrentLocation } from "@/store";
import { LocalStorageService } from "@/services";

export const ResetBtn: React.FC<IResetBtnProps> = () => {
  const { removeAllValues } = useCurrentLocation((state) => state);
  const { refresh } = useRouter();
  const handleClick = () => {
    LocalStorageService.removeAllFromLocalStorage();
    removeAllValues();
    refresh();
  };

  return (
    <Button
      className={cn(
        "block w-full h-[65px] 2xl:py-[14px] px-[25px] mt-5 rounded-[40px] shadow-current_location_btn_shadow transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-white text-black font-extrabold text-[18px]"
      )}
      onClick={handleClick}
      style={{
        background: "linear-gradient(135deg, #6366f1, #818cf8)",
        color: "#fff",
      }}
    >
      <div className="flex items-center justify-center gap-[12px] md:gap-[5px] xl:gap-[12px]">
        <RiRestartLine className="w-[35px] h-[35px]" />
        <span>Reset</span>
      </div>
    </Button>
  );
};
