import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const loginRoute: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      authorities: [],
    },
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      // otherwise redirect to home (we can put a not found page)
      {
        path: '**',
        redirectTo: '/'
      }
    ],
  },
];
