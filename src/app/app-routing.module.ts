import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LifecyclesComponent } from './10-component-lifecycles/lifecycles/lifecycles.component';
import { ColorPickerComponent } from './11-decorators/color-picker/color-picker.component';
import { DecoratorsComponent } from './11-decorators/decorators.component';
import { PipesComponent } from './12-pipes/pipes.component';
import { PostCollectionComponent } from './12-pipes/post-collection/post-collection.component';
import { RoutingComponent } from './13-routing/routing.component';
import { ROUTING_ROUTES } from './13-routing/routing.routes';
import { ProductSampleComponent } from './15-template-driven-forms/product-sample/product-sample.component';
import { ReactiveFormFormArraysComponent } from './16-reactive-forms/reactive-form-form-arrays/reactive-form-form-arrays.component';
import { AngularFundamentalsComponent } from './3-angular-fundamentals/angular-fundamentals.component';
import { CounterExampleComponent } from './3-angular-fundamentals/counter-example/counter-example.component';
import { ToDoComponent } from './4-components-and-templates/todo-app/to-do/to-do.component';
import { StructuralDirectivesComponent } from './5-structural-directives/structural-directives.component';
import { AttributeDirectivesComponent } from './6-attribute-directives/attribute-directives.component';
import { ComponentDirectivesComponent } from './7-component-directives/component-directives.component';
import { SpecialElementsComponent } from './9-special-elements/special-elements.component';
import { AuthGuard } from './session11/guards/auth-guard';
import { RateComponent } from './17-exercise/rate/rate.component';
import { RateVersion2Component } from './17-exercise/rate-version2/rate-version2.component';
import { RateVersion3Component } from './17-exercise/rate-version3/rate-version3.component';

const routes: Routes = [
  { path: '', redirectTo: 'to-do', pathMatch: 'full' },
  { path: 'counter', component: CounterExampleComponent },
  { path: 'to-do', component: ToDoComponent },
  { path: 'data-binding', component: AngularFundamentalsComponent },
  { path: 'structural-directive', component: StructuralDirectivesComponent },
  { path: 'attribute-directive', component: AttributeDirectivesComponent },
  { path: 'component-directive', component: ComponentDirectivesComponent },
  { path: 'special-elements', component: SpecialElementsComponent },
  { path: 'life-cycle', component: LifecyclesComponent },
  { path: 'decorators', component: DecoratorsComponent },
  { path: 'color-picker', component: ColorPickerComponent },
  { path: 'pipes', component: PipesComponent },
  { path: 'paginated-post-collection', component: PostCollectionComponent },
  { path: 'routing', component: RoutingComponent, children: ROUTING_ROUTES },
  { path: 'template-driven', loadChildren: () => import('./15-template-driven-forms/session7.module').then(m => m.TemplateDrivenFormModule), canActivate: [AuthGuard] },
  { path: 'reactive-form', loadChildren: () => import('./16-reactive-forms/session8.module').then(m => m.ReactiveFormModule), canActivate: [AuthGuard] },
  {
    path: 'exercise', children: [
      { title: 'Rate Component 1', path: 'rate-1', component: RateComponent },
      { title: 'Rate Component 2', path: 'rate-2', component: RateVersion2Component },
      { title: 'Rate Component 3', path: 'rate-3', component: RateVersion3Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
