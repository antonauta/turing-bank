import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  cpf = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  enviar() {
    console.log(this.cpf, this.password);
    this.authService.login(this.cpf, this.password)
      .subscribe(
        (userDate: any) => {
          alert('Usuário logado com sucesso');
          console.log(userDate);
          localStorage.setItem('token', userDate.token);
          this.authService.setUser(userDate.user);
          this.router.navigateByUrl('/dados-bancarios');
        },
        (error) => {
          console.log(error);
        });
  }

}
