import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from '@angular/router';

import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRouteAccessService implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const authorities = route.data.authorities;
    return this.checkLogin(authorities);
  }

  canLoad(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  checkLogin(authorities: string[]): boolean {
    if (!authorities || authorities.length === 0) {
      return true;
    }

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else if (!this.userService.hasAnyAuthority(authorities)) {
      this.router.navigate(['/']);
    }

    return true;
  }
}
