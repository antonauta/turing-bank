import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../../route.service';
import { DadosBancariosComponent } from './dados-bancarios.component';

const routes: Routes = [
    Route.withShell([
        { path: 'bank', component: DadosBancariosComponent }
    ]),
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DadosBancariosRoutingModule { }