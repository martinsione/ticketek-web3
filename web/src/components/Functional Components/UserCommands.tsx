import Web3 from 'web3';

import Ticket from '../Ticket.json';

const address: string = '0x945eD39416121076ADB07c493e306b6D9E541b09';

const web = new Web3(
  'https://eth-ropsten.alchemyapi.io/v2/__kRrTi_nV3c2CZMzKkw0QfH44AVZ8_L',
);

// TODO: fix this type
// @ts-ignore
const contract = new web.eth.Contract(Ticket.abi, address);

const userAddress = async () => {
  const user = await (window as any).ethereum.request({
    method: 'eth_requestAccounts',
  });
  return user[0];
};

const buyTicket = async () => {
  // const user = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });

  const tx = {
    from: await userAddress(),
    to: address,
    data: contract.methods.safeMint().encodeABI(),
  };

  const txHash = await (window as any).ethereum.request({
    method: 'eth_sendTransaction',
    params: [tx],
  });
  console.log(txHash);
};

const userBalance = async () => {
  //   const user = await (window as any).ethereum.request({
  //     method: "eth_requestAccounts",
  //   });

  const bal = await contract.methods.balanceOf(await userAddress()).call();

  return bal;
};

export { contract, buyTicket, userBalance };
