import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../../route.service';
import { CadastroComponent } from './cadastro.component';


const routes: Routes = [
    Route.withShell([
        { path: 'signup', component: CadastroComponent }
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class CadastroRoutingModule { }