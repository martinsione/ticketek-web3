import Swal from "sweetalert2";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { IconButton, Button } from "@chakra-ui/react";

import injected from "../Wallet/connector";

function LogIn() {
  const router = useRouter();
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [metamask, setMetamask] = useState(false);
  const [error, setError] = useState(false);
  const estado: string = account ? "Disconnect" : "Login";

  useEffect(() => {
    setMetamask(window.ethereum && true);
  }, []);

  const handleConnect = () => {
    setLoading(true);
    // si no tiene metamask redireccionamos a que se instale
    if (!metamask) router.push("https://metamask.io/download/");
    else if (!account) {
      // si no hay cuenta conectamos
      try {
        activate(injected).then(() => {
          setLoading(false);
          if (account) {
            Swal.fire({
              title: "Wallet connected",
              icon: "success",
            });
          }
        });
      } catch (e: any) {
        setError(true);
      }
    }
    // si hay cuenta desconectamos
    if (account) {
      try {
        deactivate();
        setLoading(false);
        Swal.fire({
          title: "Wallet disconected",
          icon: "success",
          iconColor: "orange",
        });
      } catch (e: any) {
        setError(true);
      }
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
      w={100}
      onClick={handleConnect}
    >
      {estado}
    </Button>
  );
}

export default LogIn;
