import { useState } from "react";
import Link from "next/link";
import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";

import NavBar from "../components/NavBar/NavBar";
import { userBalance, buyTicket } from "../components/Functional Components/UserCommands";

export default function Home() {
  const [balance, setBalance] = useState("")

  const getBalance = () => {
    userBalance().then(r => {
      setBalance(r)
    })
  }

  const buyT = () => {
    buyTicket()
  }

  return (
    <>
      <NavBar long />
      <Container maxW="5xl">
        <Stack
          align="center"
          py={{ base: 20, md: 28 }}
          spacing={{ base: 8, md: 10 }}
          textAlign="center"
        >
          <Heading
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            fontWeight={600}
            lineHeight="110%"
          >
            A new era of buying{" "}
            <Text as="span" color="green.300">
              tickets
            </Text>
          </Heading>
          <Text color="gray.500" maxW="3xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet fuga
            laborum magnam ipsum consequuntur voluptate minima nisi aliquam
            soluta et ratione, magni omnis! Ad minus consequatur necessitatibus
            distinctio nihil eligendi!
          </Text>
          <Stack direction="row" spacing={6}>
            <Link passHref href="/home">
              <Button
                _hover={{ bg: "pink.300" }}
                bg="pink.400"
                colorScheme="pink"
                px={6}
                rounded="full"
              >
                Get started
              </Button>
            </Link>
            <Stack align="center" direction="row">
              <Button marginTop={3} variant="ghost" onClick={getBalance}>
                Obtener Balance
              </Button>
            </Stack>
            <Text>{balance}</Text>
            <Stack align="center" direction="row">
              <Button marginTop={3} variant="ghost" onClick={buyT}>
                Comprar Ticket
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
