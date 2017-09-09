pragma solidity ^0.4.2;

contract UserRegistry {
  address public owner = msg.sender;

  mapping(string=>string) registry;

modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }

  function setRole(string addr, string role) onlyBy(owner) {
    registry[addr] = role;
  }

  function getRole(string addr) constant returns(string) {
    return registry[addr];
  }
}
