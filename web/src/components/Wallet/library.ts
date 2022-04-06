import Web3 from 'web3';

function getLibrary(provider: any) {
  return new Web3(provider);
}

export default getLibrary;