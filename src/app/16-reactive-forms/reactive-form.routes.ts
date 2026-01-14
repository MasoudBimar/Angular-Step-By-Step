import { Routes } from '@angular/router';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';
import { ReactiveFormFormArraysComponent } from './reactive-form-form-arrays/reactive-form-form-arrays.component';
import { ReactiveFormFormBuilderComponent } from './reactive-form-form-builder/reactive-form-form-builder.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const REACTIVE_FORM_ROUTES: Routes = [
  { title: 'Basic Ractive Form', path: 'basic-reactive-form', component: ReactiveFormComponent },
  { title: 'Full Ractive Form', path: 'full-reactive-form', component: ReactiveFormFormBuilderComponent },
  { title: 'Ractive Form Array', path: 'reactive-form-array', component: ReactiveFormFormArraysComponent },
  { title: 'Multi Step Reactive Form', path: 'multi-step-reactive-form', component: MultiStepFormComponent }
];
