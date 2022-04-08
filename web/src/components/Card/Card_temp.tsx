import Link from "next/link";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Props {
  address: string;
  city: string;
  name: string;
  symbol: string;
}

export default function Card({ address, city, name, symbol }: Props) {
  return (
    <Center margin={30} py={12}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        maxW="330px"
        p={6}
        pos="relative"
        role="group"
        rounded="lg"
        w="full"
        zIndex={1}
      >
        <Stack align="center" pt={10}>
          <Heading
            cursor="pointer"
            fontFamily="body"
            fontSize="2xl"
            fontWeight={200}
          >
            {name}
          </Heading>

          <Link passHref href={`/cities/${city}`}>
            <Text cursor="pointer">{city}</Text>
          </Link>
          <Link passHref href={`/events/${address}`}>
            <Text fontSize="xs" fontWeight={500}>
              {address}
            </Text>
          </Link>

          <Stack align="center" direction="row">
            <Button marginTop={3} variant="ghost">
              Get Ticket
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
