import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosBancariosComponent } from './dados-bancarios.component';
import { DadosBancariosRoutingModule } from './dados-bancarios-routing.module';
import { MaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [DadosBancariosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DadosBancariosRoutingModule
  ]
})
export class DadosBancariosModule { }
