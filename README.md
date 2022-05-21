# Nested NFT Contracts

This project demonstrates a basic nested relationship between two ERC721 contracts, like `Seed` and `Wrapper`.

Try running some of the following tasks:

```shell
npx hardhat compile

npx hardhat test

npx hardhat run scripts/deploy.js --network rinkeby

npx hardhat run scripts/verify.js --network rinkeby
```

## Requirements

1) Create an ERC721 contract, which can allow users to mint 1 NFT at a given time, provided they pay a minimum price of 0.01 in ETH.

2) Create a second ERC721 contract, which can allow users to mint an NFT, provided then transfer the NFT from the first contract above to the second contract (which escrows the token). 

3) At a later stage, the user can swap back the second NFT back for the first one.Assume that price is zero for the swap functionality.

## Deployed Contracts

Seed:  https://rinkeby.etherscan.io/address/0x3af0680af991b0be1f6ff084942c53007093b4ee

Wrapper: https://rinkeby.etherscan.io/address/0x3908eddc3c5ab4ef05cfa9916c840d57819a9372

