import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormFormArraysComponent } from './reactive-form-form-arrays/reactive-form-form-arrays.component';
import { CreateFormArrayStockComponent } from './reactive-form-form-arrays/stock/create-stock/create-stock.component';
import { StockFormArrayItemComponent } from './reactive-form-form-arrays/stock/stock-item/stock-item.component';
import { CreateReactiveStockComponent } from './reactive-form-form-builder/create-stock/create-stock.component';
import { ReactiveFormFormBuilderComponent } from './reactive-form-form-builder/reactive-form-form-builder.component';
import { StockReactiveItemComponent } from './reactive-form-form-builder/stock-item/stock-item.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const REACTIVE_FORM_ROUTES: Routes = [
  { title: 'Basic Ractive Form', path: 'basic-reactive-form', component: ReactiveFormComponent },
  { title: 'Full Ractive Form', path: 'full-reactive-form', component: ReactiveFormFormBuilderComponent },
  { title: 'Ractive Form Array', path: 'reactive-form-array', component: ReactiveFormFormArraysComponent },
]


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
    ReactiveFormsModule,
    RouterModule.forChild(REACTIVE_FORM_ROUTES)
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
export class ReactiveFormModule { }
