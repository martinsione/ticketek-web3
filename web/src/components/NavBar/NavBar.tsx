import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";
import LogIn from "./LogIn";
const NavBar = () => {
  return (
    <Flex
      bg="#f00"
      h={600}
      w="100%"
      bgGradient="linear(to-r, green.200, pink.500)"
      overflow={"hidden"}
      position="relative"
      flexDirection={"column"}
    >
      <Flex //nav bar
        w={"100%"}
        h={100}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Flex // Login button container
          cursor="pointer"
          alignItems={"center"}
          justifyContent="center"
          borderRadius={10}
          padding={1}
          marginRight={450}
        >
          <LogIn />
        </Flex>
        <Link href="/help" passHref>
          <Text
            fontSize={25}
            fontWeight={800}
            color="white"
            cursor="pointer"
            marginRight={70}
          >
            Help
          </Text>
        </Link>
        <Link href="/about" passHref>
          <Text
            fontSize={25}
            fontWeight={800}
            color="white"
            cursor="pointer"
            marginRight={70}
          >
            About us
          </Text>
        </Link>
        <SearchBar />
      </Flex>
      <Box //container of "more than tickets"
        w={800}
        h={400}
        position="absolute"
        left="0"
        bottom="0"
        marginLeft={50}
        marginBottom={50}
        borderRadius={100}
        overflow="hidden"
        bg="rgb(167, 138, 173)"
      >
        <Box>
          <Text // text "more than tickets"
            fontSize={40}
            fontWeight={800}
            color="white"
            marginLeft={90}
            marginTop={30}
          >
            More than just tickets.
          </Text>
          <Text marginLeft={90} fontSize={20} color="white" fontWeight={600}>
            Purchase your NFT ticket today, hold it forever
          </Text>
        </Box>
        <Image src={"/wave.svg"} position="absolute" bottom={0} />
      </Box>
      <Image //svg of people cheering
        src="/crowd3.svg"
        alt="crowd3"
        position={"absolute"}
        right={0}
        bottom={-320}
        w={800}
      />
      <Image // second svg of people cheering
        src="/crowd2.svg"
        alt="crowd2"
        position={"absolute"}
        right={800}
        bottom={-350}
        w={300}
      />
    </Flex>
  );
};
export default NavBar;
