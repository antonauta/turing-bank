import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private pUser = new BehaviorSubject(null);
  currentUser = this.pUser.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(userCpf: string, userPassword: string) {
    console.log(userCpf, userPassword);
    return this.httpClient.post(`${environment.API_URL}/auth/login`, {
      cpf: userCpf,
      password: userPassword
    });
  }

  register(user: UserModel) {
    return this.httpClient.post(`${environment.API_URL}/auth/register`, user);
  }

  setUser(user) {
    this.pUser.next(user);
  }

  getUserAccountDetails(accountNumber: string) {
    return this.httpClient.get(`${environment.API_URL}/users/account/${accountNumber}`);
  }
}
