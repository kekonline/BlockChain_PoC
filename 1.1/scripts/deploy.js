const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const ownerAddress = deployer.address;

    const AdvancedVault = await hre.ethers.getContractFactory("AdvancedVault");
    const vault = await AdvancedVault.deploy(ownerAddress);

    // Use the .deployed() method here, but only if available
    if (vault.deployed) {
        await vault.deployed();
    } else {
        console.log("Warning: 'deployed()' method not found, proceeding without waiting");
    }

    console.log("✅ AdvancedVault deployed to:", vault.address);
    console.log("👑 Owner set to:", ownerAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

