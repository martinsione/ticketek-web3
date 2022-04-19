import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import Link from "next/link";
import {
  chakra,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";

import Logo from "../Logo/Logo";

function SocialButton({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <chakra.button
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      alignItems="center"
      as="a"
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      cursor="pointer"
      display="inline-flex"
      h={8}
      href={href}
      justifyContent="center"
      rounded="full"
      transition="background 0.3s ease"
      w={8}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}

export default function Footer() {
  return (
    <Stack bg="#0001" bottom="0" color="#fff" h="10vh" justify="center">
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        maxW="1276px"
        mx="auto"
        spacing={8}
        w="full"
      >
        <Stack align="center" direction="row" >
          <Stack>
            <Link passHref href="/home">
              <Icon as={Logo} cursor="pointer" height="50px" width="50px" />
            </Link>
          </Stack>
          <Stack fontSize="14px" px="10px" width="450px">
            <Text fontWeight="thin">The first non-fungible token(NFT) marketplace for buying event tickets. © 2022 NFTicket Group. All rights reserved</Text>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={6}>
        <Link href="/about">
            <a>
              <Stack
                alignItems="center"
                color="white"
                direction="row"
                spacing={6}
              >
                <Text>About</Text>
              </Stack>
            </a>
          </Link>
          <SocialButton href="#" label="Twitter">
            <FaTwitter />
          </SocialButton>
          <SocialButton href="#" label="YouTube">
            <FaYoutube />
          </SocialButton>
          <SocialButton href="#" label="Instagram">
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Stack>
    </Stack >
  );
}
