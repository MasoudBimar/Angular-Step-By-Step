import { TestBed } from '@angular/core/testing';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';

import { formGuard } from './form.guard';
import { ReactiveFormComponent } from './../../16-reactive-forms/reactive-form/reactive-form.component';

describe('formGuard', () => {
  const executeGuard: CanDeactivateFn<ReactiveFormComponent> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => formGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
