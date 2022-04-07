import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";

export default function Evento({ data }: { data: [] }) {
  return (
    data &&
    data.map(
      ({
        artist,
        price,
        description,
        city,
        date,
        country,
        location,
        imageURL,
        // tickets_available,
        // tickets_left,
      }) => (
        <Container maxW="7xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            py={{ base: 18, md: 24 }}
            spacing={{ base: 8, md: 10 }}
          >
            <Flex>
              <Image
                align="center"
                alt="product image"
                fit="cover"
                h={{ base: "100%", sm: "400px", lg: "500px" }}
                rounded="md"
                src={imageURL}
                w="100%"
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as="header">
                <Heading
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  fontWeight={600}
                  lineHeight={1.1}
                >
                  {artist}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontSize="2xl"
                  fontWeight={300}
                >
                  {price} ETH
                </Text>
              </Box>
              <Stack
                direction="column"
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
                spacing={{ base: 4, sm: 6 }}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize="lg">{description}</Text>
                </VStack>
                <Box>
                  <Text
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight="500"
                    mb="4"
                    textTransform="uppercase"
                  >
                    Event Details
                  </Text>
                  <List spacing={2}>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Location:{" "}
                      </Text>
                      {location}
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Country:{" "}
                      </Text>
                      {country}
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        City:{" "}
                      </Text>
                      {city}
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Date:{" "}
                      </Text>
                      {date}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
              <Button
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                bg={useColorModeValue("gray.900", "gray.50")}
                borderRadius="10px"
                color={useColorModeValue("white", "gray.900")}
                mt={8}
                py="7"
                size="lg"
                textTransform="uppercase"
                w="full"
              >
                Add to cart
              </Button>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="center"
              />
            </Stack>
          </SimpleGrid>
        </Container>
      )
    )
  );
}

export async function getStaticProps(context: { params: { evento: string } }) {
  const { params } = context;
  const { data } = await axios(`/api/events/${params.evento}`);

  if (!data.length) return { notFound: true };

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    id: number;
  }
  const { data } = await axios("/api/events");

  const paths = data.map((event: EVENT) => ({
    params: {
      evento: `${event.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
