"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`BillBoards (${data.length})`}
          description={"Manage billboard for your store"}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="divider" />
      
      <DataTable columns={columns} data={data} searchKey={"label"} />
      <Heading title={"API"} description={"API calls for billboards"} />
      <div className="divider" />
      <ApiList entityName={"billboards"} entityIdName={"billboardId"} />
    </>
  );
};

export default BillboardClient;
