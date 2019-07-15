import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';
import { UserModel } from '../../models/user.model';
import { UserLoggedModel } from '../../models/userLogged.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OperationService } from 'src/app/core/interfaces/services/operation/operation.service';
import { LocalStoreInterface } from 'src/app/core/interfaces/global/local.store.interface';


@Component({
  selector: 'app-dados-bancario',
  templateUrl: './dados-bancario.component.html',
  styleUrls: ['./dados-bancario.component.scss']
})
export class DadosBancarioComponent implements OnInit {

  changingChart = {
    title: 'Movimentações dos últimos 30 dias',
    type: 'LineChart',
    data: [],
    columnNames: ['Período', 'Saldo'],
    options: {
      colors: ['#5EB150'],
      backgroundColor: '#F6F6F6',
    }
  };

  userAccount: any;
  userAgency: any;
  userBalance: number;
  jsonData = [];

 
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStoreInterface: LocalStoreInterface,
    private operationService: OperationService
  ) { }

  ngOnInit() {

    this.populaGrafico();

    const user: UserModel = JSON.parse(this.localStoreInterface.get('user_data'));

    this.authService.getUserAccountDetails(user.account).subscribe(v => {
      this.userBalance = v.balance;
    });
    this.userAccount = user.account;
    this.userAgency = user.agency;
  }


  goToExtrato() {
    this.router.navigateByUrl('/extrato');
  }

  goToTransferencia() {
    this.router.navigateByUrl('/transferencia');
  }

  goToPagamentos() {
    this.router.navigateByUrl('/pagamentos');
  }

  populaGrafico() {
    let dateInicial = new Date();
    dateInicial.setDate(dateInicial.getDate() - 30);

    this.operationService.getStatement(dateInicial.toISOString(), new Date().toISOString()).subscribe((res: any) => {
      const operations = res.operations;
      

      this.jsonData = [];

      for (let obj of operations) {
        var date = new Date(obj.date);
        var saldo = obj.value;
        let item = [
          String(date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear()),
          parseInt(saldo),
        ]
        this.jsonData.push(item);
      }

      this.changingChart.data = this.jsonData;
    });

  }

}
