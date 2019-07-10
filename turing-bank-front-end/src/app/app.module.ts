import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './presentation/shared/shared.module';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { DataModule } from './data/data.module';
import { PresentationModule } from './presentation/presentation.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserValidator } from './core/usecases/user/base/validations/user.validator';
import { UserValidatorInterface } from './core/interfaces/validations/user.validator.interface';
import { NotificationService } from './presentation/shared/notification/notification.service';
import { NotificationServiceInterface } from './core/interfaces/services/notification.service.interfaces';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    InfraModule,
    DataModule,
    PresentationModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide: UserValidatorInterface, useClass: UserValidator
    },
    {
      provide: NotificationServiceInterface, useClass: NotificationService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
