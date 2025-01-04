"use client";
import React from "react";
import cn from "clsx";
import { IDarkModeProps } from "./dark-mode.interface";
import { Button } from "../button/Button";
import { useIsDarkModeStore } from "@/store";
import { LayoutGroup, motion } from "framer-motion";
import { animationFunc } from "@/utils";

export const DarkMode: React.FC<IDarkModeProps> = ({ ...rest }) => {
  const { isDarkMode, toggleDarkMode } = useIsDarkModeStore((state) => state);

  return (
    <Button
      className={cn(
        "w-full h-[65px] font-extrabold text-[18px] p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      )}
      onClick={toggleDarkMode}
      {...rest}
    >
      <LayoutGroup>
        {isDarkMode ? (
          <motion.div
            key="lightMode"
            initial="hidden"
            variants={animationFunc(true)}
            animate="visible"
            custom={1}
            exit="hidden"
            className="flex gap-[10px] items-center justify-center "
          >
            <span className="text-gray-800">🌞</span>
            <span className="text-white">Light Mode</span>
          </motion.div>
        ) : (
          <motion.div
            className="flex gap-[10px] items-center justify-center "
            key="darkMode"
            initial="hidden"
            variants={animationFunc(true)}
            animate="visible"
            custom={1}
            exit="hidden"
          >
            <span className="text-yellow-400">🌜</span>
            <span className="text-black">Dark Mode</span>
          </motion.div>
        )}
      </LayoutGroup>
    </Button>
  );
};
