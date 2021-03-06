import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ColorsComponent } from './shared/colors/colors.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DadosBancarioComponent } from './pages/dados-bancario/dados-bancario.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';
import {MatButtonToggleModule} from '@angular/material';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MatCardModule } from '@angular/material/card';
import { NotificationComponent } from './shared/notification/notification.component';
import { UserValidatorInterface } from './core/interfaces/validations/user.validator.interface';
import { NotificationServiceInterface } from './core/interfaces/services/notification/notification.service.interface';
import { UserValidator  } from './shared/services/validations/user.validator';
import { NotificationService } from './shared/notification/notification.service';
import { StoreModule } from '@ngrx/store';
import { displayReducer } from './store/display/display.reducer';
import { HttpClientModule  } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interfaces/services/auth/auth.interceptor';
import { AccountValidatorInterface } from './core/interfaces/validations/account.validator.interface';
import { AccountValidator } from './shared/services/validations/accont.validator';
import { LocalStoreService } from './shared/services/local.store.service';
import { LocalStoreInterface } from './core/interfaces/global/local.store.interface';
import { AppGuard } from './app.guard';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
registerLocaleData(localePt, 'pt-BR');



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColorsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DadosBancarioComponent,
    ExtratoComponent,
    TransferenciaComponent,
    PagamentosComponent,
    CadastroComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    GoogleChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    CurrencyMaskModule,
    StoreModule.forRoot({ 'display': displayReducer }),
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  entryComponents: [
    NotificationComponent
  ],
  providers: [
    AppGuard,
    {
      provide: UserValidatorInterface, useClass: UserValidator
    },
    {
      provide: AccountValidatorInterface, useClass: AccountValidator
    },
    {
      provide: LocalStoreInterface, useClass: LocalStoreService
    },
    {
      provide: NotificationServiceInterface, useClass: NotificationService
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
