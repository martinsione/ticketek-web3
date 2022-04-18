import { useDispatch, useSelector } from "react-redux";
import { IoIosHeartEmpty, IoIosTrendingUp } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { verify } from "jsonwebtoken";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Cloudinary } from "@cloudinary/url-gen";
import {
    Avatar,
    Tab,
    TabList,
    Tabs,
    TabPanel,
    TabPanels,
    VStack,
    HStack,
    Box,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Text,
    Tag,
    Link,
    Icon,
    Flex,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from "@chakra-ui/react";

import { AppState } from "../../redux/store";
// import { getUserFromDB } from "../../redux/actions";
import checkConnection from "../../lib/walletConectionChecker";
import EditUserProfile from "../../components/EditUserProfile/EditUserProfile";

const estilos = {
    fontSize: "50px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

function user() {
    const [state, setState] = useState({ name: "" });
    const router = useRouter();
    const { account, activate } = useWeb3React();
    // const dispatch = useDispatch();
    const currentUser = useSelector((state: AppState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cloud = new Cloudinary({
        cloud: {
            cloudName: "dm9n9hrgn",
        },
    });

    const myImage = currentUser.image
        ? cloud.image(currentUser.image.toString()).toURL()
        : "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png";

    async function fetchData() {
        const { data } = await axios.post(
            `/api/users/${account}`,
            { walletID: account },
            { withCredentials: true }
        );
        setState(data);
    }

    async function logOut() {
        checkConnection(false, activate, async () => {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            router.push("/nouser");
        });
    }

    useEffect(() => {
        logOut();
        fetchData();
        // account && dispatch(getUserFromDB(account));
    }, [account]);
    if (!account) return <div style={estilos}>Detecting wallet...</div>;

    return (
        <>
            <VStack bgColor="#B2C1B5" height="40vh" />
            <VStack
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
            >
                <Box bottom="10" position="relative">
                    <Avatar
                        boxSize="8rem"
                        cursor="pointer"
                        src={
                            account
                                ? myImage
                                : "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png"
                        }
                        onClick={onOpen}
                    />
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <EditUserProfile account={account} />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    <Flex align="center" justify="center" textAlign="center">
                        <Text fontSize="2rem" marginRight="10px">
                            {state.name || "Unnamed"}
                        </Text>
                        <NextLink passHref href={`/settingsUser/${account}`}>
                            <IconButton
                                aria-label="edit-user"
                                icon={<FiEdit3 />}
                            />
                        </NextLink>
                    </Flex>
                    <Tag padding="3">{account || "address..."} </Tag>
                </Box>
            </VStack>
            <HStack width="100vw">
                <Tabs isFitted size="lg" variant="enclosed" width="100vw">
                    <TabList>
                        <Tab>My tickets</Tab>
                        <Tab>
                            <Icon as={IoIosHeartEmpty} marginRight="2" />
                            <Text>Favorites</Text>
                        </Tab>
                        <Tab>
                            <Icon as={IoIosTrendingUp} marginRight="2" />
                            <Text>Activity</Text>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>1 QNN</p>
                        </TabPanel>
                        <TabPanel
                            alignItems="center"
                            listStyleType="none"
                            textAlign="center"
                        >
                            <Box bottom="10" position="relative">
                                <Avatar
                                    boxSize="8rem"
                                    cursor="pointer"
                                    src={
                                        account
                                            ? myImage
                                            : "https://res.cloudinary.com/dm9n9hrgn/image/upload/ptkmmbf7depeeyigo9io?_a=ATAK9AA0"
                                    }
                                />
                                <Flex
                                    align="center"
                                    justify="center"
                                    textAlign="center"
                                >
                                    <Text fontSize="2rem" marginRight="10px">
                                        User
                                    </Text>
                                    <NextLink
                                        passHref
                                        href={`/settingsUser/${account}`}
                                    >
                                        <IconButton
                                            aria-label="edit-user"
                                            icon={<FiEdit3 />}
                                        />
                                    </NextLink>
                                </Flex>
                                <Tag padding="3">
                                    {account || "address..."}{" "}
                                </Tag>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </HStack>

            <HStack width="100vw">
                <Tabs isFitted size="lg" variant="enclosed" width="100vw">
                    <TabList>
                        <Tab>My tickets</Tab>
                        <Tab>
                            <Icon as={IoIosHeartEmpty} marginRight="2" />
                            <Text>Favorites</Text>
                        </Tab>
                        <Tab>
                            <Icon as={IoIosTrendingUp} marginRight="2" />
                            <Text>Activity</Text>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>1 QNN</p>
                        </TabPanel>
                        <TabPanel
                            alignItems="center"
                            listStyleType="none"
                            textAlign="center"
                        >
                            <ul>
                                <li>Queen</li>
                                <li>Katy Perry</li>
                                <li>Bad Bunny</li>
                                <li>Duki</li>
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Txn Hash</Th>
                                            <Th>Age</Th>
                                            <Th>From</Th>
                                            <Th>To</Th>
                                            <Th>Value</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <Link color="teal">
                                                    0xdd8cd8316e8ee9b4353...
                                                </Link>
                                            </Td>
                                            <Td>8 days 11 hrs ago</Td>
                                            <Td>
                                                <Link color="teal">
                                                    0xf9e7dc6ed769d4193e4...
                                                </Link>
                                            </Td>
                                            <Td>OpenSea: Wyvern Excha...</Td>
                                            <Td>0.0039 Ether</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Link color="teal">
                                                    0xdd8cd8316e8ee9b4353...
                                                </Link>
                                            </Td>
                                            <Td>8 days 11 hrs ago</Td>
                                            <Td>
                                                <Link color="teal">
                                                    0xf9e7dc6ed769d4193e4...
                                                </Link>
                                            </Td>
                                            <Td>
                                                0x26e78b5f903239b0eb5d26a2f95ac761fdd7f6e9
                                            </Td>
                                            <Td>0.045666 Ether</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Link color="teal">
                                                    0xdd8cd8316e8ee9b4353...
                                                </Link>
                                            </Td>
                                            <Td>8 days 11 hrs ago</Td>
                                            <Td>
                                                <Link color="teal">
                                                    0xf9e7dc6ed769d4193e4...
                                                </Link>
                                            </Td>
                                            <Td>OpenSea: Wyvern Excha...</Td>
                                            <Td>0.007799 Ether</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Link color="teal">
                                                    0xdd8cd8316e8ee9b4353...
                                                </Link>
                                            </Td>
                                            <Td>14 days 1 hr ago</Td>
                                            <Td>
                                                <Link color="teal">
                                                    0xf9e7dc6ed769d4193e4...
                                                </Link>
                                            </Td>
                                            <Td>Uniswap V3: Router 2</Td>
                                            <Td>0.00112 Ether</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Link color="teal">
                                                    0xdd8cd8316e8ee9b4353...
                                                </Link>
                                            </Td>
                                            <Td>8 days 11 hrs ago</Td>
                                            <Td>
                                                <Link color="teal">
                                                    0xf9e7dc6ed769d4193e4...
                                                </Link>
                                            </Td>
                                            <Td>Proof of Humanity</Td>
                                            <Td>0.012 Ether</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </HStack>
        </>
    );
}

export default user;

export async function getServerSideProps(context: {
    req: { cookies: { NFTicketLoginJWT: string } };
}) {
    const { cookies } = context.req;
    const loginJWT = cookies?.NFTicketLoginJWT;

    return verify(loginJWT, process.env.SECRET_WORD as string, (error) => {
        if (error) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/nouser",
                },
                props: {},
            };
        }
        return {
            props: {},
        };
    });
}
