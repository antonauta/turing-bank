import { Injectable } from '@angular/core';
import { NotificationServiceInterface } from '../../../core/interfaces/services/notification.service.interfaces';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet'


@Injectable({
  providedIn: 'root'
})
export class NotificationService implements NotificationServiceInterface {

  constructor(
    private bottomSheet: MatBottomSheet
    ) { }

  notify(messages: any[]) {
    this.bottomSheet.open(NotificationComponent, {
      data: messages
    });
  }

}
