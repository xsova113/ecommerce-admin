"use client";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const { storeId } = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${storeId}`;

  return (
    <>
      <ApiAlert
        title={"GET"}
        description={`${baseUrl}/${entityName}`}
        variant={"public"}
      />
      <ApiAlert
        title={"GET"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"public"}
      />
      <ApiAlert
        title={"POST"}
        description={`${baseUrl}/${entityName}`}
        variant={"admin"}
      />
      <ApiAlert
        title={"PATCH"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"admin"}
      />
      <ApiAlert
        title={"DELETE"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"admin"}
      />
    </>
  );
};

export default ApiList;
