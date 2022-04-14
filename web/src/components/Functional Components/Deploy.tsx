import { AbiItem } from "web3-utils";
import axios from "axios";

import { userAddress, web } from "./UserCommands";
import storeNFT from "./MetadataStorage";
import Ticket from "../../Ticket.json";

const priceContract = new web.eth.Contract(Ticket.abi as AbiItem[]);

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
  // console.log("llegue a deploy");
  // const reader = new FileReader
  // new File(
  //      [
  //        /* data */
  //      ],
  //      'pinpie.jpg',
  //      { type: 'image/jpg' }
  //    )

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

  const tx = priceContract.deploy({
    data: Ticket.bytecode,
    arguments: [name, symbol, city, price, numberOfTickets, uri.url], // ur.url
  });

  tx.send({
    from: await userAddress(),
  }).on("receipt", async (receipt: any) => {
    // console.log(receipt.contractAddress);
    // meter ruta de post de addresses
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
