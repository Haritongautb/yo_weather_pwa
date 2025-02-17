import { showNotificationToast } from "@/components";

type HandleNotification = (args: {
  title: string;
  text: string;
  icon?: string;
  isApproved?: boolean;
}) => void;

export const handleNotificationToast: HandleNotification = async ({
  text,
  isApproved = false,
}) => {
  showNotificationToast({
    title: text,
    isApproved,
  });
};
