import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('Auth Guard # CanActivate Called');

  if (authService.isLoggedIn()) {
    return true;
  }

  console.log('AuthGuard # canActivate not authorized to access page');
  return router.parseUrl('/to-do');
};


