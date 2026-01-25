import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardClassBased {

  constructor(private router: Router, public authService: AuthService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
