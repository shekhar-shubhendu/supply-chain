import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
declare const Materialize;
@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  @ViewChild('product') product: any;
  @ViewChild('orderNo') orderNo: any;
  @ViewChild('deliveryDate') deliveryDate: any;
  @ViewChild('temp') temp: any;
  @ViewChild('price') price: any;
  @ViewChild('quantity') quantity: any;
  @ViewChild('report') report: any;

  @ViewChild('prod') product1: any;
  @ViewChild('order') orderNo1: any;
  @ViewChild('ddate') deliveryDate1: any;
  @ViewChild('cost') price1: any;
  @ViewChild('quant') quantity1: any;

  name = 'Distributor';

  constructor(private ipfs: IpfsService, private contract: ContractService) { }
  ngOnInit() {
    this.contract.checkOrderGen.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });
  }

  fileChange(event: any) {
    this.ipfs.fileChange(event.target.files).subscribe(
      data => { this.report.nativeElement.value = data.msg; },
      error => {console.log(error)}
      );
  }

  setData(orderno) {
    console.log(orderno);
    this.contract.fetchInitialDetails(orderno).then(result => {
      console.log(result);
      Materialize.toast('New Order Received. Order No: ' + orderno, 4000);
      this.product.nativeElement.value = result[0];
      this.product1.nativeElement.value = result[0];

      this.orderNo.nativeElement.value = orderno;
      this.orderNo1.nativeElement.value = orderno;

      this.deliveryDate.nativeElement.value = result[1];
      this.temp.nativeElement.value = result[2];
      this.price.nativeElement.value = result[4];
      this.quantity.nativeElement.value = result[3];
      Materialize.updateTextFields();
    });
  }

  onSubmitReport(event) {
    this.contract.setReport(
      this.orderNo.nativeElement.value, 1,
      this.report.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Shipment sent. Tx id: ' + result.tx, 4000);
    });
  }

  onSubmit(event) {
    this.contract.setDistValues(this.orderNo1.nativeElement.value,
      this.name,
      this.deliveryDate1.nativeElement.value,
      this.price1.nativeElement.value,
      this.quantity1.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }
}
