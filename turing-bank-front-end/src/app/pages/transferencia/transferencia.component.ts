import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotificationServiceInterface } from 'src/app/core/interfaces/services/notification/notification.service.interface';
import { TransferModel } from 'src/app/models/transfer.model';
import { ValidationResult } from 'ts.validator.fluent/dist';
import { AccountValidatorInterface } from 'src/app/core/interfaces/validations/account.validator.interface';
import { OperationService } from 'src/app/core/interfaces/services/operation/operation.service';
import { AuthService } from 'src/app/core/interfaces/services/auth/auth.service';
import { UserLoggedModel } from 'src/app/models/userLogged.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStoreInterface } from 'src/app/core/interfaces/global/local.store.interface';
import { UserModel } from 'src/app/models/user.model';

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
    Validators.maxLength(5),
  ]);

  contas: Observable<UserLoggedModel[]>;
  idContaSelecionada = new FormControl('', [
    Validators.required,
  ]);

  valor = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  descricao = new FormControl('', [
    Validators.required,
    Validators.maxLength(15),
  ]);

  transferenciaForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private accountValidatorInterface: AccountValidatorInterface,
    private notificationServiceInterface: NotificationServiceInterface,
    private operationService: OperationService,
    private authService: AuthService,
    private router: Router,
    private localStoreInterface: LocalStoreInterface
  ) { }

  ngOnInit() {

    
    this.contas = this.authService.getAllAccounts();
    console.log('Teste de transferencia: ', this.contas);   

    this.transferenciaForm = this.fb.group({
      agencia: this.agencia,
      conta: this.idContaSelecionada,
      valor: this.valor,
      descricao: this.descricao
    }); 
  }

  submit() {    

    const transfer: TransferModel = this.transferenciaForm.value;

    const fields: ValidationResult = this.accountValidatorInterface
      .trasferValitador(transfer);
    if (!fields.IsValid) {
      this.notificationServiceInterface.notify(fields.Errors);
      return;
    }

    const usuarioAtual: UserModel = JSON.parse(this.localStoreInterface.get('user_data'));

    if (parseInt(transfer.valor) >= usuarioAtual.balance) {
      this.operationService.operation(parseInt(transfer.valor), transfer.conta, transfer.descricao).subscribe(v => {
        alert('Trasferência realizada com sucesso!');
        this.router.navigateByUrl('/dados-bancarios');
      }, error => {
        console.log(error);
        alert('Erro ao realizar transfência.');
      });
    } else {
      alert("Trasferência não realizada, saldo insuficiente.");
    }
  }
}
