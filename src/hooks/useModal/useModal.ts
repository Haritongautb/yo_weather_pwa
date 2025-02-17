import React from "react";
import { handleNotificationToast } from "@/utils";
import { useSearchCurrentLocation } from "../useSearchLocation/useSearchCurrentLocation";
import { useMicrophone } from "@/store";
export const useModal = () => {
  const { isOpen, setIsOpen } = useMicrophone((state) => state);
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<string>("en-US");
  const [isListening, setIsListening] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>("");
  const [recognitionInstance, setRecognitionInstance] =
    React.useState<any>(null);
  const { isLoaded, inputRef, inputElementRef, handleOnPlacesChanged } =
    useSearchCurrentLocation();

  React.useEffect(() => {
    if ("body" in document) {
      if (isOpen) {
        document.body.classList.add("block");
      } else {
        document.body.classList.remove("block");
      }
    }

    return () => document.body.classList.remove("block");
  }, [isOpen]);

  const handleFind = React.useCallback(() => {
    if (inputElementRef.current && inputRef.current) {
      inputElementRef.current.value = location;
      inputElementRef.current.focus();
      handleOnPlacesChanged();
    }
  }, [location]);

  React.useEffect(() => {
    if (location) {
      handleFind();
    }
  }, [location]);

  const startRecognition = React.useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      handleNotificationToast({
        title: "YO_WEATHER",
        text: "Speech Recognition API is not supported in your browser",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setLocation(spokenText);
    };
    recognition.onerror = (event: any) => {
      const errorType = event.error;

      let errorMessage = "An error occurred while accessing the microphone.";

      if (errorType === "not-allowed") {
        errorMessage =
          "Microphone access was denied. Please allow access to continue.";
      } else if (errorType === "no-speech") {
        errorMessage = "No speech detected. Please try again.";
      } else if (errorType === "audio-capture") {
        errorMessage = "No microphone detected. Please connect a microphone.";
      }

      handleNotificationToast({
        title: "YO_WEATHER",
        text: errorMessage,
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognitionInstance(recognition);
    recognition.start();
  }, [selectedLanguage]);

  const stopRecognition = React.useCallback(() => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsListening(false);
    }
  }, [recognitionInstance]);

  const handleReset = React.useCallback(() => {
    if (inputElementRef.current) {
      inputElementRef.current.value = "";
    }
    setLocation("");
    setIsListening(false);
  }, []);

  const handleClose = React.useCallback(() => {
    handleReset();
    setIsOpen(false);
  }, []);

  const enhancedHandleOnPlacesChanged = React.useCallback(() => {
    handleOnPlacesChanged();
    if (inputRef.current?.getPlaces()?.length) {
      handleClose();
    }
  }, []);
  return {
    handleFind,
    handleClose,
    stopRecognition,
    startRecognition,
    setSelectedLanguage,
    enhancedHandleOnPlacesChanged,
    setLocation,
    selectedLanguage,
    inputElementRef,
    inputRef,
    location,
    isListening,
    isLoaded,
    isOpen,
  };
};
