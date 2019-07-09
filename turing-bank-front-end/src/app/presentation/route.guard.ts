import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class RouteGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: null
  ) { }

  canActivate(): boolean {
    // if (this.authenticationService.isAuthenticated()) {
    //   return true;
    // }

    // log.debug('Não autenticado, redirecionando...');
    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

}