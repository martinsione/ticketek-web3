import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { Stack, Text, Image, Button, IconButton } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  address: string;
  name: string;
  date: string;
  image: string;
  price: number;
  location: string;
  place: string;
}

export default function Card({
  address,
  name,
  date,
  image,
  price,
  location,
  place,
}: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <Stack
      bg="white"
      borderRadius="3xl"
      position="relative"
      role="group"
      w="fit-content"
    >
      <Image
        alt={name}
        borderRadius="3xl"
        h="300px"
        objectFit="cover"
        src={image}
        w="300px"
      />
      <Stack pb={7} pt={4} px={5}>
        <Stack
          alignItems="center"
          color="blackAlpha.700"
          direction="row"
          fontSize="14px"
          fontWeight={500}
          justifyContent="space-between"
        >
          <Text>{location}</Text>
          <Text>{place}</Text>
          <Text>{date}</Text>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          fontSize="16px"
          fontWeight="bold"
          justifyContent="space-between"
        >
          <Text>{name}</Text>
          <Text letterSpacing={0} m={0} p={0} whiteSpace="nowrap">
            {price} ETH
          </Text>
        </Stack>
      </Stack>
      <Stack
        _groupHover={{ opacity: 1 }}
        alignItems="center"
        bottom="-15px"
        direction="row"
        justifyContent="center"
        opacity={0}
        position="absolute"
        spacing={6}
        transition="ease-in"
        transitionDuration="200ms"
        w="full"
        zIndex={9999}
      >
        <Link passHref href={`/events/${address}`}>
        <Button
          _hover={{ bg: "#5B68DF" }}
          bg="#73E0A9"
          borderRadius="full"
          color="white"
          fontSize="sm"
          >
          Buy Ticket
        </Button>
        </Link>
        <IconButton
          aria-label="Toggle favorite"
          borderRadius="full"
          colorScheme="gray"
          fontSize="xl"
          icon={<AiFillHeart fill={liked ? "red" : "gray"} />}
          onClick={() => setLiked(!liked)}
        />
      </Stack>
    </Stack>
  );
}
