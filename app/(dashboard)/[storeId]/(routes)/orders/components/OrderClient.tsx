"use client";

import Heading from "@/components/ui/Heading";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description={"Manage order for your store"}
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"products"} />
    </>
  );
};

export default OrderClient;
