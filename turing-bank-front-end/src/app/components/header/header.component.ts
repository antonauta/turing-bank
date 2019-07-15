import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/interfaces/services/auth/auth.service';
import { Observable } from 'rxjs';
import { LocalStoreInterface } from 'src/app/core/interfaces/global/local.store.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  

  constructor(
    private localStoreInterface: LocalStoreInterface,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.currentUser = this.localStoreInterface.get('currentUser');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('home');
    this.currentUser = false;
  }

}
