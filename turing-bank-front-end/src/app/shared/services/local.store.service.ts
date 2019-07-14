import { Injectable } from '@angular/core';
import { LocalStoreInterface } from 'src/app/core/interfaces/global/local.store.interface';


@Injectable({
  providedIn: 'root'
})
export class LocalStoreService implements LocalStoreInterface  {


  create(key: string, data: any) {
    localStorage.setItem(key, data);
  }  

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  cleanAll() {
    localStorage.clear();
  }
 

}