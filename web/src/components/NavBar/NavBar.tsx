import Link from "next/link";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import LogIn from "./LogIn";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
    <Flex
      bg="#f00"
      bgGradient="linear(to-r, green.200, pink.500)"
      flexDirection="column"
      h={100}
      overflow="hidden"
      position="relative"
      w="100%"
      zIndex={1000}
    >
      <Flex // nav bar
        alignItems="center"
        h={100}
        justifyContent="flex-end"
        w="100%"
      >
        <Flex // Login button container
          alignItems="center"
          borderRadius={10}
          cursor="pointer"
          justifyContent="center"
          marginRight={450}
          padding={1}
        >
          <Link passHref href="/home">
            <Image
              height={20}
              src="https://cdn-icons-png.flaticon.com/512/1614/1614997.png"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </Flex>
        <Link passHref href="/help">
          <Text
            color="white"
            cursor="pointer"
            fontSize={25}
            fontWeight={800}
            marginRight={70}
          >
            Quick Start
          </Text>
        </Link>
        <Link passHref href="/about">
          <Text
            color="white"
            cursor="pointer"
            fontSize={25}
            fontWeight={800}
            marginRight={70}
          >
            About us
          </Text>
        </Link>
        <SearchBar />
        <Box margin="2rem">
          <LogIn />
        </Box>
      </Flex>
    </Flex>
  );
}
export default NavBar;
