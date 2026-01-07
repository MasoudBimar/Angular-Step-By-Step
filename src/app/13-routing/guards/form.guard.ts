import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { ReactiveFormComponent } from 'src/app/16-reactive-forms/reactive-form/reactive-form.component';

/**
 * Guard that determines whether navigation away from a component is allowed.
 *
 * @param component - The component instance being guarded
 * @param currentRoute - The current route snapshot
 * @param currentState - The current router state
 * @param nextState - The next router state to navigate to
 * @returns A boolean or observable/promise that resolves to a boolean indicating whether deactivation is allowed
 */
export const formGuard: CanDeactivateFn<ReactiveFormComponent> = (
  component: ReactiveFormComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  if (component.stockForm.dirty) {
    console.log('cannot navigate a way from the form component');
    console.log(currentRoute, 'ActivatedRouteSnapshot');
    console.log(currentState, 'RouterStateSnapshot');
    console.log(nextState, 'RouterStateSnapshot');
    return false;
  }
  return true;
};

// how to use
// {path: 'form', component: FormComponent, canDeactivate: [formGuard]}
