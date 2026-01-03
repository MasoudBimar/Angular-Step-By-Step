# Angular Routing

This note explains the core Angular Router concepts with small, practical examples.

## Quick setup command

```bash
ng generate module app-routing --flat --module=app
```

## Routing introduction

Angular routing maps URL paths to components. You configure routes once and then use
the `router-outlet` and navigation APIs to move between screens.

### Basic route configuration

```ts
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirecting routes
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent }, // Required param
  { path: '**', component: NotFoundComponent }, // Wildcard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

## Router outlet

The router renders matched components inside `router-outlet`.

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/users">Users</a>
</nav>

<router-outlet></router-outlet>
```

## RouterLink

Use `routerLink` to build navigation. Use `routerLinkActive` to style active links.

```html
<a [routerLink]="['/users', 42]">User 42</a>
<a
  [routerLink]="['/users']"
  [queryParams]="{ page: 2, sort: 'name' }"
  routerLinkActive="is-active"
  >Users</a
>
```

## Route params (dynamic routing)

Dynamic routing uses path parameters like `:id`.

```ts
// route config
{ path: 'users/:id', component: UserDetailComponent }
```

### Reading route params and query params

```ts
// user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <p>User ID: {{ userId }}</p>
    <p>Query page: {{ page }}</p>
  `,
})
export class UserDetailComponent implements OnInit {
  userId = '';
  page = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Snapshot (one-time read)
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.page = this.route.snapshot.queryParamMap.get('page') ?? '';

    // Subscribe (react to changes while component stays active)
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') ?? '';
    });

    this.route.queryParamMap.subscribe((params) => {
      this.page = params.get('page') ?? '';
    });
  }
}
```

## ActivatedRoute

`ActivatedRoute` provides the current route information: params, query params,
data, and snapshot vs observable APIs.

## Router (navigate method)

Use the `Router` service to navigate programmatically.

```ts
import { Router } from '@angular/router';

constructor(private router: Router) {}

goToUser(id: number): void {
  this.router.navigate(['/users', id], {
    queryParams: { ref: 'list' },
  });
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

```ts
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminUsersComponent },
    ],
  },
];
```

```html
<!-- admin.component.html -->
<h2>Admin</h2>
<nav>
  <a routerLink="dashboard">Dashboard</a>
  <a routerLink="users">Users</a>
</nav>
<router-outlet></router-outlet>
```

## Wildcards

Use a wildcard route to catch unknown paths.

```ts
{ path: '**', component: NotFoundComponent }
```

## Redirecting routes

```ts
{ path: '', redirectTo: 'home', pathMatch: 'full' }
```

## Snapshot vs subscribe

- Snapshot is a one-time read of route values.
- Subscriptions update when route params or query params change while the component stays active.
