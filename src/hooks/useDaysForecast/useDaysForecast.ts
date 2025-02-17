import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DaysForecastService,
  LocalStorageEnum,
  LocalStorageService,
} from "@/services";
import {
  ICurrentWeather,
  useCurrentLocation,
  useCurrentWeather,
  useDaysWeather,
} from "@/store";
import { IDaysForecastCardProps } from "@/components/days-forecast-card/days-forecast-card";
import { windDirections } from "@/utils";

export const useDaysForecast = () => {
  const { currentLocation, lat, long } = useCurrentLocation((state) => state);
  const { setData, setIsLoading } = useCurrentWeather();
  const { setData: setDaysWeather } = useDaysWeather();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["days forecast weather", lat, long],
    queryFn: () => DaysForecastService.getDaysForecast(lat, long),
    select: (response) => {
      if (!Array.isArray(response)) {
        const filteredData: IDaysForecastCardProps[] =
          response?.data.forecast.forecastday.length !== 8
            ? response?.data.forecast.forecastday.map((item: any) => ({
                id: item.date,
                date: item.date,
                img: item.day.condition.icon,
                current_weather_icon: item.day.condition.icon,
                current_temp: item.day.maxtemp_c,
                feels_like: item.day.avgtemp_c,
                temperature: item.day.mintemp_c,
                current_weather_text: item.day.condition.text,
                sunrise: item.astro.sunrise,
                sunset: item.astro.sunset,
                humidity: item.day.avghumidity,
                wind_speed: item.day.maxwind_kph,
                pressure: item.hour[0].pressure_mb,
                UV: item.day.uv,
                hours: [
                  ...item.hour.map((hourItem: any) => ({
                    time: hourItem.time.split(" ")[1],
                    img: hourItem.condition.icon,
                    temperature: hourItem.temp_c,
                    wind_speed: hourItem.wind_kph,
                    windDirectionSrc: windDirections(hourItem.wind_degree),
                  })),
                ],
                location: response.data.location.name,
              }))
            : response?.data.forecast.forecastday
                .filter(
                  (_: unknown, index: number, array: any) =>
                    index !== 0 && index !== array.length - 1
                )
                .map((item: any) => ({
                  id: item.date,
                  date: item.date,
                  img: item.day.condition.icon,
                  temperature: item.day.maxtemp_c,
                  current_weather_text: item.day.condition.text,
                  sunrise: item.astro.sunrise,
                  sunset: item.astro.sunset,
                  humidity: item.day.avghumidity,
                  wind_speed: item.day.maxwind_kph,
                  hours: [
                    ...item.hour.map((hourItem: any) => ({
                      time: hourItem.time.split(" ")[1],
                      img: hourItem.condition.icon,
                      temperature: hourItem.temp_c,
                      wind_speed: hourItem.wind_kph,
                      windDirectionSrc: windDirections(hourItem.wind_degree),
                    })),
                  ],
                  location: response.data.location.name,
                }));
        const currentWeather = {
          current_weather_text:
            (response?.data.current.condition.text as string) ?? "",
          current_weather_icon:
            (response?.data.current.condition.icon as string) ?? "",
          current_temp: (response?.data.current.temp_c as number) ?? null,
          feels_like: (response?.data.current.feelslike_c as number) ?? null,
          sunrise:
            (response?.data.forecast.forecastday[0].astro.sunrise as string) ??
            "",
          sunset:
            (response?.data.forecast.forecastday[0].astro.sunset as string) ??
            "",
          humidity: (response?.data.current.humidity as number) ?? null,
          wind_speed: (response?.data.current.wind_kph as number) ?? null,
          pressure: (response?.data.current.pressure_mb as number) ?? null,
          UV: (response?.data.current.uv as number) ?? 0,
        };

        LocalStorageService.setPlaces({
          icon: currentWeather.current_weather_icon,
          weather: currentWeather.current_weather_text,
          lat: lat,
          long: long,
          location_name: currentLocation,
          temperature: currentWeather.current_temp,
          date: response.data.location.localtime.split(" ")[0],
        });

        return {
          currentData: currentWeather,
          days_forecast: filteredData,
        };
      }
      return { currentData: {}, days_forecast: [] };
    },
    enabled: !!lat || !!long,
  });

  React.useEffect(() => {
    if (data?.currentData) {
      setData(data.currentData as ICurrentWeather);
    }
  }, [data]);

  React.useEffect(() => {
    if (data?.days_forecast) {
      setDaysWeather(data.days_forecast);
    }
  }, [data]);
  React.useEffect(() => {
    setIsLoading("isFetching", isFetching);
  }, [isFetching]);

  React.useEffect(() => {
    setIsLoading("isLoading", isLoading);
  }, [isLoading]);

  return {
    data,
    isFetching,
    isLoading,
    error,
  };
};
