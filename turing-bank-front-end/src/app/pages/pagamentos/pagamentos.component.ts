import { Component, OnInit } from '@angular/core';
import { OperationService } from 'src/app/core/interfaces/services/operation/operation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccountValidatorInterface } from 'src/app/core/interfaces/validations/account.validator.interface';
import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification/notification.service.interface';
import { TransferModel } from 'src/app/models/transfer.model';
import { ValidationResult } from 'ts.validator.fluent/dist';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss']
})
export class PagamentosComponent implements OnInit {

  type = 0;
  destino = ''; // Tem que enviar o ID do usuário;
  value = 0;

  conta = new FormControl('', [
    Validators.required,
    Validators.maxLength(80),
  ]);

  valor = new FormControl('', [
    Validators.required,
    Validators.maxLength(80),
  ]);

  pagamentoForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private accountValidatorInterface: AccountValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface,
    private operationService: OperationService,
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit() {

    this.pagamentoForm = this.fb.group({
      conta: this.conta,
      valor: this.valor
    });
  }

  depositar() {

    const transfer: TransferModel = this.pagamentoForm.value;
    console.log(transfer, 'transferenciaForm');

    const fields: ValidationResult = this.accountValidatorInterface
      .paymentValitador(transfer);
    if (!fields.IsValid) {
      this.notificationServiceInterface.notify(fields.Errors);
      return;
    }
    
    this.operationService.operation(this.type, this.value, this.destino).subscribe(value => {
      console.log(value);
      alert('Deposito realizado com sucesso');
      // let newUserDate;
      // this.authService.currentUser.subscribe(v => {
      //   this.authService.getUserAccountDetails(v.account).subscribe(u => {
      //     newUserDate = u;
      //     console.log(newUserDate);
      //   });
      //   console.log(newUserDate.balance);
      //   v.balance = newUserDate.balance;
      // });
      this.router.navigateByUrl('/dados-bancarios');
      }, error => {
        console.log(error);
        alert('DEU RUIM AO DEPOSITAR');
    });
  }
}
