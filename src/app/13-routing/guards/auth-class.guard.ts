import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardClassBased {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);


  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    void _route;
    void _state;
    console.log('Auth Guard # CanActivate Called');

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      console.log('AuthGuard # canActivate not authorized to access page');

      this.router.navigate(['to-do']);

      return false;
    }
  }

}
