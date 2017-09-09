var UserRegistry = artifacts.require("./UserRegistry.sol");
var OrderRegistry = artifacts.require("./OrderRegistry.sol");
module.exports = function(deployer) {
  deployer.deploy(UserRegistry);
  deployer.deploy(OrderRegistry);
};
