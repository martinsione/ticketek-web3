import { IoWalletOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import NextLink from "next/link";
// import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useToast,
  Stack,
  Text,
} from "@chakra-ui/react";

import injected from "../Wallet/connector";
// import { Wallet } from "../../pages/user";


// // API_KEY para el fetch
// const API_KEY = "TKM5Z914BF3HEM5HEYDXC7SNI7989QEJT9"

// // Fetch user activity
// const getUserActivity = async (wallet: Wallet)=>{

//   const res = await axios(
//     `https://api-ropsten.etherscan.io/api
//     ?module=account
//     &action=txlist
//     &address=${wallet}
//     &startblock=0
//     &endblock=99999999
//     &page=1
//     &offset=10
//     &sort=asc
//     &apikey=${API_KEY}`)
  

//   return res.data

// }


export default function LogIn() {
  const toast = useToast();
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [metamask, setMetamask] = useState(false);

  useEffect(() => {
    setMetamask(window.ethereum && true);
  }, []);

  const handleConnect = () => {
    setLoading(true);
    // si no tiene metamask redireccionamos a que se instale
    if (!metamask) {
      window.open("https://metamask.io/download/", "_blank");
      setLoading(false);
    } else if (!account) {
      // si no hay cuenta conectamos
      activate(injected, undefined, true).then(
        () => {
          setLoading(false);
          toast({
            title: "Wallet connected",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        () => {
          setLoading(false);
          toast({
            title: "Oops, something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
    }
    // si hay cuenta desconectamos
    if (account) {
      deactivate();
      setLoading(false);
      toast({
        title: "Wallet disconected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack>
      {account ? (
        <Popover>
          <PopoverTrigger>
            <Button
              _active={{ bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)" }}
              _hover={{
                bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)",
                opacity: "0.85",
              }}
              bgGradient="linear(to-r, #73E0A9 0%, #5B68DF 100%)"
              borderRadius="full"
              color="white"
              leftIcon={<FaRegUserCircle />}
              px="5"
              py="2"
              transition=".1s ease-in-out"
            >
              <Text whiteSpace="nowrap">Account</Text>
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverBody>
                {account && (
                  <NextLink passHref href="/user">
                    <Button
                      bg="none"
                      fontSize="1.2rem"
                      margin="5px"
                      width="100%"
                    >
                      My profile
                    </Button>
                  </NextLink>
                )}
                <Button
                  bg="none"
                  fontSize="1.2rem"
                  isLoading={loading}
                  margin="5px"
                  width="100%"
                  onClick={handleConnect}
                >
                  Log out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
        <Button
          _active={{ bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)" }}
          _hover={{
            bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)",
            opacity: "0.85",
          }}
          bgGradient="linear(to-r, #73E0A9 0%, #5B68DF 100%)"
          borderRadius="full"
          color="white"
          leftIcon={<IoWalletOutline />}
          px="5"
          py="2"
          transition=".1s ease-in-out"
          onClick={handleConnect}
        >
          <Text whiteSpace="nowrap">Connect Wallet</Text>
        </Button>
      )}
    </Stack>
  );
}
