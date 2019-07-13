import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/interfaces/services/auth/auth.service';
import { UserModel } from '../../models/user.model';
import { UserLoggedModel } from '../../models/userLogged.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dados-bancario',
  templateUrl: './dados-bancario.component.html',
  styleUrls: ['./dados-bancario.component.scss']
})
export class DadosBancarioComponent implements OnInit {

  userAccount: any;
  userAgency: any;
  userBalance: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBasic);
    this.authService.currentUser.subscribe(user => {
      this.userAccount = user.account;
      this.userAgency = user.agency;
      this.userBalance = user.balance;
      console.log(user);
    });
  }

  goToExtrato(){
    this.router.navigateByUrl('/extrato');
  }

  goToTransferencia(){
    this.router.navigateByUrl('/transferencia');
  }

  goToPagamentos(){
    this.router.navigateByUrl('/pagamentos');
  }
}

function drawBasic() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Time of Day');
  data.addColumn('number', 'R$');

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
    colors:['#5EB150'],
    backgroundColor: '#F6F6F6',
    hAxis: {
      title: 'Data',
      format: 'd/M/yy',
    },
    vAxis: {
      title: 'Saldo'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

