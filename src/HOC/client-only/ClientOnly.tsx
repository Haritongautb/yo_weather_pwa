"use client";
import React from "react";
import { useLocation, useMicrophonePermissions, useOnline } from "@/hooks";
import "../../app/styles/globals.css";

export const ClientOnly: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rendered, setIsRendered] = React.useState<boolean>(false);
  const { setAccess } = useLocation();

  useMicrophonePermissions();
  useOnline();
  React.useEffect(() => {
    setIsRendered(true);
  }, []);

  React.useEffect(() => {
    if (rendered) {
      setAccess(true);
    }
  }, [rendered]);

  if (rendered) {
    return <>{children}</>;
  }
  return null;
};
