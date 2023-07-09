import { prisma } from "@/prisma/client";
import OrderClient from "./components/OrderClient";
import { OrderColumn } from "./components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    isPaid: item.isPaid,
    address: item.address,
    products: item.orderItems.map((item) => item.product.name).join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce(
        (total, item) => total + Number(item.product.price),
        0
      )
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default OrdersPage;
