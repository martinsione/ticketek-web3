// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Ticket is ERC721, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    string public place;
    address payable public Owner;
    uint private totalTickets;
    uint public price;
    string private uri;
    address payable private constant NFTickets = 0xBCBd6194bD924AbbD1aA23DC4bf092B56C2f5F46; 
    constructor(
        string memory name,
        string memory symb,
        string memory _place,
        uint _price,
        uint tickets,
        string memory _uri
    ) ERC721(name, symb) { //y el basee uri
        place = _place;
        price = _price;
        uri = _uri;
        Owner = payable(msg.sender);
        totalTickets = tickets;
        _tokenIdCounter.increment();
    }

    modifier puede() {
        uint256 tokenId = _tokenIdCounter.current();
        require(totalTickets >= tokenId , "No more tickets left");
        _;
    }

    modifier hasFounds(){
        require(msg.value/1000000000 == price, "Insufficient funds.");
        _;
    }

    function _baseURI() internal pure override returns (string memory) {
        return uri;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function safeMint() public payable hasFounds puede {
        
        uint256 tokenId = _tokenIdCounter.current();
        
        _safeMint(msg.sender, tokenId);

        Fees();
        _tokenIdCounter.increment();
        
    }

    function Fees() internal{
        
        uint us = msg.value * 0.1;
        uint owner = msg.value - us;
        Owner.transfer(owner);
        NFTickets.transfer(us);

        
    }


    function getStock() public view returns (uint){
        uint256 tokenId = _tokenIdCounter.current();
        return totalTickets >= tokenId ? totalTickets - tokenId + 1 : 0;
    }

    function changePlace(string memory newPlace) public onlyOwner {
        place = newPlace;
    }

    function getPlace() public view returns (string memory) {
        return place;
    }

    function getPrice() public view returns (uint) {
        return price * 1000000000;
    }
}
