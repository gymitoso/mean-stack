import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoadService } from '../../services/load.service';
import { AlertService } from '../../services/alert.service';
import { NewPasswordService } from './new-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  passwords: any = {};

  constructor(
    private passwordService: NewPasswordService,
    private loadService: LoadService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<NewPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm() {
    this.passwordService
      .changePassword(this.passwords)
      .subscribe(
        (data) => {
          this.loadService.emitLoadEvent(false);
          this.alertService.show('password.updated');
          this.dialogRef.close(null);
        },
        (err) => {
          this.loadService.emitLoadEvent(false);
          if (err.status === 400) {
            this.alertService.show('error.current-password');
          } else {
            this.alertService.show('error.server');
          }
        }
      );
  }
}
