import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from './core/interfaces/services/auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad  {
  

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  private isAuthenticated: boolean = this.authService.isAuthenticated();

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authStatus();
  }


  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.authStatus();
  }

  authStatus() {

    if(this.isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl('/home');
    return false;
  }
}