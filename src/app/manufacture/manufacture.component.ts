import { Component, OnInit, ViewChild } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import 'rxjs/add/operator/map';
import { ContractService } from '../services/contract.service';
import { HttpClient } from '@angular/common/http'
declare const Materialize;

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  dataValue = [];
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

  name = 'Manufacturer';

  constructor(private ipfs: IpfsService, private contract: ContractService, private http: HttpClient) { }
  ngOnInit() {
    this.contract.checkMfgTrigger.subscribe(result => {
      if (result !== 'noop') {
      this.setData(result);
      }
    });
    this.contract.checkReportTrigger.subscribe(result => {
      if (result.length >= 1) {
      this.setReport(result);
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
      this.orderNo.nativeElement.value = orderno;
      this.orderNo1.nativeElement.value = orderno;
      this.temp.nativeElement.value = result[2];
      this.price.nativeElement.value = result[2];
      Materialize.updateTextFields();
    });
    this.contract.getDistValues(orderno).then(result => {
      this.deliveryDate.nativeElement.value = result[1];
      this.price.nativeElement.value = result[2];
      this.quantity.nativeElement.value = result[3];
      Materialize.updateTextFields();
    });
  }

  setReport(result) {
    if ( result[1] == '3') {
      this.http.get('http://127.0.0.1:8080/ipfs/' + result[2], { responseType: 'text'}).subscribe(response => {
        this.dataValue.push({orderno: result[0], fileInfo: response + result[2]});
      });
    }
  }

  onSubmitReport(event) {
    this.contract.setReport(
      this.orderNo.nativeElement.value, 2,
      this.report.nativeElement.value).then(result => {
      Materialize.toast('Shipment sent. Tx id: ' + result.tx, 4000);
    });
  }

  onSubmit(event) {
    this.contract.setMfgValues(this.orderNo1.nativeElement.value,
      this.name,
      this.product1.nativeElement.value,
      this.deliveryDate1.nativeElement.value,
      this.price1.nativeElement.value,
      this.quantity1.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }
}
