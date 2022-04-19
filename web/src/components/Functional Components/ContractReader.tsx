import { AbiItem } from "web3-utils";
import axios from "axios";

import { web } from "./UserCommands";
import Ticket from "../../Ticket.json";

async function getEventData(contractAddress: string) {
  const contract = new web.eth.Contract(
    Ticket.abi as AbiItem[],
    contractAddress
  );

  const Name = await contract.methods.name().call();
  const Symbol = await contract.methods.symbol().call();
  const Place = await contract.methods.getPlace().call();
  const Price = await contract.methods.getPrice().call();
  const NumberOfTickets = await contract.methods.getStock().call();
  let Uri = await contract.methods.getUri().call();
  Uri = `https://nftstorage.link/ipfs${Uri.slice(6)}`;

  const metadata = await axios.get(Uri).then((r) => r.data);
  console.log("REQUESTTTTT");
  metadata.image = `https://nftstorage.link/ipfs${metadata.image.slice(6)}`;

  const EventData = {
    address: contractAddress,
    name: Name,
    symbol: Symbol,
    place: Place,
    price: Price,
    numberOfTickets: NumberOfTickets,
    metadata,
  };
  return EventData;
}

export default getEventData;
