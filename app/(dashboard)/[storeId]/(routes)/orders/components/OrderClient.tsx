"use client";

import Heading from "@/components/ui/Heading";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";

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
      <div className="divider" />
      <DataTable columns={columns} data={data} searchKey={"products"} />
    </>
  );
};

export default OrderClient;
