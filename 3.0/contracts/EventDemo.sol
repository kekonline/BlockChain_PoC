// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EventDemo {
    mapping(address => bool) public isRegistered;

    event UserRegistered(address indexed user, uint256 timestamp);
    event TokenTransferred(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    function registerUser() external {
        require(!isRegistered[msg.sender], "Already registered");
        isRegistered[msg.sender] = true;
        emit UserRegistered(msg.sender, block.timestamp);
    }

    function transferMockToken(address to, uint256 amount) external {
        // This is just a mock function to emit an event.
        emit TokenTransferred(msg.sender, to, amount);
    }
}
