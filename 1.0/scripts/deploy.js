const hre = require("hardhat");

async function main() {
    const HelloStorage = await hre.ethers.getContractFactory("HelloStorage");
    const contract = await HelloStorage.deploy("Hello Blockchain");

    await contract.waitForDeployment();

    console.log(`Contract deployed to: ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
