import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';

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
    private userValidatorInterface: UserValidatorInterface
    ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.loginForm.value);
    const fields = this.userValidatorInterface.signinValitador(this.loginForm.value)
    console.log(fields);
    if(!fields.IsValid) {
      return
    }
  }

}
