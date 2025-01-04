"use client";
import React from "react";
import cn from "clsx";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { FaSearchLocation } from "react-icons/fa";
import { ISearchProps } from "./search.interface";
import { useCurrentLocation, useIsDarkModeStore } from "@/store";
import { useSearchCurrentLocation } from "@/hooks";

export const Search: React.FC<ISearchProps> = () => {
  const isDarkMode = useIsDarkModeStore((state) => state.isDarkMode);

  const {
    handleKeyDown,
    isLoaded,
    inputRef,
    inputElementRef,
    handleOnPlacesChanged,
  } = useSearchCurrentLocation();
  const { lat, long } = useCurrentLocation((state) => state);

  return (
    <form
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full xl:w-[803px] rounded-[40px] py-[10px] pl-[80px] border-solid border-[1px] order-last md:order-none",
        {
          ["shadow-search_dark_mode_shadow bg-[#444] border-transparent"]:
            isDarkMode,
          ["shadow-search_light_mode_shadow bg-[#d9d9d9] border-black "]:
            !isDarkMode,
          ["animate-bounce"]: !lat || !long,
          ["hover:animate-none"]: !lat || !long,
        }
      )}
    >
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <input
            type="text"
            placeholder="Your city"
            ref={inputElementRef}
            className={cn(
              "block w-full font-normal text-[18px] bg-transparent px-[10px] placeholder:opacity-60 outline-none",
              {
                ["text-white"]: isDarkMode,
                ["placeholder:text-[#292929] text-black"]: !isDarkMode,
              }
            )}
          />
        </StandaloneSearchBox>
      )}
      <FaSearchLocation className="absolute top-1/2 transform translate-y-[-50%] left-[15px] sm:left-[33px] w-[40px] h-[46px]" />
    </form>
  );
};
