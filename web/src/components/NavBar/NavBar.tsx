import { BsSearch } from "react-icons/bs";
import NextLink from "next/link";
import {
  Stack,
  Text,
  // Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import LogIn from "./LogIn";
import SearchBar from "../SearchBar/SearchBar";
// import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <Stack bg="#0001" h="7vh" justify="center">
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        maxW="1276px"
        mx="auto"
        spacing={8}
        w="full"
      >
        <NextLink href="/">
          <a>
            <Stack color="white" direction="row" fontSize="36px" spacing={0}>
              <Text fontSize="36px" fontWeight="extrabold" lineHeight={0}>
                NFT
              </Text>
              <Text fontSize="30px" fontWeight="thin" lineHeight={0}>
                ICKET
              </Text>
            </Stack>
          </a>
        </NextLink>
        <InputGroup className="border-gradient sm" color="#fff" maxW="460px">
          {/* <Input
            _placeholder={{ color: "#fff" }}
            border="none"
            borderRadius="full"
            m="0"
            outline="none"
            placeholder="Search..."
            px="4"
            py="2"
          /> */}
          <SearchBar />
          <InputRightElement>
            <BsSearch />
          </InputRightElement>
        </InputGroup>
        <Stack alignItems="center" direction="row" spacing={8}>
          <NextLink href="/home">
            <a>
              <Stack
                alignItems="center"
                color="white"
                direction="row"
                spacing={6}
              >
                <Text>Explore</Text>
              </Stack>
            </a>
          </NextLink>
          <LogIn />
        </Stack>
      </Stack>
    </Stack>
  );
}
