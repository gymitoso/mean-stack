import { Route } from '@angular/router';

import {
  UserRouteAccessService,
} from '../shared';

import { HomeComponent } from './home.component';

export const homeRoute: Route = {
  path: '',
  component: HomeComponent,
  data: {
    authorities: ['ADMIN', 'SYSADMIN'],
  },
  canActivate: [UserRouteAccessService],
  children: [
  ],
};
