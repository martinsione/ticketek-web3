import { userAddress, web } from "./UserCommands";
import Ticket from '../../Ticket.json'
import storeNFT from "./MetadataStorage";


var priceContract = new web.eth.Contract(Ticket.abi);


async function contractDeploy(symbol: string, city: string, price: number, numberOfTickets: number, image: File, name: string, description: string, type: string, date: number, country: string, location: string, direction: string, ){
     console.log('llegue a deploy')
     // const reader = new FileReader
     // new File(
     //      [
     //        /* data */
     //      ],
     //      'pinpie.jpg',
     //      { type: 'image/jpg' }
     //    )

     const uri = await storeNFT(image, name, description, type, date, country, location, direction)
    

     const tx = priceContract.deploy({
               data: Ticket.bytecode,
               arguments: [name, symbol, city, price, numberOfTickets, uri.url] //ur.url
          })


     tx.send({
          from: await userAddress(),
     }).on('receipt', function(receipt: any){
          console.log(receipt.contractAddress)
          //meter ruta de post de addresses

     })
   

}

export {contractDeploy}