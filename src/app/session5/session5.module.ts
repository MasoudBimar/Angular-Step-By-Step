import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponentComponent } from './test-component/test-component.component';

@NgModule({
  declarations: [
    TestComponentComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TestComponentComponent,
  ]
})
export class Session5Module { }
