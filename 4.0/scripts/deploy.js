const hre = require("hardhat");

async function main() {
    const EventDemo = await hre.ethers.getContractFactory("EventDemo");
    const contract = await EventDemo.deploy();
    await contract.waitForDeployment();
    console.log(`Contract deployed to: ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
