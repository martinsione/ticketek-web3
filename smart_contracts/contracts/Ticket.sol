// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticket is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 public eventDate;
    string public place;
    address payable public Owner;//
    uint private totalTikets;//
    uint public precio;
    address payable private constant Nosotros = 0xBCBd6194bD924AbbD1aA23DC4bf092B56C2f5F46; 
    constructor(
        string memory name,
        string memory symb,
        string memory _place,
        uint256 _eventDate,
        uint _precio,
        uint tikets
    ) ERC721(name, symb) {
        eventDate = _eventDate;
        place = _place;
        precio = _precio;
        Owner = payable(msg.sender);//
        totalTikets = tikets;
        _tokenIdCounter.increment();
    }

    modifier puede() {
        uint256 tokenId = _tokenIdCounter.current();
        require(totalTikets >= tokenId , "No more tickets left");
        _;
    }

    modifier hasFounds(){
        require(msg.value/1000000000 == price, "Insufficient funds.");
        _;
    }//

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
        Nosotros.transfer(us);

        
    }//

    function changeDate(uint256 newEventDate) public onlyOwner {
        eventDate = newEventDate;
    }

    function getDate() public view returns (uint256) {
        return eventDate;
    }

    function getStock() public view returns (uint){
        uint256 tokenId = _tokenIdCounter.current();
        return totalTikets >= tokenId ? totalTikets - tokenId + 1 : 0;
    }

    function changePlace(string memory newPlace) public onlyOwner {
        place = newPlace;
    }

    function getPlace() public view returns (string memory) {
        return place;
    }
}
