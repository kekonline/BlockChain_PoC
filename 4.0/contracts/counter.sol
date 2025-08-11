// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    event CountChanged(uint256 newCount);

    function increment() public {
        count++;
        emit CountChanged(count);
    }

    function decrement() public {
        require(count > 0, "Counter is zero");
        count--;
        emit CountChanged(count);
    }
}
