"use client";

interface SettingspageProps {
  params: {
    storeId: string;
  };
}

import getItem from "@/actions/getItem";
import { Box, chakra } from "@chakra-ui/react";
import { useAuth } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import settingsForm from "./components/SettingsForm";

const Settingspage = ({ params }: SettingspageProps) => {
  const { userId } = useAuth();
  const [store, setStore] = useState<Store>();
  const SettingsForm = chakra(settingsForm);

  if (!userId) {
    redirect("/sign-in");
  }

  useEffect(() => {
    getItem(params.storeId, userId)
      .then((data) => {
        if (!data) return;
        // @ts-ignore
        setStore(data);
      })
      .catch((error) => console.log(error));
  }, [params.storeId, userId]);

  return (
    <Box>
      <Box flex={1} display={"flex"} p={8} pt={6} gap={4}>
        <SettingsForm
          // @ts-ignore
          initialData={store}
        />
      </Box>
    </Box>
  );
};

export default Settingspage;
