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

const buyTicket = async (address: string) => {

  const contract = new web.eth.Contract(abi.abi as any, address);


  const tx = {
    from: await userAddress(),
    to: address,
    data: contract.methods.safeMint().encodeABI(),
  };
  
  await (window as any).ethereum.request({   // <--- dejar comentado lo que no se usa
    method: "eth_sendTransaction",                          // para evitar warnings y poder deployar
    params: [tx],
  });
  
};



export { web, buyTicket, userAddress };
