"use client";

import { Center } from "@chakra-ui/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Center h={"full"}>{children}</Center>;
}
