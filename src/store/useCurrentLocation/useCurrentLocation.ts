import { LocalStorageService } from "@/services";
import { getCurrentDateAndTime } from "@/utils";
import { create } from "zustand";
interface ICurrentLocation {
  currentLocation: string;
  lat: number;
  long: number;
  time: string;
  date: string;
  removeAllValues: () => void;
  setData: (data: {
    lat?: number;
    long?: number;
    currentLocation?: string;
    time?: string;
    date?: string;
  }) => void;
}
export const useCurrentLocation = create<ICurrentLocation>((set) => {
  const data = LocalStorageService.getFromLocalStorage();
  const { time: initialTime, date: initialDate } = getCurrentDateAndTime();
  return {
    currentLocation: data?.place || "",
    lat: data?.lat || 0,
    long: data?.long || 0,
    time: initialTime,
    date: initialDate,
    setData: (data) => set((state) => ({ ...state, ...data })),
    removeAllValues: () =>
      set({
        currentLocation: "",
        lat: 0,
        long: 0,
      }),
  };
});
