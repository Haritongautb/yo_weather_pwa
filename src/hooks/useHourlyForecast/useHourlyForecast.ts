import React from "react";
import { HourlyForecast } from "@/services";
import { useCurrentLocation } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useHourlyForecast = () => {
  const { lat, long } = useCurrentLocation((state) => state);
  const { setData } = useCurrentLocation((state) => state);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["get hourly forecast", lat, long],
    queryFn: () => HourlyForecast.getHourlyForecast(lat, long),
    select: (response) => {
      if (!Array.isArray(response)) {
        return {
          localTime: response.data.location.localtime.split(" ")[1] || "",
          localDate: response.data.location.localtime.split(" ")[0] || "",
          hourly_forecast: response.data.forecast.forecastday[0].hour,
          location_name: response.data.location.name || [],
          lat: response.data.location.lat,
          long: response.data.location.lon,
        };
      }
    },
    enabled: !!lat || !!long,
  });

  React.useEffect(() => {
    if (data && data.localTime && data.localDate && data.location_name) {
      setData({
        time: data.localTime,
        date: data.localDate,
      });
      setData({
        currentLocation: data.location_name,
      });
    } else {
      return;
    }
  }, [data]);

  return {
    data: data?.hourly_forecast,
    isLoading,
    isFetching,
  };
};
