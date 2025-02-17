"use client";
import React from "react";
import cn from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PiMicrophoneSlashFill } from "react-icons/pi";
import { FaMicrophone } from "react-icons/fa6";
import { animationFunc } from "@/utils";
import { useIsDarkModeStore } from "@/store";
import { MicrophonePermissionEnum, useMicrophonePermissions } from "@/hooks";
import { IMicrophoneIconProps } from "./microphone-icon.interface";

export const MicrophoneIcon: React.FC<IMicrophoneIconProps> = ({
  className,
}) => {
  const { isDarkMode } = useIsDarkModeStore((state) => state);
  const { status } = useMicrophonePermissions();
  return (
    <div
      className={cn("p-[10px] rounded-full", className, {
        ["bg-[#443b3b]"]: isDarkMode,
        ["bg-[#383838]"]: !isDarkMode,
      })}
    >
      <AnimatePresence>
        <LayoutGroup>
          {status === MicrophonePermissionEnum.GRANTED ? (
            <motion.div
              key="microOn"
              initial="hidden"
              variants={animationFunc(true)}
              animate="visible"
              custom={1}
              exit="hidden"
            >
              <FaMicrophone size={30} className="text-[#FFD700]" />
            </motion.div>
          ) : (
            <motion.div
              key="microOff"
              initial="hidden"
              variants={animationFunc(true)}
              animate="visible"
              custom={1}
              exit="hidden"
            >
              <PiMicrophoneSlashFill size={30} className="text-[#FFD700]" />
            </motion.div>
          )}
        </LayoutGroup>
      </AnimatePresence>
    </div>
  );
};
