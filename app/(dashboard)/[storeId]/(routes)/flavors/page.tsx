import { prisma } from "@/prisma/client";
import { FlavorColumn } from "./components/Columns";
import { format } from "date-fns";
import FlavorClient from "./components/FlavorClient";

const FlavorsPage = async ({ params }: { params: { flavorId: string } }) => {
  const flavors = await prisma.flavor.findMany({
    where: {
      storeId: params.flavorId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFlavors: FlavorColumn[] = flavors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FlavorClient data={formattedFlavors} />
      </div>
    </div>
  );
};

export default FlavorsPage;
