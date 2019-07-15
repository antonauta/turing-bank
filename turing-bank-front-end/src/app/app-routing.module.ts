import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DadosBancarioComponent } from './pages/dados-bancario/dados-bancario.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { AppGuard } from './app.guard';

const routes: Routes = [
  {
    path: '*',
    redirectTo: 'home',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'dados-bancarios', 
    component: DadosBancarioComponent,
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: 'extrato', 
    component: ExtratoComponent,
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: 'transferencia', 
    component: TransferenciaComponent,
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: 'pagamentos', 
    component: PagamentosComponent,
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
