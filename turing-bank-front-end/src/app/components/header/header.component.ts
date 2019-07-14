import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/interfaces/services/auth/auth.service';
import { Observable } from 'rxjs';
import { LocalStoreInterface } from 'src/app/core/interfaces/global/local.store.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: string;
  

  constructor(
    private authService: AuthService,
    private localStoreInterface: LocalStoreInterface
    ) { }

  ngOnInit() {
    this.currentUser = this.localStoreInterface.get('currentUser');
  }

}
