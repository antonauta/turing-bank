import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { ValidationError } from 'ts.validator.fluent/dist';


@Component({
  selector: 'app-notification',
 templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  errors: ValidationError[] = this.data;
  static TEMPLATE: string = '';
  temp = NotificationComponent.TEMPLATE

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ValidationError[],
    private bottomSheetRef: MatBottomSheetRef<NotificationComponent>,
  ) { }

  ngOnInit() {
  }

  dismiss(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
