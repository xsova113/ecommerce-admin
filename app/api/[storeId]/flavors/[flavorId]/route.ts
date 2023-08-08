import { prisma } from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { flavorId: string } }
) {
  try {
    if (!params.flavorId) {
      return new NextResponse("Flavor ID is required", { status: 400 });
    }

    const flavor = await prisma.flavor.findUnique({
      where: {
        id: params.flavorId,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; flavorId: string } }
) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.flavorId) {
      return new NextResponse("Flavor ID is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const flavor = await prisma.flavor.updateMany({
      where: {
        id: params.flavorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; flavorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.flavorId) {
      return new NextResponse("Flavor ID is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const flavor = await prisma.flavor.deleteMany({
      where: {
        id: params.flavorId,
      },
    });

    return NextResponse.json(flavor);
  } catch (error) {
    console.log("[FLAVOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
