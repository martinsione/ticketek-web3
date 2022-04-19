import type { AppState } from "../../redux/store";

import Web3 from "web3";
import { useSelector } from "react-redux";
import { useState } from "react";
import  { useRouter } from "next/router";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
  Button,
  Modal, 
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

import prisma from "../../lib/prisma";
import { web, userAddress } from "../../components/FunctionalComponents/UserCommands";
import abi from '../../Ticket.json'



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
  const eventInfo = (allInfo as any).find(
    (e: { address: string }) => e.address === data.address
  );

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [trans, setTrans] = useState('La compra se esta procesando')
  const [algo, setAlgo] = useState(true)
  const router = useRouter()

  
   



  const buyTicket = async (address: string, price: number) => {
    let web3 = web
    
    if (window?.ethereum) {
      web3 = new Web3(window.ethereum);
    } 
    const contract = new web3.eth.Contract(abi.abi as any, address);
    
    await contract.methods.safeMint().send({
      from: await userAddress(),
      value: Number(price)*1000000000,
    })
    .on('confirmation', () =>{
      setTrans('transaccion confirmada')

      window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: data.address,
            symbol: data.symbol,
            decimals: 10,
            image: eventInfo.metadata.image
          },
        },
      })

    })
    .on('error', () => { setTrans('error en transacacion')});
    
  }















  return (
    <Container maxW="5xl" py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading color="white">{data.name}</Heading>
          <Text color="gray.500" fontSize="lg">
            {eventInfo ? eventInfo.metadata.description : ""}
          </Text>
          <Stack
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
            spacing={4}
          >
            <Text color="gray.500" fontSize="lg">
              Anda a {eventInfo ? eventInfo.place : ""}
            </Text>
            <Text color="gray.500" fontSize="lg">
              Paga {eventInfo ? Number(eventInfo.price) / 1000000000 : ""} ETH
            </Text>
            <Text color="gray.500" fontSize="lg">
              Dale que quedan {eventInfo ? eventInfo.numberOfTickets : ""}{" "}
              tickets
            </Text>
            <Text color="gray.500" fontSize="lg">
              Estas el {eventInfo ? eventInfo.metadata.date : ""} ?
            </Text>
            <Text color="gray.500" fontSize="lg">
              Es en {eventInfo ? eventInfo.metadata.country : ""}
            </Text>
            <Text color="gray.500" fontSize="lg">
              Y aca {eventInfo ? eventInfo.metadata.location : ""}
            </Text>
          </Stack>
        </Stack>
        <Flex>
          <Image
            alt="feature image"
            objectFit="cover"
            rounded="md"
            src={eventInfo ? eventInfo.metadata.image : ""}
          />
        </Flex>
      </SimpleGrid>
      <Button
        _hover={{ bg: "#5B68DF" }}
        bg="#73E0A9"
        borderRadius="full"
        color="white"
        fontSize="sm"
        onClick={onOpen}
      >
        Buy Ticket
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton/>
              <ModalBody>
               <ModalHeader>
                    Confirmar Compra
                </ModalHeader>
                {algo ? (<p>
                  Event: {data.name}  <br/>
                  Place: {eventInfo.metadata.location}  <br/>  
                  Date {eventInfo.metadata.date} <br/>
                  Price {eventInfo.price / 1000000000} ETH  <br/>
                </p>) : <h1>{trans}</h1>}
              </ModalBody>
            <ModalFooter>
              {algo ? <Button onClick={() => {buyTicket(data.address, eventInfo.price); setAlgo(false)}}>
                Buy
              </Button> :
              <Button  onClick={() => router.push('/about')}>
                  Seguir Explorando
              </Button> }
            </ModalFooter>
        </ModalContent>
      </Modal>
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

export async function getServerSideProps(context: {
  params: { evento: string };
}) {
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

// export async function getStaticPaths() {
//   interface EVENT {
//     address: string;
//   }
//   const data = await prisma.contract.findMany();

//   const paths = data.map((event: EVENT) => ({
//     params: {
//       evento: `${event.address}`,
//     },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }
