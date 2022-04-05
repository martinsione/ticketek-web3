import Link from "next/link";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

import LogIn from "./LogIn";
import SearchBar from "../SearchBar/SearchBar";

interface NAVBAR {
  long: boolean;
}

function NavBar({ long }: NAVBAR) {
  return long ? (
    <Flex
      bg="#f00"
      bgGradient="linear(to-r, green.200, pink.500)"
      flexDirection="column"
      h={600}
      overflow="hidden"
      position="relative"
      w="100%"
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
          <LogIn />
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
      </Flex>
      <Box // container of "more than tickets"
        bg="rgb(167, 138, 173)"
        borderRadius={100}
        bottom="0"
        h={400}
        left="0"
        marginBottom={50}
        marginLeft={50}
        overflow="hidden"
        position="absolute"
        w={800}
      >
        <Box>
          <Text // text "more than tickets"
            color="white"
            fontSize={40}
            fontWeight={800}
            marginLeft={90}
            marginTop={30}
          >
            More than just tickets.
          </Text>
          <Text color="white" fontSize={20} fontWeight={600} marginLeft={90}>
            Purchase your NFT ticket today, hold it forever
          </Text>
        </Box>
        <Image bottom={0} position="absolute" src="/wave.svg" />
      </Box>
      <Image // svg of people cheering
        alt="crowd3"
        bottom={-320}
        position="absolute"
        right={0}
        src="/crowd3.svg"
        w={800}
      />
      <Image // second svg of people cheering
        alt="crowd2"
        bottom={-350}
        position="absolute"
        right={800}
        src="/crowd2.svg"
        w={300}
      />
    </Flex>
  ) : (
    <Flex
      bg="#f00"
      bgGradient="linear(to-r, green.200, pink.500)"
      flexDirection="column"
      h={100}
      overflow="hidden"
      position="relative"
      w="100%"
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
          <LogIn />
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
      </Flex>
    </Flex>
  );
}
export default NavBar;
