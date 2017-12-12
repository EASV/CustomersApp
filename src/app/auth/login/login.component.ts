import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenService} from '../shared/token.service';
import {Router} from '@angular/router';
import {LoginService} from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;
  constructor(config: NgbCarouselConfig,
              private auth: LoginService,
              private router: Router) {
    this.loginGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      remember: new FormControl()
    });
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.loginGroup.value).subscribe(token => {
      if (token) {
        this.router
          .navigateByUrl('/');
      } else {

      }
    });
  }


}
