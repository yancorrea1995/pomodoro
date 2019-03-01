import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material';

import { TippyModule } from 'ng-tippy';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PomodoroComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    TippyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
