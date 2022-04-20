import { useDispatch, useSelector } from "react-redux";
import { IoIosTrendingUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
    Link,
    Icon,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
} from "@chakra-ui/react";

// import { AppState } from "../../redux/store";
import { IState } from "../../redux/reducer";
import { getUserFromDB, getEvents } from "../../redux/actions";
import checkConnection from "../../lib/walletConectionChecker";



interface ITransaccion {
  value: string;
  to: string;
  from: string;
  timeStamp: string;
  hash: string;
}

type IActivity = ITransaccion[];

export type Wallet = string | null | undefined;



const API_KEY = "TKM5Z914BF3HEM5HEYDXC7SNI7989QEJT9";

// Fetch user activity
const getUserActivity = (wallet?: Wallet) =>
  axios.get(
    `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${
      wallet || "0x54D05F1BB2C9759db5914DB727733B3b0040b514"
    }&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`
  );

// Fetch tokens balace


const estilos = {
  fontSize: "50px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function User() {
  const [activity, setActivity] = useState<IActivity>([]);
  const [users, setUsers] = useState([] as any)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {isOpen: contractIsOpen, onOpen: contractOnOpen, onClose: contractOnClose} = useDisclosure()

  const ethValue = 1000000000000000000;
  const { account, activate } = useWeb3React();
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector((state: IState) => state);
  const {events} = useSelector((state: IState) => state);

  async function getAdd(){
    const allAdd = axios.get("/api/users")
    return allAdd
    }
    
    useEffect(()=>{
        dispatch(getEvents())
        getAdd().then(res => setUsers(res.data.message))
    },[])
    

    

    function getAct(acc: string){
        getUserActivity(acc).then((res) => {
        setActivity(res.data.result);
      });
    }



  const cloud = new Cloudinary({
    cloud: {
      cloudName: "dm9n9hrgn",
    },
  });

  const myImage = user.image
    ? cloud.image(user.image.toString()).toURL()
    : "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png";




  async function logOut() {
    checkConnection(false, activate, async () => {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      router.push("/nouser");
    });
  }

  useEffect(() => {
    logOut();
    if (account) {
      dispatch(getUserFromDB(account));
    //   getUserActivity(account).then((res) => {
    //     setActivity(res.data.result);
    //   });
    }
  }, [account]);

  if (!account) return <div style={estilos}>Detecting wallet...</div>;
  return (
    <Box color="white">
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
       
          />
          <Flex align="center" justify="center" textAlign="center">
            <Text fontSize="2rem" marginRight="10px">
              Administrator
            </Text>
          </Flex>
          <Text padding="3">{account || "address..."} </Text>
        </Box>
      </VStack>
      <HStack width="100vw">
        <Tabs isFitted size="lg" variant="enclosed" width="100vw">
          <TabList>
            <Tab>
              <Icon as={IoIosTrendingUp} marginRight="2" />
              <Text>Users</Text>
            </Tab>
            <Tab>
              <Icon as={IoIosTrendingUp} marginRight="2" />
              <Text>contracts</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Account</Th>
                        <Th>User</Th>
                        <Th>Email</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                            {users.length && users.map((u: any) => {
                                console.log(u)
                                return(
                                    <Tr>
                                        <Td>
                                            <Button color="teal" onClick={() => {getAct(u.walletAddress); onOpen();}}>{u.walletAddress}</Button>
                                        </Td>
                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>  
                                                <ModalBody>
                                                <TableContainer>
                                                    <Table>
                                                        <Thead>
                                                        <Tr>
                                                            <Th>Txn Hash</Th>
                                                            <Th>Date</Th>
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
                                                </ModalBody>
                                            </ModalContent>
                                        </Modal>
                                        <Td>
                                            <Text color="teal" onClick={onOpen}>{u.name}</Text>
                                        </Td>
                                        <Td>
                                            <Text color="teal" onClick={onOpen}>{u.email}</Text>
                                        </Td>
                                    </Tr>
                                    
                                )
                                    }
                                )
                            }
                    </Tbody>
                  </Table>
                </TableContainer>
            </TabPanel>
          <TabPanel>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Contract Address</Th>
                        <Th>Name</Th>
                        <Th>symbol</Th>
                        <Th>Stock</Th>
                      </Tr>
                    </Thead>
                    <Tbody>

                            {events.map((e: any)=> 
                                <Tr>
                                    <Td>
                                        <Text>{e.address}</Text>
                                    </Td>
                                    <Td>
                                        <Text>{e.name}</Text>
                                    </Td>
                                    <Td>
                                        <Text>{e.symbol}</Text>
                                    </Td>
                                    <Td>
                                        <Button onClick={contractOnOpen}>{e.numberOfTickets}</Button>
                                    </Td>
                                    <Modal isOpen={contractIsOpen} onClose={contractOnClose}>
                                            <ModalOverlay />
                                            <ModalContent>  
                                                <ModalBody>
                                                <TableContainer>
                                                    <Table>
                                                        <Thead>
                                                        <Tr>
                                                            <Th>Txn Hash</Th>
                                                            <Th>Date</Th>
                                                            <Th>From</Th>
                                                            <Th>To</Th>
                                                            <Th>Value</Th>
                                                        </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                         1
                                                        </Tbody>
                                                    </Table>
                                                    </TableContainer>
                                                </ModalBody>
                                            </ModalContent>
                                        </Modal>
                                </Tr>
                                
                            )}
                    </Tbody>
                  </Table>
                </TableContainer>
          </TabPanel>
        </TabPanels>
        </Tabs>
      </HStack>
    </Box>
  );
}

export default User;

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