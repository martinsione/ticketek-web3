import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, useToast } from "@chakra-ui/react";

import injected from "../Wallet/connector";

function LogIn() {
  const toast = useToast();
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [metamask, setMetamask] = useState(false);
  const estado: string = account ? "Disconnect" : "Login";

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
    <Button
      colorScheme="pink"
      fontSize={25}
      fontWeight={700}
      h={50}
      isLoading={loading}
      variant="solid"
      w={"auto"}
      onClick={handleConnect}
    >
      {estado}
    </Button>
  );
}

export default LogIn;
