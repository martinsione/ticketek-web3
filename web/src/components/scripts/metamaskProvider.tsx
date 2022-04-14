import React, { useEffect, useState } from "react";
import { Injected } from "./connector";
import { useWeb3React } from "@web3-react/core";

function MetamaskProvider({ children }: { children: any }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
    account,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Injected.isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(Injected).then(() => console.log(account));
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);

  if (loaded) {
    return children;
  }
  return <>Loading</>;
}

export default MetamaskProvider;
