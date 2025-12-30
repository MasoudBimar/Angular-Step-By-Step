import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './session5/test-component/test-component.component';
import { LifecyclesComponent } from './10-component-lifecycles/lifecycles/lifecycles.component';
import { FullTemplateDrivenComponent } from './session7/full-template-driven/full-template-driven.component';
import { ReactiveFormFormArraysComponent } from './session8/reactive-form-form-arrays/reactive-form-form-arrays.component';
import { CustomElementComponent } from './session6/custom-element/custom-element.component';
import { TemplateDrivenComponent } from './session7/template-driven/template-driven.component';
import { ProductSampleComponent } from './session7/product-sample/product-sample.component';
import { Session1Component } from './session1/session1.component';
import { Session7Routes } from './session7/session7.module';
import { AuthGuard } from './session11/guards/auth-guard';
import { AngularFundamentalsComponent } from './3-angular-fundamentals/angular-fundamentals.component';
import { CounterExampleComponent } from './3-angular-fundamentals/counter-example/counter-example.component';
import { ToDoComponent } from './4-components-and-templates/todo-app/to-do/to-do.component';
import { StructuralDirectivesComponent } from './5-structural-directives/structural-directives.component';
import { AttributeDirectivesComponent } from './6-attribute-directives/attribute-directives.component';
import { ComponentDirectivesComponent } from './7-component-directives/component-directives.component';
import { SpecialElementsComponent } from './9-special-elements/special-elements.component';

const routes: Routes = [
  { path: '', redirectTo: 'to-do', pathMatch: 'full' },
  { path: 'counter', component: CounterExampleComponent },
  { path: 'to-do', component: ToDoComponent },
  { path: 'data-event', component: AngularFundamentalsComponent },
  { path: 'components', component: TestComponentComponent },
  { path: 'structural-directive', component: StructuralDirectivesComponent },
  { path: 'attribute-directive', component: AttributeDirectivesComponent },
  { path: 'component-directive', component: ComponentDirectivesComponent },
  { path: 'special-elements', component: SpecialElementsComponent },

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
