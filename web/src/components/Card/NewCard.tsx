/* eslint-disable import/no-cycle */
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
  const ethValue = 1000000000;
  const dispatch = useDispatch()
  const {favs} = useSelector((state: IState) => state)
  const favCard = favs.find( event => event.address === address)
  const handleFav = ()=>{
      setLiked(!liked)
      if(favCard){
        dispatch(deleteFav(address))}
      if(!favCard) {
        dispatch(addFav(props))}
  }

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
          icon={<AiFillHeart fill={favCard ? "red" : "gray"} />}
          position="absolute"
          right="15px"
          top="15px"
          onClick={handleFav}
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
                <Text letterSpacing={0} m={0} p={0} whiteSpace="nowrap">
                  {price / ethValue} ETH
                </Text>
              </Stack>
            </Stack>
          </a>
        </Link>
      </Stack>
    </Stack>
  );
}
