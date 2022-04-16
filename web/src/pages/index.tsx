import Link from "next/link";
import axios from "axios";
import { Button, Image, Stack, Text } from "@chakra-ui/react";

export default function Home() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Stack
      alignItems="center"
      bg="#011F26"
      direction="row"
      display="flex"
      h="83vh"
      justifyContent="space-between"
      maxW="1276px"
      mx="auto"
    >
      <Stack spacing="2rem">
        <Stack color="white" spacing="0">
          <Text fontSize="58px" fontWeight="bold">
            More than just tickets.
          </Text>
          <Text fontSize="28px">
            Purchase your NFT ticket today, hold it forever
          </Text>
        </Stack>
        <Stack direction="row" spacing="2rem">
          <Link passHref href="/home">
            <Button
              _hover={{ bg: "transparent" }}
              backgroundColor="transparent"
              className="border-gradient"
              color="white"
              fontSize="20px"
              fontWeight="semibold"
              height="4rem"
              px="3rem"
              rounded="full"
            >
              Explore
            </Button>
          </Link>
          <Link passHref href="/help">
            <Button
              _active={{ bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)" }}
              _hover={{
                bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)",
                opacity: "0.85",
              }}
              backgroundColor="transparent"
              bgGradient="linear(to-r, #73E0A9 0%, #5B68DF 100%)"
              color="white"
              fontSize="20px"
              fontWeight="semibold"
              height="4rem"
              px="3rem"
              rounded="full"
            >
              Quick Start
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Stack align="center" justify="center">
        <Stack
          bg="#03A688"
          borderRadius="full"
          h="560px"
          position="relative"
          style={{ filter: "blur(500px)" }}
          w="560px"
        />
        <Image position="absolute" src="/images/cards-landing.png" />
      </Stack>
    </Stack>
  );
}
