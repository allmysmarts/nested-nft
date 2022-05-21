require("dotenv").config();
const { ethers, run } = require("hardhat");

async function main() {
    console.log("Verifying contract ...");
    try {
        await run("verify:verify", {
          address: "0x52eC4c36663AeAF99642542d22a0152cA4295467",
          contract: "contracts/Seed.sol:Seed",
          constructorArguments: []
        });
    } catch (e) {
        console.log("Error while verifying seed contract: ", e)
    }

    try {
        await run("verify:verify", {
            address: "0xCC288708225Cd10f05c16892AD49f04654c0e199",
            contract: "contracts/Wrapper.sol:Wrapper",
            constructorArguments: [
                ["0x52eC4c36663AeAF99642542d22a0152cA4295467"]
            ]
        });
    } catch (e) {
        console.log("Error while verifying wrapper contract: ", e)
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
