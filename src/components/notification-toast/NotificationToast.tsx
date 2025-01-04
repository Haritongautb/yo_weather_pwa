"use client";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import cn from "clsx";
import {
  IShowNotificationProps,
  IShowNotificationToastProps,
} from "./notification-toast.interface";
import { Button } from "../button/Button";

const CustomNotificationToast: React.FC<IShowNotificationToastProps> = ({
  toastID,
  title,
  isApproved,
}) => {
  return (
    <div
      className="relative text-center items-center cursor-pointer p-[20px] 
                 bg-yellow-400 dark:bg-yellow-700 
                 text-black dark:text-white 
                 rounded-lg shadow-lg"
      onClick={() => {
        return toast.dismiss(toastID);
      }}
    >
      <IoMdCloseCircleOutline
        className="absolute top-[5px] sm:top-0 right-[5px] sm:right-0"
        size={30}
      />
      <p
        className={cn("text-[18px] font-semibold", {
          ["mb-[10px]"]: isApproved,
        })}
      >
        {title}
      </p>
      {isApproved && (
        <div>
          <Button
            className="px-6 py-3 text-white font-semibold rounded-md 
                       bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                       hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-red-600
                       shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.location.reload()}
          >
            Refresh this page
          </Button>
        </div>
      )}
    </div>
  );
};

export const showNotificationToast = ({
  title,
  duration = Infinity,
  isApproved = false,
}: IShowNotificationProps) =>
  toast.custom(
    (id) => (
      <CustomNotificationToast
        toastID={id}
        title={title}
        isApproved={isApproved}
      />
    ),
    {
      id: duration !== Infinity ? undefined : "handleNotificationToast",
      position: "top-center",
      duration: duration,
      onDismiss: (t) => t.id,
    }
  );
