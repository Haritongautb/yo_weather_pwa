import { create } from "zustand";

interface IUseMicrophone {
  isOpen: boolean;
  setIsOpen: (active: boolean) => void;
}
export const useMicrophone = create<IUseMicrophone>((set) => ({
  isOpen: false,
  setIsOpen: (active) => set({ isOpen: active }),
}));
