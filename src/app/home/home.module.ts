import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent, homeRoute } from './';

import { MenuComponent } from './layouts';

@NgModule({
  declarations: [HomeComponent, MenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([homeRoute]),
  ]
})
export class HomeModule { }
