import React from "react";
import { Flex } from "@chakra-ui/react";

interface CHILDREN {
  children: React.ReactNode;
}
export default function FilterBar({ children }: CHILDREN) {
  return (
    <div>
      <Flex
        alignItems="center"
        bg="gray.200"
        direction="row"
        h={50}
        justifyContent="end"
      >
        {children}
      </Flex>
    </div>
  );
}
