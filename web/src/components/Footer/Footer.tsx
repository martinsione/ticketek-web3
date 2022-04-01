import { Flex, Text, Image, Box } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Flex
      bg="#f00"
      bgGradient="linear(to-r, green.200, pink.500)"
      flexDirection="column"
      h={600}
      overflow="hidden"
      position="relative"
      w="100%"
    >
      <Flex // Login button container
        alignItems="center"
        borderRadius={10}
        cursor="pointer"
        justifyContent="center"
        marginRight={450}
        padding={1}
        marginLeft={50}
      >
        <Link passHref href="/help">
          <Text
            color="white"
            cursor="pointer"
            fontSize={25}
            fontWeight={800}
            marginRight={70}
          >
            Help
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
      </Flex>
    </Flex>
  );
}
