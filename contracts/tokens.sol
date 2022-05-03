pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KCS is ERC20 {
    constructor() ERC20("KucoinToken", "KCS") {
        _mint(msg.sender, 1000);
    }
}