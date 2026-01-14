import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullTemplateDrivenComponent } from './full-template-driven/full-template-driven.component';
import { CreateStockComponent } from './full-template-driven/stock/create-stock/create-stock.component';
import { StockItemComponent } from './full-template-driven/stock/stock-item/stock-item.component';
import { ProductSampleComponent } from './product-sample/product-sample.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';

export const TEMPLATE_DRIVEN_ROUTES: Routes = [
  { title: 'Template Driven Form', path: 'full-template-driven', component: FullTemplateDrivenComponent },
  { title: 'Full Template', path: 'template-driven', component: TemplateDrivenComponent },
  { title: 'Product Sample', path: 'product-sample', component: ProductSampleComponent },

]


@NgModule({
  imports: [RouterModule.forChild(TEMPLATE_DRIVEN_ROUTES)]
})
export class TemplateDrivenFormModule { }
