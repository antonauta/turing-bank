import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiddenComponentsService {

  private subject = new Subject<any>();

  changeDisplayStatus(hidden: boolean) {
    console.log(hidden, 'myStatus')
      this.subject.next(hidden);
  }

  getDisplayStatus(): Observable<any> {
      return this.subject.asObservable();
  }

  constructor() { }
}
