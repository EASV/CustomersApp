import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import {CustomerService} from '../shared/customer.service';
import {Customer} from '../shared/customer.model';
import {Address} from '../../addresses/shared/address.model';
import 'rxjs/add/observable/forkJoin';
import {AddressService} from '../../addresses/shared/address.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerGroup: FormGroup;
  customerCreatedSuccessfully= false;
  addressesIn: Address[];
  constructor(private router: Router,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private addressService: AddressService
              ) {
    this.customerGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.addressesIn = [];
  }

  isInvalid(controlName: string) {
    const control = this.customerGroup.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  isValid(controlName: string) {
    const control = this.customerGroup.controls[controlName];
    return !control.invalid && (control.touched || control.dirty);
  }

  back() {
    this.router.navigateByUrl('/customers');
  }

  closeAlert() {
    this.customerCreatedSuccessfully = false;
  }

  save() {
    // 1: Create all Addresses on the backend
    // and store the ids returned in a []
    const values = this.customerGroup.value;
    const addressIds = [];
    const addressRequests = [];
    this.addressesIn.forEach(address => {
      addressRequests.push(this.addressService.create(address)
        .map(addressBack => {
          addressIds.push(addressBack.id);
        }));
    });
    Observable.forkJoin(addressRequests)
      .switchMap(() =>
        // 2: Add a AddressIds Array to the CustomerModel so it
        // can be stored on the backend
        this.customerService.create({
          firstName: values.firstName,
          lastName: values.lastName,
          addressIds: addressIds
        })
      ).subscribe(customer => {
        this.customerGroup.reset();
        this.customerCreatedSuccessfully = true;
        this.addressesIn = [];
        setTimeout(() => {
          this.customerCreatedSuccessfully = false;
        }, 3000);
      });
  }
}
