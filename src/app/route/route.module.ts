import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailerComponent } from '../retailer/retailer.component';
import { DistributorComponent } from '../distributor/distributor.component';
import { ManufactureComponent } from '../manufacture/manufacture.component';
import { SupplierComponent } from '../supplier/supplier.component';
import { LoginComponent } from '../login/login.component';
const routes: Routes = [
 {
   path: 'retailer',
   component: RetailerComponent,
   pathMatch: 'full'
 },
 {
   path: 'distributor',
   component: DistributorComponent,
   pathMatch: 'full'
 },
 {
   path: 'manufacturer',
   component: ManufactureComponent,
   pathMatch: 'full'
 },
 {
   path: 'supplier',
   component: SupplierComponent,
   pathMatch: 'full'
 },
 {
   path: 'login',
   component: LoginComponent,
   pathMatch: 'full'
 },
 {
   path: '',
   component: LoginComponent
 }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
  declarations: []
})
export class RouteModule { }
