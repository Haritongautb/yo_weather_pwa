import React from "react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { LocalStorageService } from "@/services";
import { useCurrentLocation } from "@/store";
const libraries: Libraries = ["places"];
export const useSearchCurrentLocation = () => {
  const inputRef = React.useRef<google.maps.places.SearchBox | null>(null);

  const { lat, long, setData } = useCurrentLocation((state) => state);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
    language: "en",
    region: "US",
  });

  const inputElementRef = React.useRef<HTMLInputElement | null>(null);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleOnPlacesChanged();
      }
    },
    [lat, long]
  );

  const handleOnPlacesChanged = React.useCallback(() => {
    const address = inputRef.current?.getPlaces();
    if (address && address[0]?.geometry?.location) {
      const latitude = address[0].geometry.location.lat();
      const longitude = address[0].geometry.location.lng();

      if (latitude !== lat || longitude !== long) {
        LocalStorageService.setToLocalStorageCoordinates({
          lat: latitude,
          long: longitude,
        });
        setData({
          lat: latitude,
          long: longitude,
        });
      }
    }
  }, [lat, long]);

  return {
    handleKeyDown,
    inputRef,
    isLoaded,
    inputElementRef,
    handleOnPlacesChanged,
  };
};
