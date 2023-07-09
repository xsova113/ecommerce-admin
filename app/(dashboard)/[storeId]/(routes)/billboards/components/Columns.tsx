"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    cell: ({ row }) => (
      <div className="relative w-20 h-20">
        <Image
          src={row.original.imageUrl}
          alt="image"
          fill
          className="object-cover rounded-sm hover:scale-[400%] hover:z-50 transition"
        />
      </div>
    ),
    header: "Image",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
