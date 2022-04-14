import Web3 from "web3";

import abi from "../Ticket.json";

const address: string = "0x945eD39416121076ADB07c493e306b6D9E541b09";

let web = new Web3(
  "https://eth-ropsten.alchemyapi.io/v2/__kRrTi_nV3c2CZMzKkw0QfH44AVZ8_L"
);


async function conn() {
  if(window?.ethereum){
    web = new Web3(window.ethereum)
  }
}

conn()

const contract = new web.eth.Contract(abi.abi as any, address);

const userAddress = async () => {
  const user = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  return user[0];
};

const buyTicket = async () => {
  // const user = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  // const tx = {
  //   from: await userAddress(),
  //   to: address,
  //   data: contract.methods.safeMint().encodeABI(),
  // };
  // const txHash = await (window as any).ethereum.request({   // <--- dejar comentado lo que no se usa
  //   method: "eth_sendTransaction",                          // para evitar warnings y poder deployar
  //   params: [tx],
  // });
  // console.log(txHash);
};

const userBalance = async () => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const bal = await contract.methods.balanceOf(await userAddress()).call();

  return bal;
};

export {web, contract, buyTicket, userAddress };
