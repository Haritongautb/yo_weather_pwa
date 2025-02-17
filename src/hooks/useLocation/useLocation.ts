import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { LocalStorageService } from "@/services";
import { useCurrentLocation } from "@/store";
import { handleNotificationToast, handleGetCurrentPosition } from "@/utils";
import { NavigatorPermissionsEnum } from "@/types";

type UseLocation = () => {
  setAccess: Dispatch<SetStateAction<boolean>>;
  access?: boolean;
};

export const useLocation: UseLocation = () => {
  const [access, setAccess] = React.useState<boolean>(false);
  const { setData } = useCurrentLocation((state) => state);
  React.useEffect(() => {
    if (access) {
      toast.dismiss("locationToast");
      (async () => {
        try {
          const result = await handleGetCurrentPosition();
          handleNotificationToast({
            title: "YO_Weather",
            text: "permission to access your location data is active",
          });
          LocalStorageService.createOrUpdateItem(
            NavigatorPermissionsEnum.ALIAS,
            NavigatorPermissionsEnum.GRANTED
          );
          LocalStorageService.setToLocalStorageCoordinates({
            lat: +result.coords.latitude,
            long: +result.coords.longitude,
          });
          setData({
            lat: +result.coords.latitude,
            long: +result.coords.longitude,
          });
          setAccess(false);
        } catch (error) {
          if (error instanceof GeolocationPositionError) {
            switch (error.code) {
              case 1:
                break;
              case 2:
                handleNotificationToast({
                  title: "YO_Weather",
                  text: "Location information is unavailable.",
                });
                break;
              case 3:
                handleNotificationToast({
                  title: "YO_Weather",
                  text: "The request to get user location timed out.",
                });
                break;
              default:
                handleNotificationToast({
                  title: "YO_Weather",
                  text: "An unknown error occurred.",
                });
                break;
            }
          } else {
            handleNotificationToast({
              title: "YO_Weather",
              text: `An unexpected error occurred: ${error}`,
            });
          }
          LocalStorageService.createOrUpdateItem(
            NavigatorPermissionsEnum.ALIAS,
            NavigatorPermissionsEnum.DENIED
          );

          setAccess(false);
        }
      })();
    } else {
      return;
    }
  }, [access]);

  return {
    access,
    setAccess,
  };
};
