import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DadosBancarioComponent } from './pages/dados-bancario/dados-bancario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {path: 'dados-bancarios', component: DadosBancarioComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
