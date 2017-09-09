import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../services/contract.service'
declare var Materialize;
@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  @ViewChild('product') product: any;
  @ViewChild('orderNo') orderNo: any;
  @ViewChild('deliveryDate') deliveryDate: any;
  @ViewChild('temp') temp: any;
  @ViewChild('price') price: any;
  @ViewChild('quantity') quantity: any;

  constructor(private contract: ContractService) { }

  ngOnInit() {
  }

  onSubmit(event) {
    this.contract.createOrder(this.product.nativeElement.value,
      this.orderNo.nativeElement.value,
      this.deliveryDate.nativeElement.value.toString(),
      this.temp.nativeElement.value,
      this.price.nativeElement.value,
      this.quantity.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }

}
