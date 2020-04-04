import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, AlertService, LoadService } from '../../shared';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loading = false;
  credentials: any = {};

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private loadService: LoadService,
    private router: Router,
  ) { }

  ngOnInit() { }

  login() {
    this.loadService.emitLoadEvent(true);

    this.authService.login(this.credentials).subscribe(
      (data) => {
        this.router.navigate(['/admin/course']);
      },
      (err) => {
        this.loadService.emitLoadEvent(false);
        if (err.status === 401) {
          this.alertService.show('error.invalid-credentials');
        } else {
          this.alertService.show('error.server');
        }
      },
    );
  }

}
