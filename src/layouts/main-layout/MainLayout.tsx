"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { IMainLayoutProps } from "./main-layout.interface";
import { FMHeader, FMMain } from "@/partials";
import {
  CurrentLocationBtn,
  DarkMode,
  FMNoDataBanner,
  MicrophoneBtn,
  Modal,
  ResetBtn,
  Search,
} from "@/components";
import { useCurrentLocation, useIsDarkModeStore } from "@/store";
import { animationFunc } from "@/utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  className,
  ...rest
}) => {
  const isDarkMode = useIsDarkModeStore((state) => state.isDarkMode);
  const { currentLocation, lat, long } = useCurrentLocation((state) => state);
  React.useEffect(() => {
    if (typeof window !== undefined) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={className} {...rest}>
        <AnimatePresence>
          <LayoutGroup>
            {!long || !lat ? (
              <>
                <FMHeader
                  initial="hidden"
                  variants={animationFunc()}
                  whileInView="visible"
                  viewport={{
                    amount: 0.1,
                    once: true,
                  }}
                  custom={2}
                >
                  <div className="flex flex-col w-full sm:w-[290px]">
                    <DarkMode />
                    <MicrophoneBtn />
                  </div>
                  <Search />

                  <div className="flex flex-col w-full sm:w-[290px]">
                    <CurrentLocationBtn />
                    {currentLocation && <ResetBtn />}
                  </div>
                </FMHeader>
                <FMNoDataBanner
                  key="noDataBanner"
                  initial="hidden"
                  variants={animationFunc(true)}
                  whileInView="visible"
                  viewport={{
                    amount: 0.1,
                    once: true,
                  }}
                  custom={2}
                  exit="hidden"
                  title="Specify the location"
                />
              </>
            ) : (
              <FMMain
                key="main"
                initial="hidden"
                variants={animationFunc(true, "beforeChildren")}
                whileInView="visible"
                viewport={{
                  amount: 0.1,
                  once: true,
                }}
                exit="hidden"
                custom={2}
              >
                {children}
              </FMMain>
            )}
          </LayoutGroup>
        </AnimatePresence>
        <Toaster />
        <Modal />
      </div>
    </QueryClientProvider>
  );
};
