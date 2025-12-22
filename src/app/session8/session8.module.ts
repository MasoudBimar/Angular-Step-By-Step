import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateReactiveStockComponent } from './reactive-form-form-builder/create-stock/create-stock.component';
import { StockReactiveItemComponent } from './reactive-form-form-builder/stock-item/stock-item.component';
import { ReactiveFormFormBuilderComponent } from './reactive-form-form-builder/reactive-form-form-builder.component';
import { ReactiveFormFormArraysComponent } from './reactive-form-form-arrays/reactive-form-form-arrays.component';
import { StockFormArrayItemComponent } from './reactive-form-form-arrays/stock/stock-item/stock-item.component';
import { CreateFormArrayStockComponent } from './reactive-form-form-arrays/stock/create-stock/create-stock.component';




@NgModule({
  declarations: [
    ReactiveFormComponent,
    CreateReactiveStockComponent,
    StockReactiveItemComponent,
    ReactiveFormFormBuilderComponent,
    ReactiveFormFormArraysComponent,
    StockFormArrayItemComponent,
    CreateFormArrayStockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormComponent,
    CreateReactiveStockComponent,
    StockReactiveItemComponent,
    ReactiveFormFormBuilderComponent,
    ReactiveFormFormArraysComponent,
    StockFormArrayItemComponent,
    CreateFormArrayStockComponent
  ]
})
export class Session8Module { }
