import { Injectable } from '@angular/core';
import { URL } from '../api/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(cpf, password) {
    return this.httpClient.post(URL + 'auth/login', {
      cpf,
      password
    });
  }

  register(user) {
    return this.httpClient.post(URL + 'auth/register', {

    });
  }
}
