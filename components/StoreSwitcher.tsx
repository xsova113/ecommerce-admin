"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import { CheckIcon, UpDownIcon } from "@chakra-ui/icons";
import {
  VStack,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Input,
  Text,
  HStack,
  Icon,
  MenuGroup,
  MenuDivider,
  Tooltip,
} from "@chakra-ui/react";
import { Store } from "@prisma/client";
import { PlusSquareIcon, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

interface StoreSwitcherProps {
  className?: string;
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    router.push(`/${store.value}`);
  };

  const filteredStore =
    query === ""
      ? formattedItems
      : formattedItems.filter((store) =>
          store.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <VStack className={cn("", className)}>
      <Menu>
        <MenuButton
          bg={"gray.200"}
          py="2"
          px={4}
          rounded={"md"}
          fontWeight={"semibold"}
          w={225}
          bgColor={"white"}
          border={"1px solid"}
          borderColor={"gray.200"}
          className={cn("dark:border-gray-700", className)}
          _hover={{ bg: "gray.100" }}
        >
          <HStack className={cn("", className)}>
            <Icon as={StoreIcon} boxSize={5} />
            <Text noOfLines={1}>{currentStore?.label}</Text>
            <UpDownIcon ml={"auto"} opacity={"50%"} boxSize={4} />
          </HStack>
        </MenuButton>
        <MenuList title="Stores" className="dark:bg-black dark:border-gray-700">
          <Input
            ml={3}
            w={"90%"}
            border={"none"}
            focusBorderColor="none"
            placeholder="Search store..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <MenuDivider />
          <MenuGroup title="Stores">
            {filteredStore.length === 0 && query !== "" ? (
              <Text py={2} px={4} textColor={"gray.700"}>
                Nothing found.
              </Text>
            ) : (
              filteredStore.map((store) => (
                <MenuItem
                  key={store.value}
                  value={store.label}
                  onClick={() => onStoreSelect(store)}
                >
                  <Icon as={StoreIcon} mr={2} />
                  <Tooltip label={store.label}>
                    <Text noOfLines={1} w={150}>
                      {store.label}
                    </Text>
                  </Tooltip>
                  <CheckIcon
                    ml={"auto"}
                    boxSize={3}
                    opacity={store.value === currentStore?.value ? 100 : 0}
                    className={className}
                  />
                </MenuItem>
              ))
            )}
          </MenuGroup>

          <MenuDivider />
          <MenuGroup>
            <MenuItem onClick={storeModal.onOpen} gap={2}>
              <PlusSquareIcon size={20} />
              Create Store
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </VStack>
  );
};

export default StoreSwitcher;
