import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';
import { ValidationResult } from 'ts.validator.fluent/dist';
import { Store } from '@ngrx/store';

import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification/notification.service.interface';
import { displayHidden, displayShow } from 'src/app/store/display/display.actions';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, OnDestroy {
 

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
    private notificationServiceInterface: NotificationServiceInterface,
    private store: Store<{ display: boolean }>
  ) { 
    
    }

  ngOnInit() {
    // hidden header and footer component
    this.store.dispatch(displayHidden());
    this.cadastroForm = this.fb.group({
      name: this.name,
      password: this.password,
      preferredName: this.preferredName,
      email: this.email,
      cpf: this.cpf,
    });

  }

  ngOnDestroy(): void {
   // show header and footer component
    this.store.dispatch(displayShow());
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