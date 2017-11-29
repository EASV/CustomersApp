import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  loginGroup: FormGroup;
  constructor(config: NgbCarouselConfig) {
    this.loginGroup = new FormGroup({
      username: new FormControl(),
      pw: new FormControl(),
      remember: new FormControl()
    });
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
  }

  login() {

  }

}
