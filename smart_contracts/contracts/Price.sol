// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Price is ERC721 {
    constructor() ERC721("Queen", "QNN") {
        owner = payable(msg.sender);
    }

    uint256 private price = 0.025 ether;
    address payable private owner;

    function updatePrice(uint256 _price) public payable {
        require(owner == msg.sender, "Only owner can update price.");
        price = _price;
    } 

    function getPrice() public view returns (uint256) {
        return price;
    }

    function hasFounds() public payable returns (bool) {
        require(msg.value == price, "Insufficient funds.");
        return true;
    }

    function getOwner() public view returns (address payable) {
        return owner;
    }
}
