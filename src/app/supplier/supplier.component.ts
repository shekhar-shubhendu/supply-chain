import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
declare const Materialize;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private ipfs: IpfsService, private contract: ContractService) { }
  ngOnInit() {
    this.contract.checkSupplierTrigger.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });
  }
  setData(orderno) {
    console.log(orderno);
  }

}
