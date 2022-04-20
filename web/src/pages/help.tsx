import {
    Heading,
    Container,
    Text,
    Stack,
    Link,
    AspectRatio,
    Image,
    Box,
} from "@chakra-ui/react";

export default function Help() {
    return (
        <Container
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            maxW="1276px"
        >
            <Stack align="center" h="93vh" justify="center">
                <Stack
                    bg="#5B68DF"
                    borderRadius="full"
                    h="60vh"
                    position="relative"
                    style={{ filter: "blur(500px)" }}
                    w="30vw"
                />
                <Stack
                    bg="#5B68DF"
                    borderRadius="full"
                    h="30vh"
                    position="absolute"
                    style={{ filter: "blur(250px)" }}
                    w="15vw"
                />
                <Stack
                    maxW="1076px"
                    position="absolute"
                    spacing="2.5rem"
                    textAlign="center"
                >
                    <Heading
                        bgClip="text"
                        bgGradient="linear(to-r, #66C796 0%, #505CC4 100%)"
                        fontSize="90px"
                    >
                        Find out how you can get tickets quickly
                    </Heading>
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                    >
                        MetaMask provides the simplest yet most secure way to
                        connect to blockchain-based applications.
                    </Text>
                    <Link
                        alignSelf="center"
                        bgGradient="linear(to-r, #66C796 0%, #505CC4 100%)"
                        borderRadius="full"
                        color="white"
                        href="#quickStart"
                        mb="5rem"
                        mt="2rem"
                        padding="10px 20px"
                        width="fit-content"
                    >
                        Quick Start
                    </Link>
                </Stack>
            </Stack>
            <Stack
                align="center"
                direction="column"
                id="quickStart"
                justify="center"
                minHeight="100vh"
                paddingTop="3rem"
                rowGap="3rem"
            >
                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Stack
                        backgroundColor="#66C796"
                        borderRadius="full"
                        height="1rem"
                        width="1rem"
                    />
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                        width="70vw"
                    >
                        Add MetaMask extension for Chrome and click on the
                        extension.
                    </Text>
                </Stack>
                <Image borderRadius="10px" src="/images/metamask01.jpg" />

                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Stack
                        backgroundColor="#66C796"
                        borderRadius="full"
                        height="1rem"
                        width="1rem"
                    />
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                        width="500px"
                    >
                        Select create an account and set a new password for your
                        wallet.
                    </Text>
                    <Box bg="white" borderRadius="10px" p="6">
                        <Image
                            borderRadius="10px"
                            height="300px"
                            src="/images/metamask02.jpg"
                        />
                    </Box>
                </Stack>

                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Stack
                        backgroundColor="#66C796"
                        borderRadius="full"
                        height="1rem"
                        width="1rem"
                    />
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                        width="40vw"
                    >
                        Click next and reveal your secret phrase. Then put your
                        phrase in order.
                    </Text>
                </Stack>
                <Stack
                    alignItems="center"
                    columnGap="4rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Box bg="white" borderRadius="10px" p="6">
                        <Image
                            borderRadius="10px"
                            height="300px"
                            src="/images/metamask03.jpg"
                        />
                    </Box>
                    <Box bg="white" borderRadius="10px" p="6">
                        <Image
                            borderRadius="10px"
                            height="300px"
                            src="/images/metamask05.jpg"
                        />
                    </Box>
                </Stack>
                <Link
                    alignSelf="center"
                    bgGradient="linear(to-r, #66C796 0%, #505CC4 100%)"
                    borderRadius="full"
                    color="white"
                    href="#htbTicket"
                    mb="5rem"
                    mt="2rem"
                    padding="10px 20px"
                    width="fit-content"
                >
                    Learn to buy a ticket
                </Link>
            </Stack>
            <Stack align="center" direction="row" mt="4rem" spacing="1.5rem">
                <Stack
                    backgroundColor="#66C796"
                    borderRadius="full"
                    height="1.5rem"
                    width="1.5rem"
                />
                <Stack
                    backgroundColor="#66C796"
                    borderRadius="full"
                    height="150px"
                    width="1.5rem"
                />
                <Stack
                    backgroundColor="#66C796"
                    borderRadius="full"
                    height="300px"
                    width="1.5rem"
                />
                <Stack
                    align="center"
                    bgGradient="linear(to-r, #66C796 0%, #505CC4 100%)"
                    borderRadius="48px"
                    justify="center"
                    px="1.5rem"
                    py="1.5rem"
                >
                    <AspectRatio
                        borderRadius="36px"
                        overflow="hidden"
                        ratio={16 / 9}
                        width="700px"
                    >
                        <iframe
                            allowFullScreen
                            height="315"
                            src="https://www.youtube.com/embed/YVgfHZMFFFQ"
                            title="YouTube video metamask"
                        />
                    </AspectRatio>
                </Stack>
                <Stack
                    backgroundColor="#505CC4"
                    borderRadius="full"
                    height="300px"
                    width="1.5rem"
                />
                <Stack
                    backgroundColor="#505CC4"
                    borderRadius="full"
                    height="150px"
                    width="1.5rem"
                />
                <Stack
                    backgroundColor="#505CC4"
                    borderRadius="full"
                    height="1.5rem"
                    width="1.5rem"
                />
            </Stack>
            <Link color="white" href="https://metamask.io/" mb="5rem" mt="2rem">
                Learn More
            </Link>
            <Stack
                align="center"
                direction="column"
                id="htbTicket"
                justify="center"
                minHeight="100vh"
                paddingTop="3rem"
                pb="3rem"
                rowGap="3rem"
            >
                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Stack
                        backgroundColor="#66C796"
                        borderRadius="full"
                        height="1rem"
                        width="1rem"
                    />
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                        width="70vw"
                    >
                        Select your ticket from explore and then press buy
                        ticket from the detail.
                    </Text>
                </Stack>
                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Image
                        borderRadius="10px"
                        height="300px"
                        src="/images/ticket01.png"
                    />
                    <Box bg="white" borderRadius="10px" p="3">
                        <Image
                            borderRadius="10px"
                            height="300px"
                            src="/images/ticket02.png"
                        />
                    </Box>
                </Stack>

                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Stack
                        backgroundColor="#66C796"
                        borderRadius="full"
                        height="1rem"
                        width="1rem"
                    />
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                        width="35vw"
                    >
                        Confirm the buying and then your MetaMask transaction.
                    </Text>
                    <Box bg="white" borderRadius="10px" p="2">
                        <Image
                            borderRadius="10px"
                            height="480px"
                            src="/images/ticket04.png"
                        />
                    </Box>
                </Stack>
                <Stack
                    alignItems="center"
                    columnGap="3rem"
                    direction="row"
                    height="fit-content"
                    width="fit-content"
                >
                    <Stack
                        backgroundColor="#66C796"
                        borderRadius="full"
                        height="1rem"
                        width="1rem"
                    />
                    <Box bg="white" borderRadius="10px" p="2">
                        <Image borderRadius="10px" src="/images/ticket05.png" />
                    </Box>
                    <Text
                        color="white"
                        fontSize="26px"
                        fontWeight="normal"
                        opacity={0.5}
                        width="35vw"
                    >
                        You will receive your MetaMask confirmation.
                    </Text>
                </Stack>
            </Stack>
        </Container>
    );
}
