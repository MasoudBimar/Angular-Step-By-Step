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
  - [Defer Loading (Angular 17)](#defer-loading-angular-17)

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

## Defer Loading (Angular 17)

An angular tremplate syntax that allows to load parts of a template or component when needed.

`@defer` lets you split a template into a deferrable view that is compiled into a separate bundle and loaded only when a trigger happens. It is component-level lazy loading, which complements route-based lazy loading.

Related concepts:

- Deferrable views: `@defer { ... }`
- Triggers: `on idle`, `on viewport`, `on interaction`, `on hover`, `on timer(2000)`, `when condition`
- Prefetching: `prefetch on idle|hover|interaction|viewport`
- Placeholders and fallbacks: `@placeholder`, `@loading`, `@error`

> [!NOTE]
> The defer syntax allows two level of control: `Prefetching` and `Rendering`

**Prefetching**: Time of fetching data and code from the server & loading them in memory can be controlled

**Rendering**: The Time of appling the code seperately on the page can be controlled when needed

> [!TIP]
> With `@defer` we can define triggers to both level seperately.
> it acccept optional parapmeters inside the `@defer()` block which are used as trigger points

```html
<!-- product.component.html -->
@defer (on viewport; prefetch on idle) {
<app-reviews></app-reviews>
} @placeholder {
<app-reviews-skeleton></app-reviews-skeleton>
} @loading (minimum 300ms) {
<app-spinner></app-spinner>
} @error {
<p>Could not load reviews.</p>
}
```

> [!NOTE]
> behine the scene angular create an separate bundle and extract the template from the main application bundle

Common use cases:

- Below-the-fold content (reviews, comments, related products)
- Heavy widgets (charts, maps, editors)
- Expensive data fetches triggered by user intent
- Optional experiences (marketing banners, A/B test variants)
