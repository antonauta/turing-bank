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

    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawBasic);    

    //this.populaGrafico();

    const user: UserModel = JSON.parse(this.localStoreInterface.get('user_data'));

    this.authService.getUserAccountDetails(user.account).subscribe(v => {        
      this.userBalance = v.balance;
    });
    this.userAccount = user.account;
    this.userAgency = user.agency;
  }


  // async teste () {
  //   let dateInicial = new Date();
  //   dateInicial.setDate(dateInicial.getDate() - 7);

  //   let res: any = await this.operationService.getStatement(dateInicial.toISOString(), new Date().toISOString());

  //   let operations = res.operations;
  //   console.log('ope', operations)
  //   for (let obj of operations) {
  //     var date = new Date(obj.date);
  //     var saldo = obj.value;
  //     console.log([date, saldo])
  //   }
  // }

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
    dateInicial.setDate(dateInicial.getDate() - 7);
    console.log(dateInicial)

    this.operationService.getStatement(dateInicial.toISOString(), new Date().toISOString()).subscribe((res: any) => {
      const operations = res.operations;
      console.log(operations);

      this.jsonData = [];

      for (let obj of operations) {
        var date = new Date(obj.date);
        var saldo = obj.value;
        let item = [
          date,
          saldo,
        ]
        this.jsonData.push(item);
      }
    });
  }
}


function drawBasic() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Time of Day');
  data.addColumn('number', 'R$');

  // console.log('csdfdsf', this.jsonData); 
  // data.addRows(this.jsonData);

  // for (var i = 0; i < this.jsonData.length; i++){
  //     data.addRows([
  //         [this.jsonData[i][0], this.jsonData[i][1]]
  //     ])
  // }

  data.addRows([
    [new Date(2019, 0, 1), 5],  [new Date(2019, 0, 2), 7],  [new Date(2019, 0, 3), 3],
    [new Date(2019, 0, 4), 1],  [new Date(2019, 0, 5), 3],  [new Date(2019, 0, 6), 4],
    [new Date(2019, 0, 7), 3],  [new Date(2019, 0, 8), 4],  [new Date(2019, 0, 9), 2],
    [new Date(2019, 0, 10), 5], [new Date(2019, 0, 11), 8], [new Date(2019, 0, 12), 6],
    [new Date(2019, 0, 13), 3], [new Date(2019, 0, 14), 3], [new Date(2019, 0, 15), 5],
    [new Date(2019, 0, 16), 7], [new Date(2019, 0, 17), 6], [new Date(2019, 0, 18), 6],
    [new Date(2019, 0, 19), 3], [new Date(2019, 0, 20), 1], [new Date(2019, 0, 21), 2],
    [new Date(2019, 0, 22), 4], [new Date(2019, 0, 23), 6], [new Date(2019, 0, 24), 5],
    [new Date(2019, 0, 25), 9], [new Date(2019, 0, 26), 4], [new Date(2019, 0, 27), 9],
    [new Date(2019, 0, 28), 8], [new Date(2019, 0, 29), 6], [new Date(2019, 0, 30), 4],
    [new Date(2019, 0, 31), 6], [new Date(2019, 1, 1), 7],  [new Date(2019, 1, 2), 9]
  ]);

  var options = {

    title: 'Movimentações dos últimos 30 dias',
    height: 260,
    colors: ['#5EB150'],
    backgroundColor: '#F6F6F6',
    hAxis: {
      title: 'Data',
      format: 'dd/MM/yy',
    },
    vAxis: {
      title: 'Saldo'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

