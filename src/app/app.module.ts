import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Session3Module } from './session3/session3.module';
import { Session4Module } from './session4/session4.module';
import { Session5Module } from './session5/session5.module';
import { Session6Module } from './session6/session6.module';
// import { Session7Module } from './session7/session7.module';
import { Session8Module } from './session8/session8.module';
import { MovieService } from './session10/movie.service';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './session3/to-do-module/to-do/to-do.component';

// const routes: Routes = [
//   { path: 'to-do', component: ToDoComponent},
//   // { path: 'login', component: LoginComponent},
// ]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    Session3Module,
    Session4Module,
    Session5Module,
    Session6Module,
    // Session7Module,
    Session8Module
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
