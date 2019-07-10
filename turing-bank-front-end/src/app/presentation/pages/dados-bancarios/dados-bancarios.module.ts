import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosBancariosComponent } from './dados-bancarios.component';
import { DadosBancariosRoutingModule } from './dados-bancarios-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [DadosBancariosComponent],
  imports: [
    CommonModule,
    SharedModule,
    DadosBancariosRoutingModule
  ]
})
export class DadosBancariosModule { }
