import type { MockedObject } from "vitest";
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuardClassBased } from './auth-class.guard';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('AuthGuardClassBased', () => {
  let guard: AuthGuardClassBased;
  let authMock: MockedObject<AuthService>;
  let routerMock: MockedObject<Router>;

  beforeEach(() => {
    authMock = {
      isLoggedIn: vi.fn().mockName("AuthService.isLoggedIn")
    };
    routerMock = {
      navigate: vi.fn().mockName("Router.navigate")
    };

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
    authMock.isLoggedIn.mockReturnValue(true);

    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(authMock.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('navigates away and returns false when user is not logged in', () => {
    authMock.isLoggedIn.mockReturnValue(false);

    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(authMock.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['to-do']);
    expect(result).toBe(false);
  });
});
