# Lazy loading (modules and components)

Lazy loading splits your app into smaller bundles and loads them on demand. This keeps the initial bundle smaller and speeds up first load.

## Table of contents

- [Lazy loading (modules and components)](#lazy-loading-modules-and-components)
  - [Table of contents](#table-of-contents)
  - [Lazy-load a feature module](#lazy-load-a-feature-module)
  - [Lazy-load a standalone component](#lazy-load-a-standalone-component)
  - [Preloading strategies](#preloading-strategies)
    - [Preload all lazy modules](#preload-all-lazy-modules)
  - [Selective preloading](#selective-preloading)
  - [Custom Preloading](#custom-preloading)

## Lazy-load a feature module

```ts
// app-routing.module.ts
const routes: Routes = [
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
  },
];
```

```ts
// admin-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminUsersComponent } from "./admin-users.component";

const routes: Routes = [
  { path: "", component: AdminComponent },
  { path: "users", component: AdminUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
```

## Lazy-load a standalone component

The component must be marked as `standalone: true`.

```ts
// app-routing.module.ts
const routes: Routes = [
  {
    path: "about",
    loadComponent: () => import("./about/about.component").then((m) => m.AboutComponent),
  },
];
```

## Preloading strategies

Preloading loads lazy routes in the background after the initial navigation. The default is no preloading.

### Preload all lazy modules

```ts
// app-routing.module.ts
import { PreloadAllModules, RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Preloading:

- NoPreloading
- CustomPreloading
- PreloadAllModules: this strategy loads all lazy-loaded modules or components in the background as soon as possible after bootstraping application

```ts
// app.config.ts
import { PreloadAllModules, RouterModule } from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules))],
};
```

## Selective preloading

```ts
// selective-preloading.strategy.ts
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return route.data?.["preload"] ? load() : of(null);
  }
}
```

```ts
// app-routing.module.ts
@NgModule({
  providers: [SelectivePreloadingStrategy],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategy })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

```ts
// routes with preload flag
const routes: Routes = [
  {
    path: "reports",
    loadChildren: () => import("./reports/reports.module").then((m) => m.ReportsModule),
    data: { preload: true },
  },
];
```

## Custom Preloading

Common usecases:

- Authtication/Authorization based () preloading strategy
- Network based preloading
- Feature Flags

```ts
export class CustomPreloadingStrategy implements PreloadingStratergy {
  override preload(route: Route, fn: Function): Observable<any> {
    return route.data && route.data.preload ? return fn() : EMPTY;
  }
}
```

Next Section: [Defer Loading](/src/app/18-defer-loading/README.md)
