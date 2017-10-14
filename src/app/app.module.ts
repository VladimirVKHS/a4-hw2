import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule, MatProgressBarModule, MatFormFieldModule, MatCardModule, MatButtonModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultBoxComponent } from './result-box/result-box.component';
import {SearchService} from "./common/services/search.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpInterceptorService} from "./common/services/http-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    SearchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
