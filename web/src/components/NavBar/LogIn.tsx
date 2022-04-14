import { FaEthereum, FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useWeb3React } from "@web3-react/core";
import {
  Button,
  Popover,
  IconButton,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useToast,
} from "@chakra-ui/react";

import injected from "../Wallet/connector";
import axios from "axios";
import Web3 from "web3";
import { useRouter } from "next/router";

function LogIn() {
  const toast = useToast();
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [metamask, setMetamask] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMetamask(window.ethereum && true);
  }, []);

  async function connect() {
    activate(injected, undefined, true)
      .then(
        () => checkConnection(true),
        () => {
          setLoading(false);
          toast({
            title: "Oops, something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      )
      .then(
        () => setLoading(false),
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

  const checkConnection = async (force = false) => {
    // Check if browser is running Metamask
    let web3: any;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    // Check if User is already connected by retrieving the accounts
    web3.eth.getAccounts().then(async (addr: string) => {
      if (addr) {
        const atr = await axios
          .post(
            "/api/auth/login",
            { walletID: addr[0], force },
            { withCredentials: true }
          )
          .then(({ data }) => {
            if (data.message === "success") {
              setTimeout(() => {
                activate(injected, undefined, true).then(() =>
                  toast({
                    title: "Wallet connected",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  })
                );
              }, 500);
            }
          });
      }
    });
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleConnect = () => {
    setLoading(true);
    // si no tiene metamask redireccionamos a que se instale
    if (!metamask) {
      window.open("https://metamask.io/download/", "_blank");
      setLoading(false);
    } else if (!account) {
      // si no hay cuenta conectamos
      connect();
    }
    // si hay cuenta desconectamos
    if (account) {
      console.log(account);
      deactivate();
      axios
        .post(
          "/api/auth/logout",
          { walletID: account },
          { withCredentials: true }
        )
        .then(() => {
          toast({
            title: "Wallet disconected",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          router.reload();
        })
        .catch((err) =>
          toast({
            title: "Oops, something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        );
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          _hover={{}}
          aria-label="Search database"
          bg="none"
          fontSize="50px"
          icon={account ? <FaEthereum /> : <FaRegUserCircle />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverBody>
            <Button
              bg="none"
              fontSize="1.2rem"
              isLoading={loading}
              margin="5px"
              width="100%"
              onClick={handleConnect}
            >
              {account ? "Log out" : "Log in"}
            </Button>
            {account && (
              <NextLink passHref href="/user">
                <Button bg="none" fontSize="1.2rem" margin="5px" width="100%">
                  My profile
                </Button>
              </NextLink>
            )}
            {account && (
              <NextLink passHref href="/user/userData">
                <Button bg="none" fontSize="1.2rem" margin="5px" width="100%">
                  Settings
                </Button>
              </NextLink>
            )}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default LogIn;
