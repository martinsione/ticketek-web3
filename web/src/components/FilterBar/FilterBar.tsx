import React from "react";
import { Stack } from "@chakra-ui/react";

interface CHILDREN {
  children: React.ReactNode;
}
export default function FilterBar({ children }: CHILDREN) {
  return (
    <Stack
      alignItems="baseline"
      direction="row"
      gap="2rem"
      h={50}
      justify="space-around"
      m="auto"
      maxW="876px"
      mt="0.5rem"
    >
      {children}
    </Stack>
  );
}
