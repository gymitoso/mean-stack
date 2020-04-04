import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(
      (err: HttpErrorResponse) => {
        const router: Router = this.injector.get(Router);

        // you can redirect for a specific unauthorized page
        if (router.url && err.status === 401) {
          const authService: AuthService = this.injector.get(AuthService);
          authService.logout().subscribe(
            data => router.navigate(['login']),
            error => router.navigate(['login'])
          );
        }

        return throwError(err);
      }
    ));
  }

}
