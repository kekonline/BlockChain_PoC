const { expect } = require("chai");

describe("EventDemo", function () {
  let eventDemo, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const EventDemo = await ethers.getContractFactory("EventDemo");
    eventDemo = await EventDemo.deploy();
    await eventDemo.waitForDeployment();
  });

  it("should emit UserRegistered", async () => {
    await expect(eventDemo.connect(addr1).registerUser())
      .to.emit(eventDemo, "UserRegistered")
      .withArgs(addr1.address, await getBlockTimestamp());
  });

  async function getBlockTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }
});
