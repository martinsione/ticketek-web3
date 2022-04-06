import { Box, Heading, Container, Text, Stack, Link } from "@chakra-ui/react";

import NavBar from "../components/NavBar/NavBar";

export default function Help() {
  return (
    <>
      <NavBar long={false} />
      <Container maxW="3xl">
        <Stack
          as={Box}
          py={{ base: 20, md: 36 }}
          spacing={{ base: 8, md: 14 }}
          textAlign="center"
        >
          <Heading
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            fontWeight={600}
            lineHeight="110%"
          >
            What is metamask? <br />
            <Text as="span" color="green.300">
              Quick start
            </Text>
          </Heading>
          <Text color="gray.500">
            MetaMask provides the simplest yet most secure way to connect to
            blockchain-based applications. You are always in control when
            interacting on the new decentralized web.
          </Text>
          <Stack
            align="center"
            alignSelf="center"
            direction="column"
            position="relative"
            spacing={3}
          >
            <iframe
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              height="315"
              src="https://www.youtube.com/embed/YVgfHZMFFFQ"
              title="YouTube video player"
              width="560"
            />

            <Link color="teal.500" href="https://metamask.io/">
              Learn More
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
