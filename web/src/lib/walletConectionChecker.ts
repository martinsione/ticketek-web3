import axios from "axios";
import Web3 from "web3";
import injected from "../components/Wallet/connector";

export default async function checkConnection(
  force = false,
  activate: any,
  callback: () => Promise<void> | undefined,
  callbackSuccess: () => Promise<void> | undefined
) {
  let web3: any;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  web3.eth.getAccounts().then(async (addr: string) => {
    if (addr.length) {
      const atr = await axios
        .post(
          "/api/auth/login",
          { walletID: addr[0], force },
          { withCredentials: true }
        )
        .then(({ data }) => {
          if (data.message === "success") {
            setTimeout(() => {
              activate(injected, undefined, true).then(() => {});
            }, 500);
          }
        })
        .then(() => {
          if (callbackSuccess) callbackSuccess();
        });
    } else {
      if (callback) callback();
    }
  });
}
