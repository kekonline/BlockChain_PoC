// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BalanceCheck {
    mapping(address => uint256) private balances;

    uint256 public constant MIN_BALANCE = 1 ether;

    // Allow users to deposit ether to the contract (update their balance)
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // Withdraw a certain amount only if balance is >= MIN_BALANCE
    function withdraw(uint256 amount) external {
        uint256 userBalance = balances[msg.sender];
        require(userBalance >= MIN_BALANCE, "Balance below minimum limit");
        require(amount <= userBalance, "Insufficient balance");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // Helper to get user's balance
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
