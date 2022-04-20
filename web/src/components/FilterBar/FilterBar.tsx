import React from "react";
import { Button, Link, Stack } from "@chakra-ui/react";

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
      <Link href="/home">
        <Button
          _hover={{ bg: "transparent" }}
          bg="#38665B"
          border="2px"
          borderColor="#38665B"
          borderRadius="30"
          color="white"
        >
          Reset
        </Button>
      </Link>
    </Stack>
  );
}
