import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DadosBancarioComponent } from './pages/dados-bancario/dados-bancario.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {path: 'dados-bancarios', component: DadosBancarioComponent}, 
  {path: 'extrato', component: ExtratoComponent},
  {path: 'transferencia', component: TransferenciaComponent},
  {path: 'pagamentos', component: PagamentosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
