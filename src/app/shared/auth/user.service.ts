import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private $localStorage: LocalStorageService
  ) { }

  getUser() {
    return this.$localStorage.retrieve('user');
  }

  storeAuthenticationUser(user) {
    this.$localStorage.store('user', user);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    const user = this.getUser();

    for (const authority of authorities) {
      if (user && user.roles.includes(authority)) {
        return true;
      }
    }

    return false;
  }

  hasAuthority(authority: string): boolean {
    const user = this.getUser();

    if (user && user.roles.includes(authority)) {
      return true;
    }

    return false;
  }
}
