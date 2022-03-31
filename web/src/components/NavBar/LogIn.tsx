import Swal from "sweetalert2";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { IconButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import injected from "../Wallet/connector";

function LogIn() {
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(true);

  const handleConnect = () => {
    setLoading(true);
    // si no hay cuenta conectamos
    if (!account) {
      try {
        activate(injected).then((res) => setLoading(false));
      } catch (e) {
        setError(true);
      }
    }
    // si hay cuenta desconectamos
    if (account) {
      try {
        deactivate();
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    }
  };

  return (
    <Button
      variant="solid"
      colorScheme="pink"
      h={50}
      w={100}
      fontSize={25}
      fontWeight={700}
      isLoading={loading}
      onClick={handleConnect}
    >
      Login
    </Button>
  );
}

export default LogIn;
