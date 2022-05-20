//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Wrapper is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private lastestTokenId;

    struct SeedContent {
        address collection;
        uint256 tokenId;
    }

    mapping(address => bool) isValidCollections;
    mapping(uint256 => SeedContent) public seeds;

    constructor(address[] memory collectionsList) ERC721("Wrapper NFT", "Wrapper") {
        for(uint256 i = 0; i < collectionsList.length; i++) {
            require(collectionsList[i] != address(0), "Invalid collection");
            isValidCollections[collectionsList[i]] = true;
        }
    }

    function wrap(address collection, uint256 tokenId) external {
        require(collection != address(0) && tokenId != 0, "Invalid seed token");
        require(isValidCollections[collection], "Invalid collection");

        IERC721 _collection = IERC721(collection);
        address seedOwner = _collection.ownerOf(tokenId);
        require(seedOwner == msg.sender, "No seed owner");

        _collection.transferFrom(msg.sender, address(this), tokenId);

        lastestTokenId.increment();
        uint256 _newTokenId = lastestTokenId.current();
        _mint(msg.sender, _newTokenId);

        SeedContent storage seed = seeds[_newTokenId];
        seed.collection = collection;
        seed.tokenId = tokenId;
    }

    function unwrap(uint256 tokenId) external {
        address _owner = ownerOf(tokenId);
        require(_owner == msg.sender, "Invalid owner");

        SeedContent storage seed = seeds[tokenId];
        IERC721 _collection = IERC721(seed.collection);
        _collection.transferFrom(address(this), msg.sender, tokenId);

        _burn(tokenId);
    }
}
