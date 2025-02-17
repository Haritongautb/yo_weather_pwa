"use client";
import React from "react";
import cn from "clsx";
import { useMicrophone } from "@/store";
import { MicrophonePermissionEnum, useMicrophonePermissions } from "@/hooks";
import { handleNotificationToast } from "@/utils";
import { Button } from "../button/Button";

export const MicrophoneBtn: React.FC = () => {
  const { setIsOpen } = useMicrophone((state) => state);
  const { status } = useMicrophonePermissions();

  const handleMicrophone = () => {
    if (status === MicrophonePermissionEnum.DENIED) {
      handleNotificationToast({
        title: "YO_WEATHER",
        text: "Please allow access to your microphone",
      });
      return;
    }
    setIsOpen(true);
  };
  return (
    <Button
      className={cn(
        "w-full h-[65px] mt-5 font-extrabold text-[18px] p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors dark:text-white text-black"
      )}
      onClick={handleMicrophone}
    >
      Speak location
    </Button>
  );
};
