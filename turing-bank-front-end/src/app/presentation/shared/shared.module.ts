import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NotificationComponent } from './notification/notification.component';
import { HiddenComponentsDirective  } from './directives/hidden-components.directive';

@NgModule({
  declarations: [
    NotificationComponent,
    HiddenComponentsDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    NotificationComponent,
  ],
  exports: [
    MaterialModule,
    HiddenComponentsDirective
  ],
})
export class SharedModule { }
