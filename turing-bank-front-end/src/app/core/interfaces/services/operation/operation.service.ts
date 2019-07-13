import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private httpClient: HttpClient) { }

    // 0 = depósito 1 = trasferéncia
    operation(typeOfOperation: number, money: number, accountDestination) {
      return this.httpClient.post(`${URL}operation`, {
        type: typeOfOperation,
        value: money,
        destination: accountDestination
      });
    }

    // Gera extrato, padrão de 7 dias caso não informe o período
    getStatement(initDate = '', lastDate = '') {
      if (initDate && lastDate) {
        return this.httpClient.get(`${URL}operation`);
      } else {
        return this.httpClient.get(`${URL}operation?initDate=${initDate}&lastDate=${lastDate}`);
      }
    }
}
