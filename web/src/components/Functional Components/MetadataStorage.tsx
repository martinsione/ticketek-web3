import { NFTStorage, File } from 'nft.storage'

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDczRUYxYzYzNEZFYjE2ZTA4RUE2Q2QzQjEzRTQzMTQzZGJjMTFCMmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODg0MTk1MjU5NCwibmFtZSI6Ik5GVGlja2V0In0.iGviNpVfv8yCnb5MCuh9wr1e1J3MDBhNh7Ows2Aiqv8'

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */

async function storeNFT(image: File, name: string, description: string, type: string, date: number, country: string, location: string, direction: string, ) {
    

  // {
  //   id: "1",
  //   title: "Delfin hasta el fin",
  //   type: "concierto",
  //   date: "2019-12-9",
  //   description: "",
  //   image: "",
  //   country: "United States",
  //   city: "New York",
  //   location: "Madison Square Garden",
  //   direction: "Fake Street 12345",
  //   tickets_initialstock: 100,
  //   tickets_left: 90,
  //   seat: 10,
  //   price: 0.01,
  // }

    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    
    return await nftstorage.store({
        image,
        name,
        description,
        type, 
        date,
        country,
        location,
        direction
    })
}




export default storeNFT