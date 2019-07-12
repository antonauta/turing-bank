import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NotificationServiceInterface } from '../../core/interfaces/services/notification.service.interface';
import { ValidationResult } from 'ts.validator.fluent/dist';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(80),
  ]);

  preferredName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailRegex)
  ]);

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

  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userValidatorInterface: UserValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface
  ) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      name: this.name,
      password: this.password,
      preferredName: this.preferredName,
      email: this.email,
      cpf: this.cpf,
    });
  }

  // cadastrar cliente
  submit() {
    console.log(this.cadastroForm.value);
    const fields: ValidationResult = this.userValidatorInterface
      .signupValitador(this.cadastroForm.value);
    if (!fields.IsValid) {
      this.notificationServiceInterface.notify(fields.Errors)
      return
    }
  }

}
