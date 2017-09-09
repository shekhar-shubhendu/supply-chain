import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const Web3 = require('web3');
const contract = require('truffle-contract');
const orderartifact = require('../../../build/contracts/OrderRegistry.json');

@Injectable()
export class ContractService {
  web3: any;
  OrderRegistry: any;
  OrderContract: any;
  private ordergenerated = new BehaviorSubject<string>('noop');
  private mfgtrigger = new BehaviorSubject<string>('noop');
  private suppliertrigger = new BehaviorSubject<string>('noop');
  private reporttigger = new BehaviorSubject<string[]>([]);
  private reportcat = new BehaviorSubject<string>('noop');

  checkOrderGen = this.ordergenerated.asObservable();
  checkMfgTrigger = this.mfgtrigger.asObservable();
  checkSupplierTrigger = this.suppliertrigger.asObservable();
  checkReportTrigger = this.reporttigger.asObservable();
  checkReportCat = this.reportcat.asObservable();

  constructor() {
    this.web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545'));

    this.OrderRegistry = contract(orderartifact);
    this.OrderRegistry.setProvider(this.web3.currentProvider);
    this.OrderRegistry.defaults({from: this.web3.eth.coinbase});

    this.OrderRegistry.deployed().then(instance => {
      instance.OrderGenerated().watch((err, resp) => {
        this.ordergenerated.next(resp.args.orderno);
      })
    });

    this.OrderRegistry.deployed().then(instance => {
      instance.MfgTrigger().watch((err, resp) => {
        this.mfgtrigger.next(resp.args.orderno);
      })
    });

    this.OrderRegistry.deployed().then(instance => {
      instance.SupplyTrigger().watch((err, resp) => {
        this.suppliertrigger.next(resp.args.orderno);
      })
    });

    this.OrderRegistry.deployed().then(instance => {
      instance.ReportSubmit().watch((err, resp) => {
        this.reporttigger.next([resp.args.orderno, String(resp.args.category), resp.args.report]);
      })
    });
  }

  createOrder(orderno: string, product: string, temp: string, value: string, quantity: string, delivery: string) {
    return this.OrderRegistry.deployed().then(instance => {
     return instance.createOrder(orderno, product, temp, value, quantity, delivery, {gas: 5000000}).then(result => {
        return result;
      })
    });
  }

  setDistValues(orderno: string, name: string, delivery: string, value: string, quantity: string) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.setDistValues(orderno, name, delivery, value, quantity, {gas: 5000000}).then(result => {
         return result;
       })
     });
  }

  setMfgValues(orderno: string, name: string, material: string, delivery: string, value: string, quantity: string) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.setMfgValues(orderno, name, material, delivery, value, quantity, {gas: 5000000}).then(result => {
         return result;
       })
     });
  }

  setReport(orderno: string, category: number, report: string) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.setReport(orderno, category, report, {gas: 5000000}).then(result => {
         return result;
       })
     });
  }

  getReport(orderno: string, category: number) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.getReport(orderno, category, {gas: 5000000}).then(result => {
         return result;
       })
     });
  }

  fetchInitialDetails(orderno: string) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.fetchInitialDetails(orderno).then(result => {
         return result;
       })
     });
  }

  getDistValues(orderno: string) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.getDistValues(orderno).then(result => {
         return result;
       })
     });
  }

  getMfgDetails(orderno: string) {
    return this.OrderRegistry.deployed().then(instance => {
      return instance.getMfgDetails(orderno).then(result => {
         return result;
       })
     });
  }



}
