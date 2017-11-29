import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CustomerService } from './customers/shared/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { AddressListComponent } from './addresses/address-list/address-list.component';
import {AddressService} from './addresses/shared/address.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login.component';

const appRoutes: Routes = [
  { path: 'customer/:id',
    component: CustomerDetailComponent },
  { path: 'customers/create',
    component: CustomerCreateComponent },
  {
    path: 'customers',
    component: CustomerListComponent,
    data: { title: 'Customer List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: '',
    component: LandingComponent,
    data: { title: 'Welcome to the Customer App' }
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerCreateComponent,
    AddressListComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [
    CustomerService,
    AddressService,
    NgbCarouselConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }

