# Angular Routing

Routing refers to the process of navigating between different components of an application.

## Quick setup command for adding routing file to an angular app

```bash
ng generate module app-routing --flat --module=app
```

## Routing introduction

Angular routing maps URL paths to components. You configure routes once and then use
the `router-outlet` and navigation APIs to move between screens.

### Basic route configuration

```ts
// app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserDetailComponent } from "./users/user-detail.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" }, // Redirecting routes
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "users/:id", component: UserDetailComponent }, // Required param
  { path: "**", component: NotFoundComponent }, // Wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

> [!NOTE]
> The `provideRouter` function was released in `Angular version 14.2`.
> It was introduced as part of the transition to standalone components and `standalone APIs`, allowing developers to configure the router without using `RouterModule.forRoot()`

## Routes Configuration

Routes type is an array of Route interface.

- `title`: Sets a page title, or resolves one via a resolver or resolve function.
- `path`: URL segment to match for this route.
- `pathMatch`: Match strategy for empty paths; use `prefix` or `full` (default is `prefix`).
- `component`: Component created when the path matches.
- `loadComponent`: Lazy-loads a standalone component.
- `redirectTo`: URL to redirect to when this route matches.
- `outlet`: Named `RouterOutlet` to render into when using multiple outlets.
- `canActivate`: Guards that must allow activation before entering the route.
- `canDeactivate`: Guards that must allow leaving the route.
- `canLoad`: Guards for lazy-loaded routes; deprecated in favor of `canMatch`.
- `data`: Static, developer-defined data available via `ActivatedRoute`.
- `children`: Nested child routes for this route.
- `loadChildren`: Lazy-loaded child routes module or route factory.

## Router outlet (Directive)

The router renders matched components inside `router-outlet`.
In fact `router-outlet` is a directive that acts as a placeholder for the content, which has to be displayed on the basis of the route given.

> [!NOTE] `router-outlet` tells Angular where to render the routed component.

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/users">Users</a>
</nav>

<router-outlet></router-outlet>
```

> [!TIP]
> Typically we have one router-outlet in root component and components that has child routes assigned to them.

## RouterLink

`routerLink` is a attribute directive provided by `RouterModule` that enables navigation to different routes in the application by binding to the anchor tags or every html element with click event (e.g. buttons).

Use `routerLink` to build navigation. Use `routerLinkActive` to style active links.

```html
<a routerLink="/home">Home</a>
```

```html
<a [routerLink]="['/users', 42]">User 42</a>
<hr />
<a [routerLink]="['/users']" [queryParams]="{ page: 2, sort: 'name' }" routerLinkActive="is-active">Users</a>
```

Passing Query params using routerLink in template:

```html
<a [routerLink]="['/products']" [queryParams]="{ category: 'books', page: 1 }">Books</a>
<!-- navigates to /products?category=books&page=1 -->
```

Relative vs absolute in `routerLink` (value binding):

```html
<!-- absolute: starts with /, ignores current route -->
<a [routerLink]="['/admin', 'users']">Admin Users</a>

<!-- relative: no leading /, uses the current route as a base -->
<a [routerLink]="['settings']">Settings</a>
```

If the current URL is `/account`, the relative link above navigates to
`/account/settings`, while the absolute link always navigates to
`/admin/users`.

## static vs dynamic routing

`Static Routing` uses fixed paths like `home` or `about` to create mapping between URL and components in the route configuration.

In the other hand `Dynamic Routing` uses parameters in the path to create routes that can handle variable data, such as user IDs or product IDs. dynamic routing allows for more flexible and reusable routes.

## Route params (dynamic routing)

Dynamic routing uses path parameters like `:id`.

In Angular Route parameters are defined in the route configuration using a colon (`:`) followed by the parameter name. These parameters can then be accessed within the component associated with the route.

```ts
// route config
{ path: 'users/:id', component: UserDetailComponent }
```

### Reading route params and query params

Here is an example ot params and query params in an URL like `/users/42?page=2`. In htis example 42 is a route param and page=2 is a query param.

> [!TIP]
> Use `paramMap` and `queryParamMap` for reading route parameters and query parameters.
> They provide a more convenient API than the older `params` and `queryParams` observables.
> Do not read params in constructor, the ngOnInit lifecycle hook is the right place.

```ts
// user-detail.component.ts
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-detail",
  template: `
    <p>User ID: {{ userId }}</p>
    <p>Query page: {{ page }}</p>
  `,
})
export class UserDetailComponent implements OnInit {
  userId = "";
  page = "";
  paramId: number = 0;
  queryParamId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // directly read the params & queryParams
    const params = this.route.snapshot.params;
    this.paramId = +params["id"]; // '+' converts string to number

    const queryParams = this.route.snapshot.queryParams;
    this.queryParamId = +queryParams["id"]; // '+' converts string to number

    // Snapshot (one-time read) using paramMap & queryParamMap
    this.userId = this.route.snapshot.paramMap.get("id") ?? "";
    this.page = this.route.snapshot.queryParamMap.get("page") ?? "";

    // Subscribe (react to changes while component stays active) using paramMap & queryParamMap
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("id") ?? "";
    });

    this.route.queryParamMap.subscribe((params) => {
      this.page = params.get("page") ?? "";
    });
  }
}
```

## ActivatedRoute

`ActivatedRoute` provides the current route information: params, query params,
data, and snapshot vs observable APIs.

