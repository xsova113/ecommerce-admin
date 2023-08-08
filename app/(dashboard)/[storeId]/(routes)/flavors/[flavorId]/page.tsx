import { prisma } from "@/prisma/client";
import FlavorForm from "./components/flavor-form";

const FlavorPage = async ({ params }: { params: { flavorId: string } }) => {
  const flavor = await prisma.flavor.findUnique({
    where: {
      id: params.flavorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FlavorForm initialData={flavor} />
      </div>
    </div>
  );
};

export default FlavorPage;
