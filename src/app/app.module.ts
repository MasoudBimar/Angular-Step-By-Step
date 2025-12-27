import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GettingStartedComponent } from './1.getting-started/getting-started.component';
import { TypescriptPreliminariesComponent } from './2.typescript-preliminaries/typescript-preliminaries.component';
import { AngularFundamentalsComponent } from './3.angular-fundamentals/angular-fundamentals.component';
import { CounterExampleComponent } from './3.angular-fundamentals/counter-example/counter-example.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Session5Module } from './session5/session5.module';
import { Session6Module } from './session6/session6.module';
import { Session8Module } from './session8/session8.module';
import { PersianDatePipe } from './shared/persian-date.pipe';
import { ToDoComponent } from './4.todo-app/to-do/to-do.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TypescriptPreliminariesComponent,
    AngularFundamentalsComponent,
    CounterExampleComponent,
    PersianDatePipe,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Session5Module,
    Session6Module,
    Session8Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
