// @ts-nocheck

import { IoWalletOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import axios from "axios";
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
import checkConnection from "../../lib/walletConectionChecker";

declare global {
  interface Window {
    web3: any;
  }
}


export default function LogIn() {

  const toast = useToast();
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(true);
  const [metamask, setMetamask] = useState(false);
  const router = useRouter();
  let timer;
  useEffect(() => {
    setMetamask(window.ethereum && true);
  }, []);

  useEffect(() => {
    checkConnection(
      false,
      activate,
      () => setLoadingButton(false),
      () => {
        timer = setTimeout(() => setLoadingButton(false), 1500);
      }
    );
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (account) setLoadingButton(false);
  }, [account]);

  async function connect() {
    activate(injected, undefined, true)
      .then(() => checkConnection(true, activate))
      .then(() => setLoading(false))
      .then(() =>
        toast({
          title: "Wallet connected",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: "Oops, something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  }

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
        .catch(() =>
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
    <Stack>
      {
        // eslint-disable-next-line no-nested-ternary
        loadingButton ? (
          <Button
            _active={{ bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)" }}
            _hover={{
              bg: "linear(to-r, #73E0A9 0%, #5B68DF 100%)",
              opacity: "0.85",
            }}
            bgGradient="linear(to-r, #73E0A9 0%, #5B68DF 100%)"
            borderRadius="full"
            color="white"
            isLoading={loadingButton}
            leftIcon={<IoWalletOutline />}
            loadingText="Detecting wallet"
            px="5"
            py="2"
            transition=".1s ease-in-out"
            onClick={handleConnect}
          >
            Detecting wallet
          </Button>
        ) : account ? (
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
                <Text whiteSpace="nowrap">My Account</Text>
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
        )
      }
    </Stack>
  );
}