### Snapshot pitfall (stale params)

If the same component stays active while only the route param changes, `snapshot`
will not update and you may read the previous value.

> [!CAUTION]
> The problem occurs because Angular reuses the existing component instance when navigating to a route that maps to the same component. As a result, the `ngOnInit` lifecycle hook is not called again, and the component does not automatically update its state based on the new route parameters.

```ts
// users/1 -> users/2 keeps the same component instance
ngOnInit(): void {
  // Stays "1" when navigating to /users/2
  this.userId = this.route.snapshot.paramMap.get("id") ?? "";

  // Use subscription to always get the latest param
  this.route.paramMap.subscribe((params) => {
    this.userId = params.get("id") ?? "";
  });
}
```

## Router (navigate method)

Use the `Router` service to navigate programmatically.

Router is a service that provides methods to navigate between routes in an Angular application. It allows you to programmatically change the URL and load different components based on the defined routes.

- `navigate` : constructs the URL from an array of path segments and optional parameters.
- `navigateByUrl` : takes a string URL and navigates directly to it.
- `isActive` : checks if a given URL is currently active.
- `parseUrl` : converts a string URL into a UrlTree object.
- `createUrlTree` : creates a UrlTree from an array of path segments and optional parameters.

```ts
import { Router } from '@angular/router';

constructor(private router: Router) {}

goToUser(id: number): void {
  this.router.navigate(['/users', id], {
    queryParams: { ref: 'list' },
  });
  // navigates to /users/:id?ref=list
}

goToHome(): void {
  this.router.navigateByUrl('/home');
}
```

## Optional and required params

- Required: `users/:id` must include `id`.
- Optional: use query params or define a second route for the same component.

```ts
// Required param
{ path: 'users/:id', component: UserDetailComponent }

// Optional param via query params
{ path: 'users', component: UsersComponent }

// Optional param via multiple routes
{ path: 'users', component: UsersComponent }
{ path: 'users/:filter', component: UsersComponent }
```

## Nested routes

Nested routes render child components inside a child `router-outlet`.

'redirectTo' in parent route can set default child route. the `pathMatch: 'full'` ensures the redirect only happens for the exact parent path. the default is 'prefix'.

the 'prefix' just match the beginning of the URL segment. so with this example

```ts
   {path: 'admin', component: AdminComponent}
   {path: 'adminPanel', redirectTo: 'admin', pathMatch: 'prefix' },
   // it will only  redirect 'adminPanel' to 'admin' because 'admin' is the prefix of 'adminPanel'
```

```ts
// app-routing.module.ts
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "users", component: AdminUsersComponent },
    ],
  },
];
```

```html
<!-- admin.component.html -->
<h2>Admin</h2>
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/users">Users</a>
</nav>
<router-outlet></router-outlet>
```

## Wildcards

Use a wildcard route to catch unknown paths.

```ts
{ path: '**', component: NotFoundComponent } // wildcard route
```

## Redirecting routes

```ts
{ path: '', redirectTo: 'home', pathMatch: 'full' }
```

## Snapshot vs subscribe

- Snapshot is a one-time read of route values.
- Subscriptions update when route params or query params change while the component stays active.

## Route guards (access control)

Guards decide **if** navigation can proceed. They return `boolean`, `UrlTree`,
`Observable<boolean | UrlTree>`, or `Promise<boolean | UrlTree>`.

Common use cases:

- Protect routes that need authentication/authorization.
- Prevent navigation away from dirty forms.
- Block access to child routes unless a parent condition passes.
- Skip loading certain route matches until a condition is met.

### `canActivate`

Use it to protect a route before activation.

```ts
import { CanActivateFn } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn;
};
```

```ts
const routes: Routes = [{ path: "admin", component: AdminComponent, canActivate: [authGuard] }];
```

### `canActivateChild`

Use it to protect all child routes under a parent route.

```ts
import { CanActivateChildFn } from "@angular/router";

export const adminChildGuard: CanActivateChildFn = (route, state) => {
  const isAdmin = !!localStorage.getItem("isAdmin");
  return isAdmin;
};
```

```ts
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivateChild: [adminChildGuard],
    children: [
      { path: "users", component: AdminUsersComponent },
      { path: "reports", component: ReportsComponent },
    ],
  },
];
```

### `canDeactivate`

Use it to prevent leaving a route (e.g., dirty forms).

```ts
import { CanDeactivateFn } from "@angular/router";

export interface CanLeave {
  canLeave: () => boolean;
}

export const leaveGuard: CanDeactivateFn<CanLeave> = (component) => {
  return component.canLeave();
};
```

```ts
@Component({
  /* ... */
})
export class ProfileComponent implements CanLeave {
  formDirty = true;

  canLeave(): boolean {
    return !this.formDirty || confirm("Discard changes?");
  }
}

const routes: Routes = [{ path: "profile", component: ProfileComponent, canDeactivate: [leaveGuard] }];
```

### `canMatch`

Use it to decide if a route should match at all (especially useful for lazy loading).

```ts
import { CanMatchFn } from "@angular/router";

export const featureGuard: CanMatchFn = (route, segments) => {
  const enabled = localStorage.getItem("featureX") === "true";
  return enabled;
};
```

```ts
const routes: Routes = [
  {
    path: "labs",
    canMatch: [featureGuard],
    loadChildren: () => import("./labs/labs.module").then((m) => m.LabsModule),
  },
];
```
