const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BalanceCheck", function () {
  let contract;
  let user;

  beforeEach(async function () {
    [user] = await ethers.getSigners();
    const BalanceCheck = await ethers.getContractFactory("BalanceCheck");
    contract = await BalanceCheck.deploy();
    await contract.waitForDeployment();
  });

  it("should revert withdrawal if balance below minimum", async function () {
    await contract.connect(user).deposit({ value: ethers.parseEther("0.5") });
    await expect(contract.connect(user).withdraw(ethers.parseEther("0.1"))).to.be.revertedWith(
      "Balance below minimum limit"
    );
  });

  it("should allow withdrawal if balance >= minimum", async function () {
    await contract.connect(user).deposit({ value: ethers.parseEther("1") });
    await expect(contract.connect(user).withdraw(ethers.parseEther("0.5"))).to.not.be.reverted;

    const remaining = await contract.getBalance(user.address);
    expect(remaining).to.equal(ethers.parseEther("0.5"));
  });
});
