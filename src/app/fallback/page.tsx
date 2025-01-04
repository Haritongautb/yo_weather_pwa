"use client";
import React from "react";
import Link from "next/link";
import { NoDataBanner } from "@/components";
import { BiConfused } from "react-icons/bi";
import { useOnline } from "@/hooks";
export const dynamic = "force-static";
const OfflineFallback: React.FC = () => {
  const { isOnline } = useOnline();

  console.log("fallback Page", navigator?.onLine);
  return (
    <NoDataBanner
      title={isOnline ? "Why are you on this page? You're online" : "Offline"}
      Icon={BiConfused}
      isOnline={isOnline}
    >
      <Link
        href="/"
        className="p-[10px] mb-[40px] cursor-pointer bg-[#4cbb17] rounded-[20px]"
      >
        Return to Homepage
      </Link>
      {!isOnline && (
        <div className="flex item-center justify-center text-center">
          The connection is lost, check your internet connection
        </div>
      )}
    </NoDataBanner>
  );
};

export default OfflineFallback;
