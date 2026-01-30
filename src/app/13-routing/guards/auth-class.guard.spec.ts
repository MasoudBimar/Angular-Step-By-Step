import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuardClassBased } from './auth-class.guard';

describe('AuthGuardClassBased', () => {
  let guard: AuthGuardClassBased;
  let authMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authMock = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuardClassBased,
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuardClassBased);
  });

  it('calls isLoggedIn when route activation is checked', () => {
    authMock.isLoggedIn.and.returnValue(true);

    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(authMock.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toBeTrue();
  });

  it('navigates away and returns false when user is not logged in', () => {
    authMock.isLoggedIn.and.returnValue(false);

    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(authMock.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['to-do']);
    expect(result).toBeFalse();
  });
});
