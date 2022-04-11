import { IoWalletOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import NextLink from "next/link";
import {
  Stack,
  Text,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import LogIn from "./LogIn";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <Stack bg="rgba(1, 31, 38, 0.2)" p={5}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        maxW="1276px"
        mx="auto"
        spacing={8}
        w="full"
      >
        <Stack alignItems="start" direction="row" fontSize="36px" spacing={0}>
          <Text fontWeight="extrabold" lineHeight={0}>
            NFT
          </Text>
          <Text fontWeight="thin" lineHeight={0}>
            icket
          </Text>
        </Stack>
        <InputGroup className="border-gradient sm" color="#fff" maxW="460px">
          <Input
            _placeholder={{ color: "#fff" }}
            border="none"
            borderRadius="full"
            m="0"
            outline="none"
            placeholder="Search..."
            px="4"
            py="2"
          />
          <InputRightElement>
            <BsSearch />
          </InputRightElement>
        </InputGroup>
        <Stack alignItems="center" color="white" direction="row" spacing={6}>
          <Text>Explore</Text>
          <Stack className="border-gradient" px="5" py="2">
            <Text>Account</Text>
          </Stack>

          <Stack
            alignItems="center"
            bgGradient="linear(to-r, #73E0A9 0%, #5B68DF 100%)"
            borderRadius="full"
            color="white"
            direction="row"
            px="5"
            py="2"
            spacing={2}
          >
            <Icon as={IoWalletOutline} />
            <Text whiteSpace="nowrap">Connect Wallet</Text>
          </Stack>
        </Stack>
        <LogIn />
      </Stack>
    </Stack>
  );
}
