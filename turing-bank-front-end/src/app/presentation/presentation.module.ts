import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './pages/home/home.module';
import { BaseModule } from './base/base.module';
import { CadastroModule } from './pages/cadastro/cadastro.module'
import { DadosBancariosModule } from './pages/dados-bancarios/dados-bancarios.module';
import { LoginModule } from './pages/login/login.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    CadastroModule,
    DadosBancariosModule,
    BaseModule,
    LoginModule, 
  ]
})
export class PresentationModule { }
