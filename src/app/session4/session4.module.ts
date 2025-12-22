import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayDataHandlingEventComponent } from './display-data-handling-event/display-data-handling-event.component';
import { PersianDatePipe } from './persian-date.pipe';



@NgModule({
  declarations: [
    DisplayDataHandlingEventComponent,
    PersianDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DisplayDataHandlingEventComponent,
    PersianDatePipe
  ]
})
export class Session4Module { }
