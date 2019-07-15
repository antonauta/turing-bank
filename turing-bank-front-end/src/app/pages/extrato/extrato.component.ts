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
  date2;
  date3;

  constructor(private authService: AuthService, 
    private operationService: OperationService,
    private localStoreInterface: LocalStoreInterface,) { }

  ngOnInit() {
    console.log('Pasosu extrato')

    const user: UserModel = JSON.parse(this.localStoreInterface.get('user_data'));

    this.authService.getUserAccountDetails(user.account).subscribe(v => {        
      this.userBalance = v.balance;
    });
    this.operationService.getStatement().subscribe((res: any)=> {  
      const operations = res.operations;
      console.log(operations);

      for(let obj of operations){
        let item = {}
        var date = new Date(obj.date);
        item ["data"] = date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear();
        item ["lancamentos"] = obj.description;
        item ["valor"] = obj.value;
        item ["saldo"] = ' -- ';
        this.jsonData.push(item);
        console.log('Objetos', obj);
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
    this.getConnectionByDate(5)
  }

  getExtrat030Dias(){
    this.getConnectionByDate(30)
  }

  getExtrato60Dias(){
    this.getConnectionByDate(60)
  }

  getConnectionByDate(valor){
    let dateInicial = new Date();
    dateInicial.setDate(dateInicial.getDate() - valor);
    console.log(dateInicial)

    this.operationService.getStatement(dateInicial.toISOString(), new Date().toISOString()).subscribe((res: any)=> {  
      const operations = res.operations;
      console.log(operations);

      this.jsonData = [];

      for(let obj of operations){
        let item = {}
        var date = new Date(obj.date);
        item ["data"] = date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear();
        item ["lancamentos"] = obj.description;
        item ["valor"] = obj.value;
        item ["saldo"] = ' -- ';
        this.jsonData.push(item);
        console.log('Objetos', obj);
        this.populaTable();
      }          
    });
  }

  filtrar() {
    console.log(this.date3)
  }

}
