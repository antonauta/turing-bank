import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    BaseComponent, 
    HeaderComponent
  ],
  exports: [
    BaseComponent, 
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ]
})
export class BaseModule { }
