import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CustomerService } from './customers/shared/customer.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { AddressListComponent } from './addresses/address-list/address-list.component';
import {AddressService} from './addresses/shared/address.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import {AuthService} from './auth/shared/auth.service';
import {AuthGuard} from './auth/guards/auth.guard';
import { NoAccessComponent } from './shared/no-access/no-access.component';
import {AdminGuard} from './auth/guards/admin.guard';

const appRoutes: Routes = [
  { path: 'customer/:id',
    component: CustomerDetailComponent,
    canActivate: [AdminGuard] },
  { path: 'customers/create',
    component: CustomerCreateComponent,
    canActivate: [AdminGuard] },
  {
    path: 'customers',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Customer List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'noaccess',
    component: NoAccessComponent,
    data: { title: 'Not Allowed here!!!' }
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
    LoginComponent,
    NoAccessComponent
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
    NgbCarouselConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

