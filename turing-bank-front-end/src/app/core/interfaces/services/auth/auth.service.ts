import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoggedModel } from 'src/app/models/userLogged.model';
import { LocalStoreInterface } from '../../global/local.store.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {



  // private pUser = new BehaviorSubject(null);
  // currentUser = this.pUser.asObservable();

  constructor(private httpClient: HttpClient, private localStoreInterface: LocalStoreInterface, ) { }

  /**
   * Login de usuario
   * @param userCpf 
   * @param userPassword 
   */
  login(userCpf: string, userPassword: string) {
    return this.httpClient.post(`${environment.API_URL}/auth/login`, {
      cpf: userCpf,
      password: userPassword
    });
  }

  /**
   * Deslogar usuario
   */
  logout() {
    this.localStoreInterface.cleanAll();
  }

  /**
   * Verifoca se usuário esta autenticado
   */
  isAuthenticated(): boolean {
    return !!(this.localStoreInterface.get('user_data') && this.localStoreInterface.get('token'));
  }

  /**
   * Cadastra usuario
   * @param user
   */
  register(user: UserModel) {
    return this.httpClient.post(`${environment.API_URL}/auth/register`, user);
  }

  // setUser(user) {
  //   this.pUser.next(user);
  // }

  /**
   * Obtem numero das contas
   */
  getAllAccounts(): Observable<UserLoggedModel[]> {
    return this.httpClient.get<UserLoggedModel[]>(`${environment.API_URL}/users`)
  }

  /**
   * Obter informacao da conta do usuario logado
   * @param accountNumber 
   */
  getUserAccountDetails(accountNumber: string): Observable<UserLoggedModel> {
    return this.httpClient.get<UserLoggedModel>(`${environment.API_URL}/users/account/${accountNumber}`);
  }
}
