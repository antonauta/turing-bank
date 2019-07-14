import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';
import { UserModel } from 'src/app/models/user.model';
import { ValidationResult } from 'ts.validator.fluent/dist';
import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification/notification.service.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  cpf = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userValidatorInterface: UserValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface,
  ) { }

  ngOnInit() {

  }

  enviar() {

    const user: UserModel = {
      cpf: this.cpf,
      password: this.password
    }

    // validar campos
    const fields: ValidationResult = this.userValidatorInterface
      .signinValitador(user);

    if (!fields.IsValid) {
        this.notificationServiceInterface.notify(fields.Errors);
        return;
    }



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
