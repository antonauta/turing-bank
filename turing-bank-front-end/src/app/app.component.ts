import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'turing-bank-front-end';
  displayStatus$: Observable<boolean>;

  constructor(private store: Store<{ display: boolean }>) {
    this.displayStatus$ =  this.store.pipe(select('display'))
   }
}
