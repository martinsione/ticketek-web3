import { Heading, Container, Text, Stack, Link, AspectRatio } from "@chakra-ui/react";

export default function Help() {
  return (
    <Container alignItems="center" display="flex" flexDirection="column" justifyContent="center" maxW="1276px">
      <Stack align="center" h="93vh" justify="center">
        <Stack bg="#5B68DF"
          borderRadius="full"
          h="60vh"
          position="relative"
          style={{ filter: "blur(500px)" }}
          w="30vw" />
        <Stack bg="#5B68DF"
          borderRadius="full"
          h="30vh"
          position="absolute"
          style={{ filter: "blur(250px)" }}
          w="15vw" />
        <Stack maxW="1076px" position="absolute" spacing="2.5rem" textAlign="center">
          <Heading bgClip='text' bgGradient="linear(to-r, #66C796 0%, #505CC4 100%)" fontSize="90px">Find out how you can get tickets quickly</Heading>
          <Text color="white" fontSize="26px" fontWeight="normal" opacity={0.5}>
            MetaMask provides the simplest yet most secure way to connect to
            blockchain-based applications.
          </Text>
        </Stack>
      </Stack>
      <Stack align="center" direction="row" spacing="1.5rem">
        <Stack backgroundColor="#66C796" borderRadius="full" height="1.5rem" width="1.5rem" />
        <Stack backgroundColor="#66C796" borderRadius="full" height="150px" width="1.5rem" />
        <Stack backgroundColor="#66C796" borderRadius="full" height="300px" width="1.5rem" />
        <Stack align="center" bgGradient="linear(to-r, #66C796 0%, #505CC4 100%)" borderRadius="48px" justify="center" px="1.5rem" py="1.5rem">
          <AspectRatio borderRadius="36px" overflow="hidden" ratio={16 / 9} width="700px">
            <iframe
              allowFullScreen
              height="315"
              src="https://www.youtube.com/embed/YVgfHZMFFFQ"
              title="YouTube video metamask"
            />
          </AspectRatio>
        </Stack>
        <Stack backgroundColor="#505CC4" borderRadius="full" height="300px" width="1.5rem" />
        <Stack backgroundColor="#505CC4" borderRadius="full" height="150px" width="1.5rem" />
        <Stack backgroundColor="#505CC4" borderRadius="full" height="1.5rem" width="1.5rem" />
      </Stack>
      <Link color="white" href="https://metamask.io/" mb="5rem" mt="2rem">
        Learn More
      </Link>
    </Container >
  );
}
