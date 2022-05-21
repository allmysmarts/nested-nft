const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Seed and wrapper", function() {
    before(async () => {
        [deployer, user1] = await ethers.getSigners()

        Seed = await ethers.getContractFactory("Seed")
        Wrapper = await ethers.getContractFactory("Wrapper")

        seed = await Seed.deploy()
        await seed.deployed()

        wrapper = await Wrapper.deploy([seed.address])
        await wrapper.deployed()
    })

    describe("Deployment", function () {
        it("Should assign the correct params", async () => {
            expect(await seed.MINT_PRICE()).to.equal(ethers.utils.parseEther("0.01"))
            expect(await wrapper.isValidCollections(seed.address)).to.equal(true)
        })
    })

    describe("Seed NFT", function () {
        it("Should be minted successfully", async () => {
            await expect(seed.mint()).to.be.revertedWith("Invalid fee");
            await expect(seed.connect(user1).mint({
                value: ethers.utils.parseEther("0.009")
            })).to.be.revertedWith("Invalid fee")

            await seed.connect(user1).mint({
                value: ethers.utils.parseEther("0.011")
            })
            expect(await seed.balanceOf(user1.address)).to.equal(1)
            expect(await seed.ownerOf(1)).to.equal(user1.address)
        })
    })

    describe("Wrapper NFT", function () {
        it("Should wrap seed", async () => {
            await expect(wrapper.connect(user1).wrap(ethers.constants.AddressZero, 1)).to.be.revertedWith("Invalid seed token");
            await expect(wrapper.connect(user1).wrap(seed.address, 0)).to.be.revertedWith("Invalid seed token");
            await expect(wrapper.wrap(seed.address, 1)).to.be.revertedWith("No seed owner");

            await expect(
                wrapper.connect(user1).wrap(seed.address, 1)
            ).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");

            await seed.connect(user1).setApprovalForAll(wrapper.address, true)
            await wrapper.connect(user1).wrap(seed.address, 1)

            expect(await seed.balanceOf(user1.address)).to.equal(0)
            expect(await seed.balanceOf(wrapper.address)).to.equal(1)
            expect(await seed.ownerOf(1)).to.equal(wrapper.address)

            expect(await wrapper.balanceOf(user1.address)).to.equal(1)
            expect(await wrapper.ownerOf(1)).to.equal(user1.address)
        })

        it("Should unwrap seed, and burn itself", async () => {
            await expect(wrapper.unwrap(0)).to.be.revertedWith("Invalid token")
            await expect(wrapper.unwrap(1)).to.be.revertedWith("Invalid owner")

            await wrapper.connect(user1).unwrap(1)

            expect(await wrapper.balanceOf(user1.address)).to.equal(0)
            expect(await seed.balanceOf(user1.address)).to.equal(1)

            expect(await seed.ownerOf(1)).to.equal(user1.address)
        })
    })
})