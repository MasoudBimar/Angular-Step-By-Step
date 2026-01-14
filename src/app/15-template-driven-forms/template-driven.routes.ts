import { Routes } from '@angular/router';
import { FullTemplateDrivenComponent } from './full-template-driven/full-template-driven.component';
import { ProductSampleComponent } from './product-sample/product-sample.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';

export const TEMPLATE_DRIVEN_ROUTES: Routes = [
  { title: 'Template Driven Form', path: 'full-template-driven', component: FullTemplateDrivenComponent },
  { title: 'Full Template', path: 'template-driven', component: TemplateDrivenComponent },
  { title: 'Product Sample', path: 'product-sample', component: ProductSampleComponent }
];
