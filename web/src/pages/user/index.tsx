import { IoIosHeartEmpty, IoIosTrendingUp } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
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
} from "@chakra-ui/react";


interface ITransaccion {
  value: string
  to: string
  from: string
  timeStam: string
  hash: string
}

type IActivity = ITransaccion[]

interface IUser{ 
  walletAddress: string,
  image: string,
  name: string, 
  email: string 
}

export type Wallet =  string | null | undefined
interface Iprops {
  users_list: IUser[]
}

interface IcheckDBuser {
  (users_list: IUser[], wallet: Wallet): IUser | undefined
}



// Traemos todos los usuarios de la DB
export async function getStaticProps() {
  const users = await axios("http://localhost:3000/api/users")
  return {
    props: {
      users_list: users.data
    }, 
  }
}

// Funcion para chequear si el usuario existe en la DB o no en base a su wallet
const checkDBuser: IcheckDBuser = (users_list, wallet)=>{

  const findUser = users_list.find(user => user.walletAddress === wallet)
  return findUser 
}

const API_KEY = "TKM5Z914BF3HEM5HEYDXC7SNI7989QEJT9"

// Fetch user activity
const getUserActivity =  (wallet?: Wallet)=>(
  axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${wallet || "0xf9e7dc6ed769d4193e47f63729482d1ed98fba6d"}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`)
  )
  
  
  
  

function User({users_list}:Iprops) {
  const { account } = useWeb3React();
  const [activity, setActivity] = useState([])

  const userDB = checkDBuser(users_list, account) 
  useEffect(() => {
    getUserActivity().then(res => 
      setActivity(res.data.result)
    )
  }, [account])
  
  

  return (
    <>
      <VStack  bgGradient="linear-gradient(140deg, rgba(122,214,173,1) 0%, rgba(112,165,178,1) 48%, rgba(96,81,186,1) 100%)" height="40vh" />
      <VStack flexDirection="column" justifyContent="center" textAlign="center">
        <Box bottom="10" position="relative">
            <Avatar
              border="5px"
              boxSize="8rem"
              cursor="pointer"
              src={userDB && userDB.image}
             />
          <Flex align="center" justify="center" textAlign="center">
            <Text fontSize="2rem" marginRight="10px" >{ userDB ? userDB.name : "User"} </Text>
            {account &&
            <NextLink passHref href={userDB ? `/settingsUser/${account}` : `user/userData` }>
              <IconButton aria-label="edit-user" icon={<FiEdit3 />} />
            </NextLink>
            }
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
              <ul>
                <li>Queen</li>
                <li>Katy Perry</li>
                <li>Bad Bunny</li>
                <li>Duki</li>
              </ul>
            </TabPanel>
            <TabPanel>
            {!activity.length ? <h2>No activity yet in this account</h2> : 
            

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
                    {activity.map((transaccion: ITransaccion) => {
                      const date = new Date(Number(transaccion.timeStam)*1000)
                      return (
                      <Tr>
                      <Td>
                        <Link color="teal">{transaccion.hash.slice(1,10)}...</Link>
                        {/* <Td>{date}</Td> */}
                        <Td>
                          <Link color="teal">{transaccion.from.slice(1,10)}...</Link>
                      </Td>
                        <Td>
                          <Link color="teal">{transaccion.to.slice(1,10)}...</Link>
                      </Td>
                      <Td>{transaccion.value}</Td>

                      </Td>
                      </Tr>)}
                    )}
                    {/* <Tr>
                      <Td>
                        <Link color="teal">0xdd8cd8316e8ee9b4353...</Link>
                      </Td>
                      <Td>8 days 11 hrs ago</Td>
                      <Td>
                        <Link color="teal">0xf9e7dc6ed769d4193e4...</Link>
                      </Td>
                      <Td>OpenSea: Wyvern Excha...</Td>
                      <Td>0.0039 Ether</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link color="teal">0xdd8cd8316e8ee9b4353...</Link>
                      </Td>
                      <Td>8 days 11 hrs ago</Td>
                      <Td>
                        <Link color="teal">0xf9e7dc6ed769d4193e4...</Link>
                      </Td>
                      <Td>0x26e78b5f903239b0eb5d26a2f95ac761fdd7f6e9</Td>
                      <Td>0.045666 Ether</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link color="teal">0xdd8cd8316e8ee9b4353...</Link>
                      </Td>
                      <Td>8 days 11 hrs ago</Td>
                      <Td>
                        <Link color="teal">0xf9e7dc6ed769d4193e4...</Link>
                      </Td>
                      <Td>OpenSea: Wyvern Excha...</Td>
                      <Td>0.007799 Ether</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link color="teal">0xdd8cd8316e8ee9b4353...</Link>
                      </Td>
                      <Td>14 days 1 hr ago</Td>
                      <Td>
                        <Link color="teal">0xf9e7dc6ed769d4193e4...</Link>
                      </Td>
                      <Td>Uniswap V3: Router 2</Td>
                      <Td>0.00112 Ether</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link color="teal">0xdd8cd8316e8ee9b4353...</Link>
                      </Td>
                      <Td>8 days 11 hrs ago</Td>
                      <Td>
                        <Link color="teal">0xf9e7dc6ed769d4193e4...</Link>
                      </Td>
                      <Td>Proof of Humanity</Td>
                      <Td>0.012 Ether</Td>
                    </Tr> */}
                  </Tbody>
                </Table> 
              </TableContainer>
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </>
  );
}

export default User;