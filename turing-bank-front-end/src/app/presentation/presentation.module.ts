import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './pages/home/home.module';
import { BaseModule } from './base/base.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    BaseModule
  ]
})
export class PresentationModule { }
