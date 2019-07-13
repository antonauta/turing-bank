import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(cpf, password) {
    return this.httpClient.post(`${environment.API_URL}/auth/login`, {
      cpf,
      password
    });
  }

  register(user: UserModel) {
    return this.httpClient.post(`${environment.API_URL}/auth/register`, user);
  }

  getUserAccountDetails(accountNumber: string) {
    return this.httpClient.get(`${environment.API_URL}/users/account/${accountNumber}`);
  }
}
