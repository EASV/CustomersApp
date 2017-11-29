import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginGroup: FormGroup;
  constructor() {
    this.loginGroup = new FormGroup({
      username: new FormControl(),
      pw: new FormControl(),
      remember: new FormControl()
    });
  }

  ngOnInit() {
  }

  login() {

  }
}
