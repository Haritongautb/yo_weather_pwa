"use client";
import React from "react";
import cn from "clsx";
import { FaPlayCircle } from "react-icons/fa";
import { CiStop1 } from "react-icons/ci";
import { RiRestartFill } from "react-icons/ri";
import { IModalProps } from "./modal.interface";
import { AnimatePresence, motion } from "framer-motion";
import { animationFunc } from "@/utils";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useModal } from "@/hooks";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const Modal: React.FC<IModalProps> = ({ className, ...rest }) => {
  const {
    handleClose,
    stopRecognition,
    startRecognition,
    setSelectedLanguage,
    enhancedHandleOnPlacesChanged,
    inputElementRef,
    inputRef,
    selectedLanguage,
    setLocation,
    isListening,
    isLoaded,
    isOpen,
    location,
  } = useModal();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains("modal")) {
              handleClose();
            }
            return;
          }}
          initial="hidden"
          variants={animationFunc(true)}
          animate="visible"
          custom={1}
          exit="hidden"
        >
          <div
            className={cn(
              "relative w-[250px] sm:w-[300px] min-h-[450px] flex flex-col justify-between pt-[50px] p-[10px] sm:pt-[60px] sm:p-[30px] text-black bg-white shadow-lg rounded-lg space-y-4 z-50",
              className
            )}
            {...rest}
          >
            <button
              className="absolute top-[10px] right-[10px]"
              onClick={() => {
                handleClose();
              }}
            >
              <IoMdCloseCircleOutline size={30} />
            </button>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en-US">English (US)</option>
              <option value="pl-PL">Polish (Poland)</option>
              <option value="ru-RU">Russian</option>
            </select>
            <div className="mt-4">
              {isLoaded && (
                <StandaloneSearchBox
                  onLoad={(ref) => (inputRef.current = ref)}
                  onPlacesChanged={enhancedHandleOnPlacesChanged}
                >
                  <input
                    type="text"
                    ref={inputElementRef}
                    className="block w-full h-auto mb-[10px] p-3 bg-gray-100 border border-gray-300 rounded shadow-inner"
                    placeholder="Location"
                    disabled={!location}
                  />
                </StandaloneSearchBox>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Detected Speech:
              </h3>
              <p className="block w-full h-auto mb-[10px] p-3 bg-gray-100 border border-gray-300 rounded shadow-inner">
                {location || "Your spoken text will appear here."}
              </p>

              <button
                onClick={() => {
                  if (inputElementRef.current) {
                    inputElementRef.current.value = "";
                  }
                  setLocation("");
                }}
                className={cn(
                  "flex items-center justify-center gap-[10px] w-full p-3 bg-blue-500 text-white rounded",
                  {
                    "opacity-50 cursor-not-allowed": !location,
                  }
                )}
                disabled={!location}
              >
                <span>Reset</span>
                <RiRestartFill size={25} />
              </button>
            </div>

            <div className="flex gap-[10px] justify-between items-center">
              <button
                onClick={startRecognition}
                className={cn("w-1/2 p-3 bg-blue-500 text-white rounded", {
                  "opacity-50 cursor-not-allowed": isListening,
                })}
                disabled={isListening}
              >
                {isListening ? (
                  "Listening..."
                ) : (
                  <div className="flex item-center justify-around">
                    <span>Start</span>
                    <FaPlayCircle size={25} />
                  </div>
                )}
              </button>

              <button
                onClick={() => {
                  stopRecognition();
                }}
                className={cn(
                  "flex justify-around items-center w-1/2 p-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200",
                  {
                    "opacity-50 cursor-not-allowed": !isListening,
                  }
                )}
                disabled={!isListening}
              >
                <span>Stop</span>
                <CiStop1 size={25} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
