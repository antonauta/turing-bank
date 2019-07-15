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
  userID: string;
  jsonData = [];

 
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStoreInterface: LocalStoreInterface,
    private operationService: OperationService
  ) { }

  ngOnInit() {   

    const user: UserModel = JSON.parse(this.localStoreInterface.get('user_data'));

    this.authService.getUserAccountDetails(user.account).subscribe(v => {
      this.userBalance = v.balance;
      this.localStoreInterface.create('user_data', JSON.stringify(v))
    });
    this.userAccount = user.account;
    this.userAgency = user.agency;
    this.userID  = user._id;
    this.populaGrafico();
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

      let saldo = this.userBalance;

      let jsonSaldo = []

      let jsonData2 = []

      for(let i=operations.length-1; i>=0;i--){
        let obj = operations[i];
        console.log('for', obj.description);  
        if(obj.description=="deposito"){
          saldo = saldo - obj.value;         
        }
        if(obj.description=="transferencia"){
          saldo = saldo + obj.value;   
        }
        let item = {}
        var date = new Date(obj.date);
        item ["data"] = date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear();
        item ["lancamentos"] = obj.description;
        item ["valor"] = obj.value;
        item ["saldo"] = obj.destination._id==this.userID ? obj.destination_balance : obj.origin_balance;
        jsonSaldo.push(item);
      }  

      for(let i=jsonSaldo.length-1; i>=0;i--){
        jsonData2.push(jsonSaldo[i]);       
      }  

      let cont = 0;
      for (let obj of operations) {

        let obj2 = jsonData2[cont]

        console.log('obj2', obj2);  

        var dat = obj2.data;
        var sau = obj2.saldo;
        let item = [
          String(dat),
          parseInt(sau),
        ]
        this.jsonData.push(item);
        cont++;
      }

      var date = new Date();
      let item = [
        String(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()),
        this.userBalance,
      ]
      this.jsonData.push(item);

      this.changingChart.data = this.jsonData;
    });

  }

}
