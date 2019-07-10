import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    NotificationComponent,
  ],
  exports: [
    MaterialModule
  ],
})
export class SharedModule { }
