"use server";

import { prisma } from "@/prisma/client";

export default async function getStores(userId: string) {
  try {
    const stores = await prisma.store.findMany({
      where: {
        userId,
      },
    });
    return stores;
  } catch (error: any) {
    return error.message;
  }
}
