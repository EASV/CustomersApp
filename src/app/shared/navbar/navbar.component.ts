import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';
import {Router} from '@angular/router';
import {User} from '../../auth/shared/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.auth.getUserFromToken()
      .subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.auth.logout().subscribe(done => {
      if (done) {
        this.user = null;
        this.router
          .navigateByUrl('');
      }
    });
  }

}
