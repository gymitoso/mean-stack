import { Injectable } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {
  constructor(
    private apiService: ApiService,
  ) {}

  changePassword(passwords) {
    const body = {
      newPassword: passwords.newPassword,
      oldPassword: passwords.oldPassword,
    };
    return this.apiService.post('/users/change-password', body);
  }
}
