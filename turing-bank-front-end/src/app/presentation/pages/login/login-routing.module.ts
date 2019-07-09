import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../../route.service';
import { LoginComponent } from './login.component';

const routes: Routes = [
  Route.withShell([
    { path: 'signin', component: LoginComponent },
  ]),
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
