pragma solidity ^0.5.0;


contract UserRegistry {
  address public owner = msg.sender;

  mapping(string=>string) registry;

modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }

  function setRole (string memory addr, string memory role) public onlyBy(owner) {
    registry[addr] = role;
  }

  function getRole (string memory addr) public view returns(string memory) {
    return registry[addr];
  }
}
