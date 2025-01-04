import React from "react";
import { useRouter } from "next/navigation";

import { handleNotificationToast } from "@/utils";

export const useOnline = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return navigator.onLine;
    }
    return false;
  });
  const { push } = useRouter();

  const handleNetwork = React.useCallback(() => {
    if (!navigator.onLine) {
      handleNotificationToast({
        title: "YO_WEATHER",
        text: "You're offline. Check your network",
      });
      push("/fallback");
      setIsOnline(false);
    } else {
      push("/");
      setIsOnline(true);
    }
  }, [push]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (!navigator.onLine) {
        handleNotificationToast({
          title: "YO_WEATHER",
          text: "You're offline. Check your network",
        });
      }

      window.addEventListener("online", handleNetwork);
      window.addEventListener("offline", handleNetwork);
    }
    return () => {
      window.removeEventListener("online", handleNetwork);
      window.removeEventListener("offline", handleNetwork);
    };
  }, []);
  return {
    isOnline,
    setIsOnline,
  };
};
