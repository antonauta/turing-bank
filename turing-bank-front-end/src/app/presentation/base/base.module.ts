import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [BaseComponent, HeaderComponent],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
