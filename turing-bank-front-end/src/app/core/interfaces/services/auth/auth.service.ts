import { Injectable } from '@angular/core';
import { URL } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(cpf, password) {
    return this.httpClient.post(`${URL}auth/login`, {
      cpf,
      password
    });
  }

  register(user: UserModel) {
    return this.httpClient.post(`${URL}auth/register`, user);
  }

  getUserAccountDetails(accountNumber: string) {
    return this.httpClient.get(`${URL}users/account/${accountNumber}`);
  }
}
