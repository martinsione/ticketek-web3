import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { Stack, Text, Image, IconButton } from "@chakra-ui/react";

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
    <Stack w="300px">
      <Stack
        _hover={{
          position: "absolute",
          transform: "scale(1.25)",
          transitionDuration: "300ms",
          zIndex: 1,
        }}
        bg="white"
        borderRadius="3xl"
        maxW="300px"
        overflow="hidden"
        position="relative"
        role="group"
      >
        <IconButton
          _groupHover={{ display: "flex" }}
          aria-label="Toggle favorite"
          borderRadius="full"
          colorScheme="gray"
          display="none"
          fontSize="xl"
          icon={<AiFillHeart fill={liked ? "red" : "gray"} />}
          position="absolute"
          right="15px"
          top="15px"
          onClick={() => setLiked(!liked)}
        />
        <Link passHref href={`/events/${address}`}>
          <a>
            <Image
              alt={name}
              borderRadius="3xl"
              h="300px"
              objectFit="cover"
              src={image}
              w="300px"
            />
            <Stack
              _groupHover={{ display: "flex" }}
              bg="white"
              display="none"
              position="relative"
              px={5}
              py={5}
              transitionDuration="200ms"
            >
              <Stack
                alignItems="start"
                color="blackAlpha.700"
                direction="row"
                fontSize="12px"
                fontWeight={500}
                justifyContent="space-between"
              >
                <Text>
                  {location}, {place}
                </Text>
                <Text whiteSpace="nowrap">{date}</Text>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                fontSize="14px"
                fontWeight="bold"
                justifyContent="space-between"
              >
                <Text>{name}</Text>
                <Text whiteSpace="nowrap">{price} ETH</Text>
              </Stack>
            </Stack>
          </a>
        </Link>
      </Stack>
    </Stack>
  );
}
