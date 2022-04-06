import { FaEthereum, FaRegUserCircle } from 'react-icons/fa';
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useWeb3React } from "@web3-react/core";
import { Button, Popover, IconButton, PopoverBody, PopoverContent, PopoverTrigger, Portal, useToast } from "@chakra-ui/react";

import injected from "../Wallet/connector";

function LogIn() {
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
    <Popover >
      <PopoverTrigger>
        <IconButton _hover={{}} aria-label='Search database' bg="none" fontSize="50px" icon={account ? <FaEthereum /> : <FaRegUserCircle/>} />
      </PopoverTrigger>
      <Portal >
        <PopoverContent>
          <PopoverBody>
              <Button bg="none" fontSize="1.2rem" isLoading={loading} margin="5px" width="100%" onClick={handleConnect} >{account ? "Log out" : "Log in"}</Button>
              <NextLink passHref href="/user">
                <Button bg="none" fontSize="1.2rem" margin="5px" width="100%" >My profile</Button>
              </NextLink>
              <NextLink passHref href="/user">
                <Button bg="none" fontSize="1.2rem" margin="5px" width="100%" >Settings</Button>
              </NextLink>
          </PopoverBody>
        </PopoverContent>
      </Portal>
  </Popover>
  )
}

export default LogIn;
