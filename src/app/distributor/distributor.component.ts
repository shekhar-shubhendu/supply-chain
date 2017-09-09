import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';

import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  constructor(private ipfs: IpfsService, private contract: ContractService) { }
  ngOnInit() {
    this.contract.checkOrderGen.subscribe(result => {
      console.log(result);
    });
  }

  fileChange(event: any) {
    this.ipfs.fileChange(event.target.files).subscribe(
      data => {console.log(data)},
      error => {console.log(error)}
      );
  }
}
