const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloStorage", function () {
  let helloStorage;
  let owner;

  beforeEach(async function () {
    const HelloStorage = await ethers.getContractFactory("HelloStorage");
    [owner] = await ethers.getSigners();
    helloStorage = await HelloStorage.deploy("Hello Blockchain");
    await helloStorage.waitForDeployment(); // ✅ Replaces .deployed()
  });

  it("Should return the initial message", async function () {
    expect(await helloStorage.getMessage()).to.equal("Hello Blockchain");
  });

  it("Should update the message", async function () {
    await helloStorage.setMessage("Updated Message");
    expect(await helloStorage.getMessage()).to.equal("Updated Message");
  });

  it("Should emit event when message is updated", async function () {
    await expect(helloStorage.setMessage("Another Message"))
      .to.emit(helloStorage, "MessageUpdated")
      .withArgs("Another Message");
  });
});
