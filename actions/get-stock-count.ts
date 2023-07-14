import { prisma } from "@/prisma/client";

export const getStockCount = async (storeId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true
    },
  });

  const stockCount = orders.reduce((sum, item) => {
    return sum + item.orderedItemsQty;
  }, 0);

  return 1000 - stockCount;
};
