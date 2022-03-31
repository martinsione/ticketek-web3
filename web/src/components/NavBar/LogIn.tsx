import Swal from "sweetalert2";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { IconButton } from "@chakra-ui/react";

import injected from "../../Wallet/connector";

function LogIn() {
  const { activate, deactivate, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [setError] = useState<any>();

  const handleConnect = () => {
    setLoading(true);
    // si no hay cuenta conectamos
    if (!account) {
      try {
        activate(injected).then(() => {
          setLoading(false);
          Swal.fire({
            title: "Wallet connected",
            icon: "success",
          });
        });
      } catch (e: any) {
        setError(e);
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
        setError(e);
      }
    }
  };

  return (
    <IconButton
      aria-label=""
      icon={account ? <FaUserCircle /> : <FaUser />}
      isLoading={loading}
      onClick={handleConnect}
    />
  );
}

export default LogIn;
