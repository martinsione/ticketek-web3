import { AbiItem } from "web3-utils";
import Web3 from "web3";
import axios from "axios";

import { userAddress} from "./UserCommands";
import storeNFT from "./MetadataStorage";
import Ticket from "../../Ticket.json";


async function contractDeploy(
  symbol: string,
  city: string,
  price: number,
  numberOfTickets: number,
  image: File,
  name: string,
  description: string,
  type: string,
  date: number,
  country: string,
  location: string,
  direction: string
  ) {
    
  let web3 = new Web3( "https://eth-ropsten.alchemyapi.io/v2/__kRrTi_nV3c2CZMzKkw0QfH44AVZ8_L")
   
    if(window){
      web3 = new Web3(window.ethereum);
    }
    
    
    const uri = await storeNFT(
    image,
    name,
    description,
    type,
    date,
    country,
    location,
    direction
    );
  
  const priceContract = new web3.eth.Contract(Ticket.abi as AbiItem[]);
    
  const tx = priceContract.deploy({
    data: Ticket.bytecode,
    arguments: [name, symbol, city, price, numberOfTickets, uri.url], 
  });

  tx.send({
    from: await userAddress(),
  }).on("receipt", async (receipt: any) => {

    try {
      await axios.post("/api/events", {
        address: receipt.contractAddress,
        name,
        symbol,
      });
      // console.log(response);
    } catch (error) {
      // console.error(error);
    }
  });
}

// eslint-disable-next-line import/prefer-default-export
export { contractDeploy };
