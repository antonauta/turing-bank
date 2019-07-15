import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }


    // 0 = depósito 1 = trasferéncia
    operation(money: number, accountDestination: string, description: string) {
      // const headers_object = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      return this.httpClient.post(`${environment.API_URL}/operation`, {
        description: description,
        value: money,
        destination: accountDestination
      });
    }

    // Gera extrato, padrão de 7 dias caso não informe o período
    getStatement(initDate = '', lastDate = '') {
      if (initDate && lastDate) {
        return this.httpClient.get(`${environment.API_URL}/operation/by_user`);
      } else {
        return this.httpClient.get(`${environment.API_URL}/operation/by_user?initDate=${initDate}&lastDate=${lastDate}`);
      }
    }
}
