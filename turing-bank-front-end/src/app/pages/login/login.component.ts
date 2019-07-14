import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';
import { UserModel } from 'src/app/models/user.model';
import { ValidationResult } from 'ts.validator.fluent/dist';
import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification/notification.service.interface';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);

  cpf = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userValidatorInterface: UserValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface,
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      password: this.password,
      cpf: this.cpf,
    });

  }

  enviar() {

    const user: UserModel = this.loginForm.value;
    
    // validar campos
    const fields: ValidationResult = this.userValidatorInterface
      .signinValitador(user);

    if (!fields.IsValid) {
        this.notificationServiceInterface.notify(fields.Errors);
        return;
    }



    this.authService.login(user.cpf, user.password)
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
