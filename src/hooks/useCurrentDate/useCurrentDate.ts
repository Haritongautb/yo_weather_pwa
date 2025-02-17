import React from "react";
import date from "date-and-time";
import { useCurrentLocation } from "@/store";

export const useCurrentDate = () => {
  const {
    date: initialDate,
    time: initialTime,
    currentLocation,
  } = useCurrentLocation((state) => state);

  const [currentTime, setCurrentTime] = React.useState<string>("");
  const [currentDate, setCurrentDate] = React.useState<string>("");

  React.useEffect(() => {
    let baseDate =
      initialDate && initialTime
        ? new Date(`${initialDate}T${initialTime}`)
        : new Date();
    const intervalID = setInterval(() => {
      const now = new Date();

      baseDate.setMinutes(now.getMinutes(), now.getSeconds());
      setCurrentTime(date.format(baseDate, "HH:mm"));
      setCurrentDate(date.format(baseDate, "dddd, DD MMM"));
    }, 1000);
    return () => clearInterval(intervalID);
  }, [initialDate, initialTime]);

  return {
    currentTime,
    currentDate,
    currentLocation,
  };
};
