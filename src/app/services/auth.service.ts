import { Injectable } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const userartifact = require('../../../build/contracts/UserRegistry.json');

declare var Wallet: any;

@Injectable()
export class AuthService {
  wallet: any;
  web3: any;
  UserRegistry: any;
  AuthContract: any;
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545'));

    this.UserRegistry = contract(userartifact);
    this.UserRegistry.setProvider(this.web3.currentProvider);
    this.UserRegistry.defaults({from: this.web3.eth.coinbase});
    this.UserRegistry.deployed().then(instance => {
      this.AuthContract = instance;
      this.AuthContract.setRole('0x6c703a41ee10a8b8fcf7dc04754d25e6a849a14d', 'dist');
      this.AuthContract.setRole('0x13a9a84ee2fb24e2cf07315bc56c74d3b4c964b6', 'mfg');
      this.AuthContract.setRole('0xa76e4b9a16b0f3aed91d6f136b1c3c92a3928ee6', 'supplier');
      this.AuthContract.setRole('0x5493020ba31efe80c45734ecff059d7b6c25353d', 'retail');
    });
  }

  checkCredential(keystore: string, password: string) {
    let role: any;
    try {
      this.wallet = Wallet.getWalletFromPrivKeyFile(keystore, password);
      const address = this.wallet.getAddressString();
        role = this.AuthContract.getRole(address).then(function(result){
          return result;
        }).catch(function(e){
          console.log(e);
        });
    }catch (e) {
      role = 'not found';
    }
    return role;
  }

}
