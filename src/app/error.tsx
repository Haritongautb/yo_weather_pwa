"use client";

import { NoDataBanner } from "@/components";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 rounded-[30px]">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
      <NoDataBanner title={error.message} className="text-lg mt-4 text-red-500">
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-[20px]"
          onClick={() => reset()}
        >
          Try again
        </button>
      </NoDataBanner>
    </div>
  );
}
