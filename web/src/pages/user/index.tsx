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
  timeStamp: string
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
  axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${wallet || "0x54D05F1BB2C9759db5914DB727733B3b0040b514"}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`)
  )
  
  
  
  

function User({users_list}:Iprops) {
  const { account } = useWeb3React();
  const [activity, setActivity] = useState<IActivity>([])
  const ethValue = 1000000000000000000

  const userDB = checkDBuser(users_list, account) 
  useEffect(() => {
    getUserActivity(account).then(res =>{ 
      setActivity(res.data.result)} 
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
            {!activity.length ? <Text>No activity yet in this account</Text> : 
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
                    {activity.length && activity.map((transaccion: ITransaccion) => {
                      const date = new Date(Number(transaccion.timeStamp)*1000).toString().replace(/ \w+-\d+ \(.*\)$/,"")
                      const value = Number(transaccion.value)/ethValue
                      const valueFormat = String(value).slice(0,4)  
                      return (
                      <Tr>
                        <Td>  
                          <Link color="teal">{transaccion.hash.slice(0,20)}...</Link>
                         </Td>
                          <Td>{date}</Td>
                         <Td>
                            <Link color="teal">{transaccion.from.slice(0,20)}...</Link>
                        </Td>
                          <Td>
                            <Link color="teal">{transaccion.to.slice(0,20)}...</Link>
                        </Td>
                        <Td>{valueFormat} Eth</Td>
                      </Tr>
                      )}
                    )}
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