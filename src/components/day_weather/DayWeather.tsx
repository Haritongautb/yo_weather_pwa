"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDaysWeather } from "@/store";
import { Button } from "../button/Button";
import { CurrentWeather } from "../current-weather/CurrentWeather";
import { HourlyForecast } from "../hourly-forecast/HourlyForecast";

export const DayWeather: React.FC<{ day: string }> = ({ day }) => {
  const data = useDaysWeather((state) =>
    state.days_forecast?.find((item) => item.id === day)
  );
  const { push } = useRouter();

  React.useEffect(() => {
    if (!day || !data) {
      return push("/");
    }
  }, []);

  return (
    <div>
      <Button
        className="w-full h-[65px] mt-5 mb-[20px] font-extrabold text-[18px] p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors dark:text-white text-black"
        onClick={() => push("/")}
      >
        Return to home page
      </Button>
      <div className="flex flex-col gap-[20px] items-center justify-center mb-[20px] text-[20px] font-bold text-center">
        <h2 className="text-[30px] text-yellow-500">{data?.location}</h2>
        <div>
          <span className="text-yellow-400 font-semibold">
            Weather forecast for{" "}
          </span>
          <span className="text-yellow-500 font-bold ml-1"> {data?.date}</span>
        </div>
      </div>
      <CurrentWeather
        className="mb-[20px]"
        isLoading={false}
        isFetching={false}
        data={data ? data : null}
      />
      <HourlyForecast
        isFetching={false}
        isLoading={false}
        data={data ? data.hours : null}
      />
    </div>
  );
};
