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
    address payable Owner;//
    uint public tiketsLeft = 5;//

    constructor(
        string memory name,
        string memory symb,
        string memory _place,
        uint256 _eventDate
    ) ERC721(name, symb) {
        eventDate = _eventDate;
        place = _place;
        Owner = owner();//
    }

    modifier puede() {
        uint256 tokenId = _tokenIdCounter.current();
        require(tiketsLeft != 0, "No podes hacer mas");
        _;
    }

    modifier hasFounds(){
        require(msg.value == price, "Insufficient funds.");
        _;
    }//

    function safeMint() public payable hasFounds puede {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        console.log(tokenId);

        _safeMint(msg.sender, tokenId);

        Fees();
        tiketsLeft -= 1;
        
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
        return tiketsLeft;
    }

    function changePlace(string memory newPlace) public onlyOwner {
        place = newPlace;
    }

    function getPlace() public view returns (string memory) {
        return place;
    }
}
