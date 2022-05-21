require("dotenv").config();
const { ethers, run } = require("hardhat");

async function main() {
    console.log("Verifying contract ...");
    try {
        await run("verify:verify", {
          address: "0x3aF0680AF991B0Be1F6ff084942C53007093B4Ee",
          contract: "contracts/Seed.sol:Seed",
          constructorArguments: []
        });
    } catch (e) {
        console.log("Error while verifying seed contract: ", e)
    }

    try {
        await run("verify:verify", {
            address: "0x3908Eddc3c5aB4Ef05cFA9916c840d57819A9372",
            contract: "contracts/Wrapper.sol:Wrapper",
            constructorArguments: [
                ["0x3aF0680AF991B0Be1F6ff084942C53007093B4Ee"]
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
