import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';
import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification.service.interfaces';
import { ValidationResult } from 'ts.validator.fluent/dist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailRegex)
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);


  loginForm: FormGroup = this.fb.group({
    email: this.email,
    password: this.password,
  });

  constructor(
    private fb: FormBuilder,
    private userValidatorInterface: UserValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface
    ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.loginForm.value);
    const fields: ValidationResult = this.userValidatorInterface
    .signinValitador(this.loginForm.value)
    console.log(fields);
    if(!fields.IsValid) {
      this.notificationServiceInterface.notify(fields.Errors)
      return
    }
  }

}