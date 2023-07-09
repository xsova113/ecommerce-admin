import { prisma } from "@/prisma/client";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await prisma.store.findFirst({
    where: { id: params.storeId },
  });

  return <div>This is your active store: {store?.name}</div>;
};

export default DashboardPage;
