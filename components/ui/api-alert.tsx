"use client";

import { CopyIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  HStack,
  Icon,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { Server } from "lucide-react";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "public",
  admin: "admin",
};

const variantMap: Record<ApiAlertProps["variant"], string> = {
  public: "gray",
  admin: "red",
};

const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {
  const toast = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast({
      title: "API Route copied to the clipboard.",
      status: "success",
      position: "top",
    });
  };

  return (
    <Alert
      display={"flex"}
      flexDir={"column"}
      alignItems={"start"}
      rounded={"md"}
      bg={"white"}
      border={"1px"}
      borderColor={"gray.300"}
      className="dark:bg-gray-900 dark:border-gray-600"
    >
      <HStack>
        <Icon as={Server} mr={2} />
        <AlertTitle>
          {title}
          <Badge
            ml={2}
            colorScheme={variantMap[variant]}
            rounded={"full"}
            px={2}
          >
            {textMap[variant]}
          </Badge>
        </AlertTitle>
      </HStack>
      <AlertDescription
        mt={3}
        display={"flex"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <chakra.code
          position={"relative"}
          rounded={"base"}
          bg={"gray.100"}
          px={1}
          ml={8}
          fontFamily={"mono"}
          fontSize={"sm"}
          fontWeight={"semibold"}
          className="text-gray-600 dark:bg-gray-600 dark:text-gray-200"
        >
          {description}
        </chakra.code>
        <Button variant={"outline"} size={"sm"} onClick={onCopy}>
          <CopyIcon className="dark:text-white" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
