import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService, UserService, NewPasswordComponent } from '../../../shared';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.scss'],
})
export class MenuComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  user: any = {};

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.authService
      .logout()
      .subscribe(
        () => this.router.navigate(['login']),
        () => this.router.navigate(['login']),
      );
  }

  openPasswordDialog() {
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      width: '450px',
    });
  }

  isAdminUser() {
    return this.userService.hasAuthority('ROLE_ADMIN');
  }

  toggleSidenavbar() {
    this.toggleSidenav.emit();
  }

}
