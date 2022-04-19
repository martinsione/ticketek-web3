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
import { getUserFromDB } from "../../redux/actions";
import checkConnection from "../../lib/walletConectionChecker";
import EditUserProfile from "../../components/EditUserProfile/EditUserProfile";

interface ITransaccion {
  value: string;
  to: string;
  from: string;
  timeStamp: string;
  hash: string;
}

type IActivity = ITransaccion[];

export type Wallet = string | null | undefined;

interface GetTicketsResponse {
  result: [];
}

const API_KEY = "TKM5Z914BF3HEM5HEYDXC7SNI7989QEJT9";

// Fetch user activity
const getUserActivity = (wallet?: Wallet) =>
  axios.get(
    `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${
      wallet || "0x54D05F1BB2C9759db5914DB727733B3b0040b514"
    }&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`
  );

// Fetch tokens balace
const getUserTickets = (wallet?: Wallet) =>
  axios
    .get<GetTicketsResponse>(
      `https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=${
        wallet || "0x54D05F1BB2C9759db5914DB727733B3b0040b514"
      }&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`
    )
    .then((res) =>
      res.data.result.map(
        (ticket: { tokenSymbol: string }) => `1 ${ticket.tokenSymbol}`
      )
    );

const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function user() {
  const [activity, setActivity] = useState<IActivity>([]);
  const [tickets, setTickets] = useState<string[]>([]);
  const ethValue = 1000000000000000000;
  const [stateLocal, setState] = useState({ name: "" });
  const { account, activate } = useWeb3React();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: AppState) => state.user);
  const {isOpen, onOpen, onClose} = useDisclosure()

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
    if (account) {
      dispatch(getUserFromDB(account));
      getUserActivity(account).then((res) => {
        setActivity(res.data.result);
      });
      getUserTickets(account).then((res) => setTickets(res));
    }
  }, [account]);

  if (!account) return <div style={estilos}>Detecting wallet...</div>;
  return (
    <>
      <VStack
        bgGradient="linear-gradient(140deg, rgba(122,214,173,1) 0%, rgba(112,165,178,1) 48%, rgba(96,81,186,1) 100%)"
        height="40vh"
      />
      <VStack flexDirection="column" justifyContent="center" textAlign="center">
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
                  <EditUserProfile account={currentUser}/>
                </ModalBody>
              </ModalContent>
          </Modal>
          <Flex align="center" justify="center" textAlign="center">
            <Text fontSize="2rem" marginRight="10px">
              {stateLocal.name || "Unnamed"}
            </Text>
            <NextLink
              passHref
              href={stateLocal ? `/settingsUser/${account}` : `user/userData`}
            >
              <IconButton aria-label="edit-user" icon={<FiEdit3 />} />
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
              {tickets?.length ? (
                <p>{tickets}</p>
              ) : (
                <p>No tickets bought yet</p>
              )}
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
              {!activity.length ? (
                <Text>No activity in this account</Text>
              ) : (
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
                      {activity.length &&
                        activity.map((transaccion: ITransaccion) => {
                          const date = new Date(
                            Number(transaccion.timeStamp) * 1000
                          )
                            .toString()
                            .replace(/ \w+-\d+ \(.*\)$/, "");
                          const value = Number(transaccion.value) / ethValue;
                          const valueFormat = String(value).slice(0, 4);
                          return (
                            <Tr>
                              <Td>
                                <Link color="teal">
                                  {transaccion.hash.slice(0, 20)}...
                                </Link>
                              </Td>
                              <Td>{date}</Td>
                              <Td>
                                <Link color="teal">
                                  {transaccion.from.slice(0, 20)}...
                                </Link>
                              </Td>
                              <Td>
                                <Link color="teal">
                                  {transaccion.to.slice(0, 20)}...
                                </Link>
                              </Td>
                              <Td>{valueFormat} Eth</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
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
