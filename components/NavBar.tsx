"use client";

import { Box, HStack, chakra } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import storeSwitcher from "./StoreSwitcher";
import { UserButton, useAuth } from "@clerk/nextjs";
import MainNav from "./MainNav";
import getStores from "@/actions/getUserStore";
import { Store } from "@prisma/client";
import { redirect, useParams, usePathname } from "next/navigation";
import NavSheet from "./NavSheet";
import { routeItems } from "@/lib/constants";
import { ModeToggle } from "./theme-toggle";

const StoreSwitcher = chakra(storeSwitcher);

const NavBar = () => {
  const { userId } = useAuth();
  const [items, setItems] = useState<Store[]>([]);
  const pathname = usePathname();
  const params = useParams();

  const routes = routeItems(params, pathname);

  useEffect(() => {
    if (!userId) {
      redirect("/");
    }
    getStores(userId).then((data) => {
      setItems(data);
    });
  }, [userId]);

  return (
    <chakra.header
      borderBottom={"1px"}
      shadow={"base"}
      className="border-gray-200 dark:border-gray-700"
    >
      <HStack
        bg={"gray.50"}
        alignItems={"center"}
        px={4}
        h={16}
        className="dark:bg-black"
      >
        <StoreSwitcher items={items} className="dark:bg-slate-900" />
        <MainNav routes={routes} />
        <NavSheet routes={routes} />
        <Box ml={"auto"} display={"flex"} alignItems={"center"} gap={4}>
          <UserButton afterSignOutUrl="/" />
        </Box>
        <ModeToggle />
      </HStack>
    </chakra.header>
  );
};

export default NavBar;
