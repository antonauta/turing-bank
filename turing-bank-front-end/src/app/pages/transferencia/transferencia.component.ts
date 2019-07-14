import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserValidatorInterface } from 'src/app/core/interfaces/validations/user.validator.interface';
import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification/notification.service.interface';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {

  title = 'button-toggle-app';

  toggleOptions: Array<String> = ["Conta Corrente", "Conta Poupança"];

  agencia = new FormControl('', [
    Validators.required,
    Validators.maxLength(80),
  ]);

  conta = new FormControl('', [
    Validators.required,
    Validators.maxLength(80),
  ]);

  valor = new FormControl('', [
    Validators.required,
    Validators.maxLength(80),
  ]);

  transferenciaForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userValidatorInterface: UserValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface,
  ) { }

  ngOnInit() {

    this.transferenciaForm = this.fb.group({
      agencia: this.agencia,
      conta: this.conta,
      valor: this.valor
    });
  }

  submit() {
  }

}
