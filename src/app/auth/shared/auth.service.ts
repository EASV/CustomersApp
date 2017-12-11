import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {JwtHelper} from 'angular2-jwt';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from './user.model';
const url = environment.apiEndpoint + '/token';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(user: User): Observable<string> {
    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    return this.http.post<any>(url, body.toString(), {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).switchMap(token => Observable.create(obs => {
      localStorage.setItem('token', token.value);
      obs.next(token.value);
    }));
  }

  public logout(): Observable<boolean> {
    return Observable.create(obs => {
      localStorage.removeItem('token');
      obs.next(!this.getToken());
    });
  }

  public isAuthenticated(): Observable<boolean> {
    // get the token
    return Observable.create(obs => {
        obs.next(this.getToken());
    });
  }

  public getUserFromToken(): Observable<User> {
    return Observable.create(obs => {
      const token = this.getToken();
      let decoded: User;
      if (token) {
        const jwt = new JwtHelper();
        decoded = jwt.decodeToken(token);
        console.log(jwt.decodeToken(token));
      }
      obs.next(decoded);
    });

  }
}
