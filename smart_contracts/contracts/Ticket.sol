// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticket is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor(string memory name, string memory symb) ERC721(name, symb) {}

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
}
