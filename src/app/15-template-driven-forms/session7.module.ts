import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateSampleComponent } from './rate-1/rate.component';
import { RateComponent } from './rate/rate.component';
import { CreateStockComponent } from './full-template-driven/stock/create-stock/create-stock.component';
import { StockItemComponent } from './full-template-driven/stock/stock-item/stock-item.component';
import { FormsModule } from '@angular/forms';
import { FullTemplateDrivenComponent } from './full-template-driven/full-template-driven.component';
import { RatingComponent } from './rating/rating.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ProductSampleComponent } from './product-sample/product-sample.component';
import { PaAttrDirective } from './attr.directive';
import { PaModel } from './two-way.directive';
import { RouterModule, Routes } from '@angular/router';

export const Session7Routes: Routes = [
  { title: 'Template Driven Form', path: 'full-template-driven', component: FullTemplateDrivenComponent },
  { title: 'Full Template', path: 'template-driven', component: TemplateDrivenComponent },
  { title: 'Rate Component', path: 'rate', component: RateComponent },
  { title: 'Rate Component', path: 'rating', component: RatingComponent },
  { title: 'Rate Component', path: 'rate-sample', component: RateSampleComponent },
  { title: 'Product Sample', path: 'product-sample', component: RateSampleComponent },

]


@NgModule({
  declarations: [
    RateComponent,
    RatingComponent,
    RateSampleComponent,
    StockItemComponent,
    CreateStockComponent,
    FullTemplateDrivenComponent,
    TemplateDrivenComponent,
    ProductSampleComponent,
    PaModel,
    PaAttrDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(Session7Routes)
  ],
  exports: [
    RateComponent,
    RatingComponent,
    RateSampleComponent,
    StockItemComponent,
    CreateStockComponent,
    FullTemplateDrivenComponent,
    TemplateDrivenComponent,
    ProductSampleComponent
  ]
})
export class Session7Module { }
