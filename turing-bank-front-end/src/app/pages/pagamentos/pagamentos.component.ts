import { Component, OnInit } from '@angular/core';
import { OperationService } from 'src/app/core/interfaces/services/operation/operation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss']
})
export class PagamentosComponent implements OnInit {

  type = 0;
  destino = ''; // Tem que enviar o ID do usuário;
  value = 0;
  constructor(private operationService: OperationService,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
  }

  depositar() {
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
