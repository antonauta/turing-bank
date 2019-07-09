import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './pages/home/home.module';
import { BaseModule } from './base/base.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    BaseModule,
    SharedModule
  ]
})
export class PresentationModule { }
