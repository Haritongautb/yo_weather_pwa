import { useMediaQuery } from "react-responsive";

export const useMedia = (customMedia: string = "(min-width: 640px)") => {
  const isDesktop = useMediaQuery({
    query: customMedia,
  });

  return {
    isDesktop,
  };
};
