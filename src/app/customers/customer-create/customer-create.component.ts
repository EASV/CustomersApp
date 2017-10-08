import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../shared/customer.service';
import {Customer} from '../shared/customer.model';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private customerService: CustomerService) {
    this.customerGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/customers');
  }

  save() {
    const values = this.customerGroup.value;
    const customer: Customer = {
      firstName: values.firstName,
      lastName: values.lastName,
      addresses: []
    };
    this.customerService.create(customer)
      .subscribe(customer => {
        this.customerGroup.reset();
      });
  }
}
