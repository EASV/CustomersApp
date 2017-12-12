import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../auth/shared/token.service';
import {Router} from '@angular/router';
import {User} from '../../auth/shared/user.model';
import {LoginService} from '../../auth/shared/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  constructor(private tokenService: TokenService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.tokenService.getUserFromToken()
      .subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.loginService.logout().subscribe(done => {
      if (done) {
        this.user = null;
        this.router
          .navigateByUrl('');
      }
    });
  }

}
