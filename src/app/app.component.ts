import { Component } from '@angular/core';
import {Customer} from './customer/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  customers: Customer[];
  constructor() {
    this.customers = [
      {firstName: 'Lars', lastName: 'Smurfi'},
      {firstName: 'Bilbo', lastName: 'Baggins'},
      {firstName: 'Singo', lastName: 'Dingo'}
    ];
  }
}
