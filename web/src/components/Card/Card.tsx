// import { Button, Flex, Image } from '@chakra-ui/react'

// // const arrPrueba: Evento[] = [{ name: "Alejoide" }, { name: "Martincho" }]
// // console.log(arrPrueba[0])
// interface Evento {
//     name: string;
//     image: string
// }

// function Card(evento: Evento) {
//     const { name, image } = evento;
//     return (
//         <Flex align="center" direction="column" height={400} width={300}>
//             <h1>{name}</h1>
//             <Image alt="" borderRadius={15} fit="cover" height="500px" src={image} width="500px" />
//             <Button type="submit">Comprar</Button>
//         </Flex>
//     )
// }

// export default Card

import Link from "next/link";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";

interface Props {
  name: string;
  image: string;
  date: string;
  location: string;
  id: string;
}

export default function Card({ name, image, date, location, id }: Props) {
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
        <Box
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            opacity: "75%",
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
          height="230px"
          mt={-12}
          pos="relative"
          rounded="lg"
        >
          <Link passHref href={`/events/${id}`}>
            <Image
              cursor="pointer"
              height={230}
              objectFit="cover"
              rounded="lg"
              src={image}
              width={282}
            />
          </Link>
        </Box>
        <Stack align="center" pt={10}>
          <Link passHref href={`/events/${id}`}>
            <Heading
              cursor="pointer"
              fontFamily="body"
              fontSize="2xl"
              fontWeight={600}
            >
              {name}
            </Heading>
          </Link>
          <Link passHref href={`/events/${id}`}>
            <Text cursor="pointer">{date}</Text>
          </Link>
          <Link passHref href={`/events/${id}`}>
            <Text cursor="pointer" fontWeight={500}>
              {location}
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
