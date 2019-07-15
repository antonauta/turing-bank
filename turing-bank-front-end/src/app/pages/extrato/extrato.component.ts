import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AuthService } from 'src/app/core/interfaces/services/auth/auth.service';
import { OperationService } from 'src/app/core/interfaces/services/operation/operation.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/public-api';
import { LocalStoreInterface } from 'src/app/core/interfaces/global/local.store.interface';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  jsonData = [];
  userBalance: number;
  userID : string;
  dateIni;
  dIniName;
  dateFin;
  dFinName;

  constructor(private authService: AuthService, 
    private operationService: OperationService,
    private localStoreInterface: LocalStoreInterface,) { }

  ngOnInit() {
    console.log('Pasosu extrato')

    const user: UserModel = JSON.parse(this.localStoreInterface.get('user_data'));
    this.userID= user._id;
    this.authService.getUserAccountDetails(user.account).subscribe(v => {        
      this.userBalance = v.balance;
    });
    this.operationService.getStatement().subscribe((res: any)=> {  
      const operations = res.operations;
      console.log(operations);

      let saldo = this.userBalance;

      let jsonSaldo = []

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
        item ["valor"] = obj.destination._id==user._id ? obj.value : -obj.value;
        item ["saldo"] = obj.destination._id==user._id ? obj.destination_balance : obj.origin_balance;
        jsonSaldo.push(item);
      }  

      for(let i=jsonSaldo.length-1; i>=0;i--){
        this.jsonData.push(jsonSaldo[i]);
        this.populaTable();
      }      
    });
  }

  

  populaTable(){    
    var tblBody = document.getElementById("table-body");

    while (tblBody.hasChildNodes()) {
      tblBody.removeChild(tblBody.lastChild);
    }

    for (var i = 0; i < this.jsonData.length; i++) {
      var row = document.createElement("tr");
      for (var key in this.jsonData[i]) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(this.jsonData[i][key]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
  }

  getExtrato5Dias(){
    let dateInicial = new Date();
    dateInicial.setDate(dateInicial.getDate() - 5);

    let dateFinal = new Date();

    this.getConnectionByDate(dateInicial, dateFinal);
  }

  getExtrat030Dias(){
    let dateInicial = new Date();
    dateInicial.setDate(dateInicial.getDate() - 30);

    let dateFinal = new Date();

    this.getConnectionByDate(dateInicial, dateFinal);
  }

  getExtrato60Dias(){
    let dateInicial = new Date();
    dateInicial.setDate(dateInicial.getDate() - 60);

    let dateFinal = new Date();

    this.getConnectionByDate(dateInicial, dateFinal);
  }

  getConnectionByDate(dateInicial, dateFinal){

    this.operationService.getStatement(dateInicial, dateFinal).subscribe((res: any)=> {  
      const operations = res.operations;
      console.log(operations);

      let saldo = this.userBalance;

      let jsonSaldo = []
      this.jsonData = []

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
        item ["valor"] =  obj.destination._id==this.userID? obj.value : -obj.value;
        item ["saldo"] = obj.destination._id==this.userID ? obj.destination_balance : obj.origin_balance;
        jsonSaldo.push(item);
      }  

      for(let i=jsonSaldo.length-1; i>=0;i--){
        this.jsonData.push(jsonSaldo[i]);       
      }     
      this.populaTable(); 
    });
  }

  filtrar() {   

    let dateInicial = new Date(this.dateIni);
    let dateFinal = new Date(this.dateFin);

    console.log('Data Inicial',dateInicial)
    console.log('Data Final',dateFinal)

    this.getConnectionByDate(dateInicial, dateFinal);
  }

}
