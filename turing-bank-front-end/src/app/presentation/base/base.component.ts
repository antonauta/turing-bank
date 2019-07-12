import { Component, OnInit } from '@angular/core';
import { HiddenComponentsService } from '../shared/directives/hidden-components.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  displayStatus$: Observable<boolean>;

  constructor(private store: Store<{ display: boolean }>) {
    this.displayStatus$ =  this.store.pipe(select('display'))
   }

  ngOnInit() {
  }

}
