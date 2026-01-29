import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class SecondGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // throw new Error("Method not implemented.");
    // ...
    console.log(route, state);
    return true;
  }

}

// new version

/**
 * Guard function that controls access to routes.
 *
 * @param route - The activated route snapshot containing route and path parameters
 * @param state - The router state snapshot containing the current router state
 * @returns A boolean value indicating whether the route can be activated
 */
export const testGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log(route, state);
  return true;
}
