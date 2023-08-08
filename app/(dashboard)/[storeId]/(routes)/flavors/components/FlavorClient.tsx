"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FlavorColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface FlavorClientProps {
  data: FlavorColumn[];
}

const FlavorClient = ({ data }: FlavorClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Flavors (${data.length})`}
          description={"Manage flavors for your store"}
        />
        <Button onClick={() => router.push(`/${params.storeId}/flavors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="divider" />

      <DataTable columns={columns} data={data} searchKey={"name"} />
      <Heading title={"API"} description={"API calls for flavors"} />
      <div className="divider" />
      <ApiList entityName={"flavors"} entityIdName={"flavorId"} />
    </>
  );
};

export default FlavorClient;
