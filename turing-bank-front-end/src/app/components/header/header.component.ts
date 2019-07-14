import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/interfaces/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<string>;
  

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser;
  }

}
