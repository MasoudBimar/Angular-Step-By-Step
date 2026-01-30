# Migrating an Angular App to Standalone (Angular 18)

This guide documents how to migrate an Angular project from NgModules to a fully standalone setup, aligned with Angular 18 application templates and current best practices.

## Goals

- Remove `NgModule` usage for components, directives, and pipes.
- Bootstrap the app with `bootstrapApplication`.
- Centralize providers in `app.config.ts`.
- Use route arrays for lazy loading and feature routing.
- Keep test setup compatible with standalone components.

## Summary of key changes

- Replace `platformBrowserDynamic().bootstrapModule(AppModule)` with `bootstrapApplication(AppComponent, appConfig)`.
- Replace `AppModule`/`AppRoutingModule` with `app.config.ts` and `app.routes.ts`.
- Convert every component, directive, and pipe to `standalone: true`.
- Move lazy loaded feature modules to `*.routes.ts` files that export `Routes`.
- Update tests to import standalone components in `TestBed` `imports` instead of `declarations`.
- Update CLI schematics so new items are standalone by default.

## Step-by-step migration

### 1) Make every component standalone

For each component:

- Add `standalone: true` in `@Component`.
- Replace `NgModule` declarations with local `imports`.
- Import any dependencies used in the template:
  - `CommonModule` for `*ngIf`, `*ngFor`, `async`, etc.
  - `FormsModule` for `ngModel` / template-driven forms.
  - `ReactiveFormsModule` for reactive forms.
  - `RouterLink`, `RouterLinkActive`, `RouterOutlet` for router usage.
  - Child standalone components, directives, and pipes used by the template.

Example:

```ts
@Component({
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {}
```

### 2) Convert directives and pipes to standalone

For each directive and pipe, add `standalone: true`:

```ts
@Directive({
  selector: "[appHighlight]",
  standalone: true,
})
export class HighlightDirective {}
```

```ts
@Pipe({
  name: "persianDate",
  standalone: true,
})
export class PersianDatePipe implements PipeTransform {}
```

Then import them directly in the components that use them.

### 3) Replace AppModule with app.config.ts

Create `app.config.ts` and move root providers there:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withPreloading(PreloadAllModules)), provideHttpClient(withInterceptorsFromDi())],
};
```

Best practices:

- Keep all global providers in `app.config.ts`.
- Avoid `BrowserModule` imports in standalone apps.
- Use `provideRouter` options instead of `RouterModule.forRoot`.

### 4) Replace AppRoutingModule with app.routes.ts

Create `app.routes.ts` and export a `Routes` array:

```ts
export const routes: Routes = [
  { path: "", redirectTo: "to-do", pathMatch: "full" },
  { path: "to-do", component: ToDoComponent },
  {
    path: "reactive-form",
    loadChildren: () => import("./16-reactive-forms/reactive-form.routes").then((m) => m.REACTIVE_FORM_ROUTES),
  },
];
```

### 5) Replace feature modules with route arrays

For each lazy feature module:

- Create a `*.routes.ts` file that exports `Routes`.
- Use `loadChildren` to import the route array.
- Remove the feature `NgModule`.

Example:

```ts
export const REACTIVE_FORM_ROUTES: Routes = [
  { path: "basic-reactive-form", component: ReactiveFormComponent },
  { path: "multi-step-reactive-form", component: MultiStepFormComponent },
];
```

### 6) Update main.ts

```ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

### 7) Update unit tests

Standalone components are added to `imports`:

```ts
TestBed.configureTestingModule({
  imports: [RouterTestingModule, AppComponent],
});
```

If a standalone component uses `RouterLink` or `RouterOutlet`, include `RouterTestingModule` or provide `provideRouter` in the test.

### 8) Update CLI defaults (optional but recommended)

Set standalone by default in `angular.json`:

```json
"schematics": {
  "@schematics/angular:component": { "standalone": true, "style": "scss" },
  "@schematics/angular:directive": { "standalone": true },
  "@schematics/angular:pipe": { "standalone": true }
}
```

## Common pitfalls

- Missing `CommonModule` in standalone components using `*ngIf` or `*ngFor`.
- Forgetting to import child components/pipes/directives used in templates.
- Leaving `declarations` in tests (should move to `imports`).
- Keeping old `NgModule` files in routing and lazy loading paths.

## Quick migration checklist

- [ ] All components have `standalone: true`.
- [ ] All pipes/directives have `standalone: true`.
- [ ] `app.config.ts` created with providers.
- [ ] `app.routes.ts` created and used in `app.config.ts`.
- [ ] `main.ts` uses `bootstrapApplication`.
- [ ] No `@NgModule` left in the codebase.
- [ ] Lazy-loaded features use `*.routes.ts`.
- [ ] Tests updated to import standalone components.

## Best migration strategy for lazy loaded modules

### 1) Convert the lazy route entrypoints first (Module → Route config)

```ts
export const route = {
  path: "feature",
  loadChildren: () => import("./feature/feature.module").then((m) => m.FeatureModule),
};
```

A. Lazy-load a route array (best for feature areas):

```ts
export const route = {
  path: "feature",
  loadChildren: () => import("./feature/feature.routes").then((r) => r.FEATURE_ROUTES),
};
```

B. Lazy-load a component (best for “single page” features):

```ts
export const route = {
  path: "feature",
  loadComponent: () => import("./feature/feature.page").then((c) => c.FeaturePage),
};
```

### 2) Create feature.routes.ts per feature

```ts
import { Routes } from "@angular/router";

export const FEATURE_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./feature.page").then((m) => m.FeaturePage),
  },
];
```

If the feature has children:

```ts
export const FEATURE_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./shell.page").then((m) => m.ShellPage),
    children: [
      { path: "", loadComponent: () => import("./list.page").then((m) => m.ListPage) },
      { path: ":id", loadComponent: () => import("./detail.page").then((m) => m.DetailPage) },
    ],
  },
];
```

[Advanced Topics -- Angular Signal API](/src/app/21-advanced-topics/angular-signal.md)

[Advanced Topics -- Angular Version Feature History](/src/app/21-advanced-topics/angular-version-feature-history.md)

[Advanced Topics -- New Control Flow Syntax](/src/app/21-advanced-topics/new-control-flow-syntax.md)

[Advanced Topics -- Reactive programming With RXJS](/src/app/21-advanced-topics/reactive-programming-with-rxjs.md)
