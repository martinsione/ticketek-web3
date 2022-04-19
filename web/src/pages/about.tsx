import { IoAnalyticsSharp, IoLogoBitcoin, IoLockClosed } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { ReactElement } from "react";
import NextImage from "next/image";
import {
  Link,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

function Feature({ text, icon, iconBg }: FeatureProps) {
  return (
    <Stack align="center" direction="row">
      <Flex
        align="center"
        bg={iconBg}
        h={8}
        justify="center"
        rounded="full"
        w={8}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
}

const GITHUB_USERS = [
  "alejorrojas",
  "diegozestudio",
  "martinsione",
  "fedeprat",
  "AlfredoBlanco",
  "LNFrettes",
  "francoa7",
  "thecandybars",
];

export default function About() {
  return (
    <Stack color="white" maxW="5xl" mx="auto" py={12} spacing={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            alignSelf="flex-start"
            bg={useColorModeValue("blue.50", "blue.900")}
            color="blue.400"
            fontSize="sm"
            fontWeight={600}
            p={2}
            rounded="md"
            textTransform="uppercase"
          >
            Our Story
          </Text>
          <Heading>A new way to buy and hodl your tickets</Heading>
          <Text color="gray.500" fontSize="lg">
            A Henry&apos;s team who wants to change the events industry
          </Text>
          <Stack
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
            spacing={4}
          >
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color="yellow.500" h={5} w={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text="Incomes directly linked to the artists."
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color="green.500" h={5} w={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text="Buy now and hold for ever"
            />
            <Feature
              icon={<Icon as={IoLockClosed} color="purple.500" h={5} w={5} />}
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text="Segurity during all the process"
            />
          </Stack>
        </Stack>
        <Flex margin={70}>
          <Box
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 30,
              left: 0,
              backgroundImage: `url(${"https://images.pexels.com/photos/3052360/pexels-photo-3052360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
            cursor="pointer"
            height="300px"
            mt={-12}
            pos="relative"
            rounded="lg"
            width="350px"
          >
            <Image
              height={300}
              objectFit="cover"
              rounded="lg"
              src="https://images.pexels.com/photos/3052360/pexels-photo-3052360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              width={330}
            />
          </Box>
        </Flex>
      </SimpleGrid>

      <Heading>Team</Heading>
      <Stack direction="row" flexWrap="wrap" rowGap={20}>
        {GITHUB_USERS.map((user) => (
          <Stack alignItems="center" flex="20%" justifyContent="center">
            <Stack
              borderRadius="full"
              h="full"
              maxW="112px"
              objectFit="contain"
              overflow="hidden"
              w="full"
            >
              <NextImage
                draggable="false"
                height="40"
                layout="responsive"
                src={`https://github.com/${user}.png`}
                width="40"
              />
            </Stack>

            <Stack alignItems="center" direction="row" justifyContent="center">
              <Link
                href={`https://github.com/${user}`}
                rel="noreferrer"
                target="_blank"
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="center"
                  spacing="4px"
                >
                  <Icon as={FaGithub} />
                  <Text fontWeight="bold">{user}</Text>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
