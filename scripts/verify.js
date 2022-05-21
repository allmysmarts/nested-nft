require("dotenv").config();
const { ethers, run } = require("hardhat");

async function main() {
    console.log("Verifying contract ...");
    try {
        await run("verify:verify", {
          address: "0x2AF55B385De54E9feD11964529405605269446CF",
          contract: "contracts/Seed.sol:Seed",
          constructorArguments: [
            ethers.utils.parseEther("0.01").toString()
          ]
        });
    } catch (e) {
        console.log("Error while verifying seed contract: ", e)
    }

    try {
        await run("verify:verify", {
            address: "0x4bB362e6DDD182e9bA09d7E63a25E3C428389AF2",
            contract: "contracts/Wrapper.sol:Wrapper",
            constructorArguments: [
                ["0x2AF55B385De54E9feD11964529405605269446CF"]
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
