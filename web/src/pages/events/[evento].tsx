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
} from '@chakra-ui/react';

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
        tickets_available,
        tickets_left,
      }) => (
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
              <Image
                rounded={'md'}
                alt={'product image'}
                src={
                  imageURL
                }
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                  {artist}
                </Heading>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={300}
                  fontSize={'2xl'}>
                  {price} ETH
                </Text>
              </Box>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  />
                }>
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={'lg'}>
                    {description}
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                    Event Details
                  </Text>
                  <List spacing={2}>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Location:{" "}
                      </Text>
                      {location}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Country:{" "}
                      </Text>
                      {country}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        City:{" "}
                      </Text>
                      {city}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Date:{" "}
                      </Text>
                      {date}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
              <Button
                borderRadius="10px"
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('gray.900', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}>
                Add to cart
              </Button>
              <Stack direction="row" alignItems="center" justifyContent={'center'}>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      )
    )
  );
}

export async function getStaticProps(context: { params: { evento: string } }) {
  const { params } = context;
  const data = await fetch(`http://localhost:3000/api/events/${params.evento}`);
  const json = await data.json();

  if (!json.length) return { notFound: true };

  return {
    props: {
      data: json,
    },
  };
}

export async function getStaticPaths() {
  interface EVENT {
    id: number;
  }
  const data = await fetch("http://localhost:3000/api/events");
  const json = await data.json();

  const paths = json.map((event: EVENT) => ({
    params: {
      evento: `${event.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
