import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private translate: TranslateService,
    private snackbar: MatSnackBar,
  ) { }

  show(messageKey: string, duration?: number) {
    const snackDuration = duration ? duration : 3000;
    this.translate
      .get('general.ok')
      .subscribe((ok: string) => {
        this.translate
          .get(messageKey)
          .subscribe((message) => {
            this.snackbar
              .open(
                message,
                ok.toUpperCase(),
                { duration: snackDuration }
              );
          });
      });
  }
}
