import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
declare const Materialize;

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  constructor(private ipfs: IpfsService, private contract: ContractService) { }
  ngOnInit() {
    this.contract.checkMfgTrigger.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });
  }
  setData(orderno) {
    console.log(orderno);
  }

}
