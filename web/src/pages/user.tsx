import { IoIosHeartEmpty, IoIosTrendingUp } from "react-icons/io";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

function user() {
  const { account } = useWeb3React();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!account) router.push("/nouser");
  }, [account]);
  if (!account) return <div></div>;
  return (
    <>
      <VStack bgColor="#B2C1B5" height="40vh" />
      <VStack flexDirection="column" justifyContent="center" textAlign="center">
        <Box bottom="10" position="relative">
          <Avatar
            boxSize="8rem"
            cursor="pointer"
            src={
              account
                ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png"
                : ""
            }
          />
          <Text fontSize="2rem">User</Text>
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
