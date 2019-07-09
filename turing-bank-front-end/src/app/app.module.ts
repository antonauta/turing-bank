import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './presentation/shared/shared.module';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { DataModule } from './data/data.module';
import { PresentationModule } from './presentation/presentation.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    InfraModule,
    DataModule,
    PresentationModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
