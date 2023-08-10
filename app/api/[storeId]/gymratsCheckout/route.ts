import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma/client";
import { Product } from "@prisma/client";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { groupedItems, totalPrice } = await req.json();

  if (!groupedItems) {
    return new NextResponse("Items are required", { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      totalPrice,
      orderedItemsQty: Object.values(groupedItems).reduce(
        (sum: number, items: any) => {
          return sum + items.length;
        },
        0
      ),
      orderItems: {
        create: Object.values(groupedItems).map((items: any) => ({
          product: {
            connect: {
              id: items[0].id,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: Object.values(groupedItems).map((items: Product[] | any) => ({
      quantity: items.length,
      price_data: {
        currency: "CAD",
        product_data: {
          name: items[0].name,
        },
        unit_amount: items[0].price * 100,
      },
    })),
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
