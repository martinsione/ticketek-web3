import Web3 from "web3";

import abi from "../../Ticket.json";

const web = new Web3(
  "https://eth-ropsten.alchemyapi.io/v2/__kRrTi_nV3c2CZMzKkw0QfH44AVZ8_L"
);

// async function conn() {
//   if (window?.ethereum) {
//     web = new Web3(window.ethereum);
//   }
// }

// conn();

const userAddress = async () => {
  const user = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  return user[0];
};

const buyTicket = async (address: string, price: number) => {
  // const contract = new web.eth.Contract(abi.abi as any, address);

  let web3 = web;

  if (window?.ethereum) {
    web3 = new Web3(window.ethereum);
  }

  console.log(price);

  const contract = new web3.eth.Contract(abi.abi as any, address);

  await contract.methods
    .safeMint()
    .send({
      from: await userAddress(),
      value: Number(price) * 1000000000,
    })
    .on("receipt", (receipt: any) => {
      // receipt example
      console.log(receipt);
    });
  // receipt example
  // const tx = {
  //   from: await userAddress(),
  //   to: address,
  //   value: price,
  //   data: contract.methods.safeMint().encodeABI(),
  // };

  // await (window as any).ethereum.request({   // <--- dejar comentado lo que no se usa
  //   method: "eth_sendTransaction",                          // para evitar warnings y poder deployar
  //   params: [tx],
  // });
};

export { web, buyTicket, userAddress };
