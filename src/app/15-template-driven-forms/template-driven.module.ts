import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComponent } from '../18-exercise/rate/rate.component';
import { CreateStockComponent } from './full-template-driven/stock/create-stock/create-stock.component';
import { StockItemComponent } from './full-template-driven/stock/stock-item/stock-item.component';
import { FormsModule } from '@angular/forms';
import { FullTemplateDrivenComponent } from './full-template-driven/full-template-driven.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ProductSampleComponent } from './product-sample/product-sample.component';
import { MassAttrDirective } from './directives/attr.directive';
import { MassModel } from './directives/two-way.directive';
import { RouterModule, Routes } from '@angular/router';
import { RateVersion2Component } from '../18-exercise/rate-version2/rate-version2.component';
import { RateVersion3Component } from '../18-exercise/rate-version3/rate-version3.component';

export const TEMPLATE_DRIVEN_ROUTES: Routes = [
  { title: 'Template Driven Form', path: 'full-template-driven', component: FullTemplateDrivenComponent },
  { title: 'Full Template', path: 'template-driven', component: TemplateDrivenComponent },
  { title: 'Product Sample', path: 'product-sample', component: ProductSampleComponent },

]


@NgModule({
  declarations: [
    RateComponent,
    RateVersion2Component,
    RateVersion3Component,
    StockItemComponent,
    CreateStockComponent,
    FullTemplateDrivenComponent,
    TemplateDrivenComponent,
    ProductSampleComponent,
    MassModel,
    MassAttrDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(TEMPLATE_DRIVEN_ROUTES)
  ],
  exports: [
    RateComponent,
    RateVersion2Component,
    RateVersion3Component,
    StockItemComponent,
    CreateStockComponent,
    FullTemplateDrivenComponent,
    TemplateDrivenComponent,
    ProductSampleComponent
  ]
})
export class TemplateDrivenFormModule { }
