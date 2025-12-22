import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do-module/to-do/to-do.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToDoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ToDoComponent
  ]
})
export class Session3Module { }
