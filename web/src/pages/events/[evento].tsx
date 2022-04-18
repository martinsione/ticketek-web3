import type { AppState } from "../../redux/store";

import { useSelector } from "react-redux";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import prisma from "../../lib/prisma";

interface DATA {
  data: {
    address: string;
    name: string;
    symbol: string;
  };
}

/* export default function Evento({ data }: DATA) {
  const allInfo = useSelector((state: AppState) => state.events);
  const eventInfo = allInfo.find((e: {address: string}) => e.address === data.address); 
  
  return (
    data && (
      <Flex align="center" direction="column" color='fff'>
        <div>{data.address}</div>
        <div>{data.name}</div>
        <div>{data.symbol}</div>
        <div>{eventInfo.place}</div>
        <div>{eventInfo.price}</div>
        <div>{eventInfo.numberOfTickets}</div>
        <div>{eventInfo.metadata.description}</div>
        <div>{eventInfo.metadata.date}</div>
        <div>{eventInfo.metadata.country}</div>
        <div>{eventInfo.metadata.location}</div>
        <img src={eventInfo.metadata.image} alt="No image" />
        
        


      </Flex>
    )
  ); */
  export default function Evento({ data }: DATA) {
    const allInfo = useSelector((state: AppState) => state.events);
    const eventInfo = allInfo.find((e: {address: string}) => e.address === data.address); 
    {console.log(eventInfo)}
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            
            <Heading>{data.name}</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
            {/* eventInfo.metadata.description */}
            Algo
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Text color={'gray.500'} fontSize={'lg'}>Anda a {/* eventInfo.place */}</Text>
              <Text color={'gray.500'} fontSize={'lg'}>Paga {/* eventInfo.price */}</Text>
              <Text color={'gray.500'} fontSize={'lg'}>Dale que quedan {/* eventInfo.numberOfTickets */}</Text>
              <Text color={'gray.500'} fontSize={'lg'}>Estas el {/* eventInfo.metadata.date */}</Text>
              <Text color={'gray.500'} fontSize={'lg'}>Es en {/* eventInfo.metadata.country */}</Text>
              <Text color={'gray.500'} fontSize={'lg'}>Y aca {/* eventInfo.metadata.location */}</Text>
              
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={eventInfo.metadata.image}
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    );
  }

  // return (
  //   data &&
  //   data.map(
  //     ({
  //       artist,
  //       price,
  //       description,
  //       city,
  //       date,
  //       country,
  //       location,
  //       imageURL,
  //       // tickets_available,
  //       // tickets_left,
  //     }) => (
  //       <Container maxW="7xl">
  //         <SimpleGrid
  //           columns={{ base: 1, lg: 2 }}
  //           py={{ base: 18, md: 24 }}
  //           spacing={{ base: 8, md: 10 }}
  //         >
  //           <Flex>
  //             <Image
  //               align="center"
  //               alt="product image"
  //               fit="cover"
  //               h={{ base: "100%", sm: "400px", lg: "500px" }}
  //               rounded="md"
  //               src={imageURL}
  //               w="100%"
  //             />
  //           </Flex>
  //           <Stack spacing={{ base: 6, md: 10 }}>
  //             <Box as="header">
  //               <Heading
  //                 fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
  //                 fontWeight={600}
  //                 lineHeight={1.1}
  //               >
  //                 {artist}
  //               </Heading>
  //               <Text
  //                 color={useColorModeValue("gray.900", "gray.400")}
  //                 fontSize="2xl"
  //                 fontWeight={300}
  //               >
  //                 {price} ETH
  //               </Text>
  //             </Box>
  //             <Stack
  //               direction="column"
  //               divider={
  //                 <StackDivider
  //                   borderColor={useColorModeValue("gray.200", "gray.600")}
  //                 />
  //               }
  //               spacing={{ base: 4, sm: 6 }}
  //             >
  //               <VStack spacing={{ base: 4, sm: 6 }}>
  //                 <Text fontSize="lg">{description}</Text>
  //               </VStack>
  //               <Box>
  //                 <Text
  //                   color={useColorModeValue("yellow.500", "yellow.300")}
  //                   fontSize={{ base: "16px", lg: "18px" }}
  //                   fontWeight="500"
  //                   mb="4"
  //                   textTransform="uppercase"
  //                 >
  //                   Event Details
  //                 </Text>
  //                 <List spacing={2}>
  //                   <ListItem>
  //                     <Text as="span" fontWeight="bold">
  //                       Location:{" "}
  //                     </Text>
  //                     {location}
  //                   </ListItem>
  //                   <ListItem>
  //                     <Text as="span" fontWeight="bold">
  //                       Country:{" "}
  //                     </Text>
  //                     {country}
  //                   </ListItem>
  //                   <ListItem>
  //                     <Text as="span" fontWeight="bold">
  //                       City:{" "}
  //                     </Text>
  //                     {city}
  //                   </ListItem>
  //                   <ListItem>
  //                     <Text as="span" fontWeight="bold">
  //                       Date:{" "}
  //                     </Text>
  //                     {date}
  //                   </ListItem>
  //                 </List>
  //               </Box>
  //             </Stack>
  //             <Button
  //               _hover={{
  //                 transform: "translateY(2px)",
  //                 boxShadow: "lg",
  //               }}
  //               bg={useColorModeValue("gray.900", "gray.50")}
  //               borderRadius="10px"
  //               color={useColorModeValue("white", "gray.900")}
  //               mt={8}
  //               py="7"
  //               size="lg"
  //               textTransform="uppercase"
  //               w="full"
  //             >
  //               Add to cart
  //             </Button>
  //             <Stack
  //               alignItems="center"
  //               direction="row"
  //               justifyContent="center"
  //             />
  //           </Stack>
  //         </SimpleGrid>
  //       </Container>
  //     )
  //   )
  // );


export async function getStaticProps(context: { params: { evento: string } }) {
  //   const { data } = await axios(
  //     `http://localhost:3000/api/events/${params.evento}`
  //   );

  //   if (!data) return { notFound: true };

  //   return {
  //     props: {
  //       data,
  //     },
  //   };
  const { params } = context;
  const data = await prisma.contract.findUnique({
    where: {
      address: params.evento,
    },
  });
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    address: string;
  }
  const data = await prisma.contract.findMany();

  const paths = data.map((event: EVENT) => ({
    params: {
      evento: `${event.address}`,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}
