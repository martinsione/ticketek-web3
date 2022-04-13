import { web } from "./UserCommands";
import Ticket from '../../Ticket.json'
import axios from "axios";


async function getEventData(contractAddress: string){

    const contract = new web.eth.Contract(Ticket.abi, contractAddress);

    const Name = await contract.methods.name().call();
    const Symbol = await contract.methods.symbol().call();
    const Place = await contract.methods.getPlace().call();
    const Price = await contract.methods.getPrice().call();
    const NumberOfTickets = await contract.methods.getStock().call();
    const Uri = await contract.methods.getUri().call();

    const metadata = await axios.get(Uri)
    
    const EventData = {
        name: Name,
        symbol: Symbol,
        place: Place,
        price: Price,
        numberOfTickets: NumberOfTickets,
        metadata: metadata
    }
    return EventData


}

export default getEventData

