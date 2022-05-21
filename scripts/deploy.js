require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account: ", deployer.address);
    const Seed = await ethers.getContractFactory("Seed");
    const Wrapper = await ethers.getContractFactory("Wrapper")

    const seed = await Seed.deploy(ethers.utils.parseEther("0.01"))
    await seed.deployed()

    const wrapper = await Wrapper.deploy([seed.address])
    await wrapper.deployed()

    console.log("Deployed `Seed NFT` at: ", seed.address);
    console.log("Deployed `Wrapper NFT` at: ", wrapper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
