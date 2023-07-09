import NavBar from "@/components/NavBar";
import { prisma } from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLyaout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
