import { ethers } from "ethers";
// import * as dotenv from "dotenv";
import ABI from "../artifacts/contracts/EventDemo.sol/EventDemo.json" assert { type: "json" };
// dotenv.config();

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Hardhat
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace after deployment

const contract = new ethers.Contract(contractAddress, ABI.abi, provider);

console.log("Listening for events...");

contract.on("UserRegistered", (user, timestamp) => {
    console.log(`✅ UserRegistered: ${user}, at ${new Date(timestamp * 1000).toISOString()}`);
});

contract.on("TokenTransferred", (from, to, amount) => {
    console.log(`💸 TokenTransferred: ${from} -> ${to}, Amount: ${amount.toString()}`);
});
