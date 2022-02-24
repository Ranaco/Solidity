pragma solidity ^0.8.11;
//SPDX-license: MIT

contract Token{

  address public admin;
  mapping(address => uint256) balances;
  constructor() {
    admin = msg.sender;
  }

  event Mint(address indexed to, uint256 value);

  function mint(uint256 amount, address reciever) public {
    require(msg.sender == admin);
    balances[reciever] += amount;    
    emit Mint(reciever, amount);
  }

  event Transfer(address indexed from, address indexed to, uint256 value);

  function transfer(address from, address to, uint256 amount) public {
    require(balances[from] > amount);
    balances[from] -= amount;
    balances[to] += amount;
    emit Transfer(from, to, amount);
  }

  function balanceOf(address account) public view returns (uint256) {
    return balances[account];
  }
}
