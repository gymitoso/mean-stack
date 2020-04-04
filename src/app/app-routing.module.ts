import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRouteAccessService } from './shared';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    canLoad: [UserRouteAccessService],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  // otherwise redirect to home (we can put a not found page)
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
