import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthExpiredInterceptor } from './interceptors/auth-expired.interceptor';

import {
  VersionComponent,
  ModalBasicComponent,
  LoadingComponent,
  NewPasswordComponent,
  NewPasswordService,
  ApiService,
  AuthService,
  UserService,
  UserRouteAccessService,
  PaginatorI18n,
} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    VersionComponent,
    ModalBasicComponent,
    LoadingComponent,
    NewPasswordComponent,
  ],
  entryComponents: [
    ModalBasicComponent,
    NewPasswordComponent,
  ],
  exports: [
    HttpClientModule,
    VersionComponent,
    FormsModule,
    ModalBasicComponent,
    LoadingComponent,
    NewPasswordComponent,
    RouterModule,
    TranslateModule,
    // Material Design Modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    ApiService,
    AuthService,
    UserService,
    NewPasswordService,
    UserRouteAccessService,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PaginatorI18n();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [
        Injector
      ]
    },
  ]
})
export class SharedModule { }
