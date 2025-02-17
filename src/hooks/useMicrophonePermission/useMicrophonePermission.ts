"use client";
import { handleNotificationToast } from "@/utils";
import React from "react";

export enum MicrophonePermissionEnum {
  GRANTED = "granted",
  DENIED = "denied",
  PROMPT = "prompt",
}

export const useMicrophonePermissions = () => {
  const [status, setStatus] = React.useState<MicrophonePermissionEnum | null>(
    null
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      checkMicrophonePermission();
    }
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const permissionStatus = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });

        setStatus(permissionStatus.state as MicrophonePermissionEnum);

        permissionStatus.onchange = () => {
          const newStatus = permissionStatus.state as MicrophonePermissionEnum;
          setStatus(newStatus);

          if (newStatus === MicrophonePermissionEnum.GRANTED) {
            handleNotificationToast({
              title: "YO_WEATHER",
              text: "Microphone access granted.",
            });
          } else if (newStatus === MicrophonePermissionEnum.DENIED) {
            handleNotificationToast({
              title: "YO_WEATHER",
              text: "Microphone access denied.",
            });
          }
        };
      } else {
        await requestMicrophoneAccess();
      }
    } catch (error) {
      console.error("Error checking microphone permissions:", error);
    }
  };

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      stream.getTracks().forEach((track) => track.stop());
      setStatus(MicrophonePermissionEnum.GRANTED);
      handleNotificationToast({
        title: "YO_WEATHER",
        text: "Microphone access granted.",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && error.name;

      if (errorMessage === "NotAllowedError") {
        setStatus(MicrophonePermissionEnum.DENIED);
        handleNotificationToast({
          title: "YO_WEATHER",
          text: "Microphone access denied by the user.",
        });
      } else if (errorMessage === "NotFoundError") {
        setStatus(MicrophonePermissionEnum.DENIED);
        handleNotificationToast({
          title: "YO_WEATHER",
          text: "No microphone found.",
        });
      } else {
        setStatus(MicrophonePermissionEnum.DENIED);
        handleNotificationToast({
          title: "YO_WEATHER",
          text: `Error accessing microphone: ${error}`,
        });
      }
    }
  };

  return {
    status,
    setStatus,
  };
};
