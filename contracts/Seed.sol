//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Seed is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private lastestTokenId;

    uint256 public immutable MINT_PRICE;

    constructor(uint256 mintPrice) ERC721("Seed NFT", "Seed") {
        MINT_PRICE = mintPrice;
    }

    function mint() external payable {
        require(msg.value >= MINT_PRICE, "Invalid fee");

        lastestTokenId.increment();
        uint256 _newTokenId = lastestTokenId.current();
        _mint(msg.sender, _newTokenId);
    }
}
