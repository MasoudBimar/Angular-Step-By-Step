import { Routes } from '@angular/router';
import { LifecyclesComponent } from './10-component-lifecycles/lifecycles/lifecycles.component';
import { ColorPickerComponent } from './11-decorators/color-picker/color-picker.component';
import { DecoratorsComponent } from './11-decorators/decorators.component';
import { PipesComponent } from './12-pipes/pipes.component';
import { PostCollectionComponent } from './12-pipes/post-collection/post-collection.component';
import { authGuard } from './13-routing/guards/auth.guard';
import { RoutingComponent } from './13-routing/routing.component';
import { ROUTING_ROUTES } from './13-routing/routing.routes';
import { MovieManagerComponent } from './0-exercise/movie-manager/movie-manager.component';
import { RateVersion2Component } from './0-exercise/rate-version2/rate-version2.component';
import { RateVersion3Component } from './0-exercise/rate-version3/rate-version3.component';
import { RateComponent } from './0-exercise/rate/rate.component';
import { AngularFundamentalsComponent } from './3-angular-fundamentals/angular-fundamentals.component';
import { CounterExampleComponent } from './3-angular-fundamentals/counter-example/counter-example.component';
import { ToDoComponent } from './4-components-and-templates/todo-app/to-do/to-do.component';
import { StructuralDirectivesComponent } from './5-structural-directives/structural-directives.component';
import { AttributeDirectivesComponent } from './6-attribute-directives/attribute-directives.component';
import { ComponentDirectivesComponent } from './7-component-directives/component-directives.component';
import { SpecialElementsComponent } from './9-special-elements/special-elements.component';
import { DeferLoadingComponent } from './18-defer-loading/defer-loading.component';
import { ComponentsAndTemplatesComponent } from './4-components-and-templates/components-and-templates.component';
import { ServicesComponent } from './14-services/services.component';
import { SignalCounterComponent } from './0-exercise/signal-counter/signal-counter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'to-do', pathMatch: 'full' },
  { path: 'counter', component: CounterExampleComponent },
  { path: 'data-binding', component: AngularFundamentalsComponent },
  { path: 'to-do', component: ToDoComponent },
  { path: 'component-template', component: ComponentsAndTemplatesComponent },
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
  { path: 'services', component: ServicesComponent },
  {
    path: 'template-driven',
    loadChildren: () =>
      import('./15-template-driven-forms/template-driven.routes').then(
        m => m.TEMPLATE_DRIVEN_ROUTES
      ),
    canActivate: [authGuard]
  },
  {
    path: 'reactive-form',
    loadChildren: () =>
      import('./16-reactive-forms/reactive-form.routes').then(
        m => m.REACTIVE_FORM_ROUTES
      ),
    canActivate: [authGuard]
  },
  { path: 'defer-loading', component: DeferLoadingComponent },
  {
    path: 'exercise',
    children: [
      { title: 'Rate Component 1', path: 'rate-1', component: RateComponent },
      { title: 'Rate Component 2', path: 'rate-2', component: RateVersion2Component },
      { title: 'Rate Component 3', path: 'rate-3', component: RateVersion3Component },
      { title: 'Movies', path: 'movies', component: MovieManagerComponent },
      { title: 'Signal Counter', path: 'signal-counter', component: SignalCounterComponent }
    ]
  }
];
