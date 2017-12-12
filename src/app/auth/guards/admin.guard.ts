import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenService} from '../shared/token.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private auth: TokenService) { }

  canActivate(): any {
   return this.auth.getUserFromToken().take(1).map(user => {

      if (user && user.role === 'Administrator') {
        return true;
      } else {
        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/noaccess');
        return false;
      }
    });

  }
}
