import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor() { }

  ngOnInit() {
  }

}
