import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './session3/to-do-module/to-do/to-do.component';
import { DisplayDataHandlingEventComponent } from './session4/display-data-handling-event/display-data-handling-event.component';
import { TestComponentComponent } from './session5/test-component/test-component.component';
import { LifecyclesComponent } from './session6/lifecycles/lifecycles.component';
import { FullTemplateDrivenComponent } from './session7/full-template-driven/full-template-driven.component';
import { ReactiveFormFormArraysComponent } from './session8/reactive-form-form-arrays/reactive-form-form-arrays.component';
import { CustomElementComponent } from './session6/custom-element/custom-element.component';
import { TemplateDrivenComponent } from './session7/template-driven/template-driven.component';
import { ProductSampleComponent } from './session7/product-sample/product-sample.component';
import { Session1Component } from './session1/session1.component';
import { Session7Routes } from './session7/session7.module';
import { AuthGuard } from './session11/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'to-do', pathMatch: 'full' },
  { path: 'to-do', component: ToDoComponent },
  { path: 'data-event', component: DisplayDataHandlingEventComponent },
  { path: 'components', component: TestComponentComponent },
  { path: 'life-cycle', component: CustomElementComponent },
  { path: 'template-driven', component: TemplateDrivenComponent },
  { path: 'full-template-driven', component: FullTemplateDrivenComponent },
  { path: 'template', children: Session7Routes },
  { path: 'template', loadChildren: () => import('./session7/session7.module').then(m => m.Session7Module), canActivate: [AuthGuard] },
  { path: 'product-sample', component: ProductSampleComponent },
  { path: 'reactive-driven', component: ReactiveFormFormArraysComponent },
  // { path: 'empty-component/:id', component: Session1Component},
  { path: 'empty-component', component: Session1Component, canActivate: [AuthGuard] }
  // { path: '**', }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
