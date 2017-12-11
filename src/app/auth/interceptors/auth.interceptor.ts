import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../shared/auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthService);
    const token = auth.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }


    return next.handle(request);
  }
}
