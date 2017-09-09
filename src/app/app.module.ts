import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { ContractService } from './services/contract.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RetailerComponent } from './retailer/retailer.component';
import { DistributorComponent } from './distributor/distributor.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { SupplierComponent } from './supplier/supplier.component';
import { LoginComponent } from './login/login.component';

import { IpfsService } from './services/ipfs.service'
import { RouteModule } from './route/route.module'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouteModule
  ],
  declarations: [
    AppComponent,
    RetailerComponent,
    DistributorComponent,
    ManufactureComponent,
    SupplierComponent,
    LoginComponent
  ],
  providers: [AuthService, ContractService, IpfsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
