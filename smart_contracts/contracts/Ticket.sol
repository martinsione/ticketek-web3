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

    constructor(
        string memory name,
        string memory symb,
        string memory _place,
        uint256 _eventDate
    ) ERC721(name, symb) {
        eventDate = _eventDate;
        place = _place;
    }

    modifier puede() {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= 5, "No podes hacer mas");
        _;
    }

    function safeMint() public puede {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        console.log(tokenId);
        _safeMint(msg.sender, tokenId);
    }

    function changeDate(uint256 newEventDate) public onlyOwner {
        eventDate = newEventDate;
    }

    function getDate() public view returns (uint256) {
        return eventDate;
    }

    function changePlace(string memory newPlace) public onlyOwner {
        place = newPlace;
    }

    function getPlace() public view returns (string memory) {
        return place;
    }
}
