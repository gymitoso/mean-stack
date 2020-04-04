import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

import { ApiService } from '../services/api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private $localStorage: LocalStorageService
  ) { }

  getToken() {
    return this.$localStorage.retrieve('token');
  }

  isAuthenticated(): boolean {
    if (this.getToken() && this.userService.getUser()) {
      return true;
    }

    return false;
  }

  login(credentials): Observable<any> {
    const data = {
      email: credentials.username,
      password: credentials.password
    };

    return this.apiService.post('/auth/login', data).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      if (resp && resp.token && resp.user) {
        this.storeAuthenticationToken(resp.token);
        this.userService.storeAuthenticationUser(resp.user);
        return true;
      }

      return false;
    }
  }

  storeAuthenticationToken(jwt) {
    this.$localStorage.store('token', jwt);
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      this.$localStorage.clear('token');
      this.$localStorage.clear('user');

      observer.next(1);
      observer.complete();
      observer.unsubscribe();
    });
  }
}
