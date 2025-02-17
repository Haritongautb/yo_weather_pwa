import { create } from "zustand";

interface IIsDarkModeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
export const useIsDarkModeStore = create<IIsDarkModeStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
}));
