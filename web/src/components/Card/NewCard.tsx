import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { Stack, Text, Image, IconButton } from "@chakra-ui/react";

import { IState } from "../../redux/reducer";
import { addFav, deleteFav } from "../../redux/actions";

export interface EventInfo {
  address: string;
  name: string;
  date: string;
  image: string;
  price: number;
  location: string;
  place: string;
}

export default function Card(props: EventInfo) {
  const {
    address,
    name,
    date,
    image,
    price,
    location,
    place,
  } = props
  const [liked, setLiked] = useState(false);
  const ethValue = 1000000000000000000;
  const dispatch = useDispatch()
  const {favs} = useSelector((state: IState) => state)
  const favCard = favs.find( event => event.address === address)
  const handleFav = ()=>{
      setLiked(!liked)
      if(liked) dispatch(deleteFav(address))
      if(!liked) dispatch(addFav(props))
  }

  return (
    <Link passHref href={`/events/${address}`}>
      <Stack w="300px">
        <Stack
          _hover={{
            transform: "scale(1.25)",
            shadow: "lg",
            transitionDuration: "200ms",
            zIndex: 9999,
          }}
          bg="white"
          borderRadius="3xl"
          maxW="300px"
          overflow="hidden"
          position="absolute"
          role="group"
        >
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
            display="none"
            transitionDuration="200ms"
            w="full"
          >
            <IconButton
              aria-label="Toggle favorite"
              borderRadius="full"
              colorScheme="gray"
              fontSize="xl"
              icon={<AiFillHeart fill={favCard ? "red" : "gray"} />}
              position="absolute"
              right="15px"
              top="15px"
              onClick={handleFav}
            />
            
            <Stack bg="white" pb={7} pt={4} px={5}>
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
                  {price/ethValue} ETH
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
}
