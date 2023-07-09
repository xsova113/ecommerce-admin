"use server";

import { prisma } from "@/prisma/client";

export default async function (storeId: string, userId: string) {
  try {
    const data = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!data) return null;
    return data;
  } catch (error) {
    return "Failed to get store item";
  }
}
