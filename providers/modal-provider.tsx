"use client";

import StoreModal from "@/components/modals/store-modal";

import { useEffect, useState } from "react";

///// to prevent server and client side hydration error and out of sync /////
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
