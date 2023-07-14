"use client";

import { Box, Text, Heading as H } from "@chakra-ui/react";
import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <Box>
      <H as={"h2"} size={"xl"} fontWeight={"bold"} letterSpacing={"tight"}>
        {title}
      </H>
      <Text as={"p"} fontSize={"sm"} color={"gray.600"}>
        {description}
      </Text>
    </Box>
  );
};

export default Heading;
