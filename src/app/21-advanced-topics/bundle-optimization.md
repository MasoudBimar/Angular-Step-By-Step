# Angular Bundle Optimization: Tips, Tricks, and Solutions

Practical ways to reduce Angular bundle size and improve load performance in real projects.

## Quick Workflow (Use This First)

1. Measure your current bundles.
2. Identify biggest modules/dependencies.
3. Split code by route and feature.
4. Defer non-critical UI and heavy libraries.
5. Enforce budgets in CI.

## 1) Measure Before Optimizing

Build with stats and inspect output:

```bash
ng build --configuration production --stats-json

npm run build -- --configuration production --stats-json

pnpm run build -- --configuration production --stats-json
```

Fist check the Bundle Size:

![Before Optimization Bundle Sizes](assets/before-optimization-bundle-size.png)

Then analyze:

open `dist/your-app/stats.json` in a tool like [esbuild](https://esbuild.github.io/analyze/)

esbuild analyze report

![esbuild analyze chart](assets/esbuild-analyze-chart.png)

CJS VS ESM in esbuild analyze report:
![esbuild analyze CJS vs ESM](assets/esbuild-analyze-cjs-vs-esm.png)

> [!CAUTION]
> Ideally, the CJS bundleshould be zero or very small. If you see large CJS bundles, it means you have dependencies that are not tree-shakable and are likely contributing to larger bundle sizes. CJS is not tree-shakable.

### CJS vs ESM

Common JS (CJS) modules often lead to larger bundles because they are not tree-shakable, meaning the bundler cannot remove unused code. ESM (ECMAScript Modules) allows for better tree-shaking, resulting in smaller bundles.

So if you see a large vendor chunk with CJS dependencies, consider replacing them with ESM versions or alternatives.

Using ESM versions of libraries can significantly reduce bundle size by allowing unused code to be excluded from the final build. using `Lodash-ES` instead of `Lodash` is a common example, as it provides modular imports that can be tree-shaken effectively.

In this example prism.js package in npm is build as CommonJS, so it is not tree-shakable and leads to a large vendor chunk. Replacing it with an ESM alternative or using dynamic imports can help reduce the bundle size.

![prism.js npm is CommonJS](assets/cjs-bundles.png)

What to look for:

- Large `main` bundle: too much eager code.
- Large `vendor` chunk: heavy dependencies.
- One lazy chunk much larger than others: feature-specific bloat.
- Zone.js (can be removed if using standalone components and no legacy APIs).
- Unexpected CommonJS dependencies (reduce tree-shaking like replacing lodash with lodash-es).
- Large global styles or assets included in bundles.
- Lazy loading angular animations for angular 17 to 20.
- migrating angular animations to css animations for angular 20+.
- Going Zone-less with Angular 20+.

## 2) Enforce Bundle Budgets in `angular.json`

Set hard limits to catch regressions early:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "300kb",
                  "maximumError": "450kb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

Tip: Keep `maximumError` strict enough to fail CI when bundle growth is accidental.

## 3) Lazy Load Routes and Standalone Features

Move feature code out of the initial bundle:

```ts
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () => import("./features/dashboard/dashboard.component").then((m) => m.DashboardComponent),
  },
  {
    path: "admin",
    loadChildren: () => import("./features/admin/admin.routes").then((m) => m.ADMIN_ROUTES),
  },
];
```

Tips:

- Prefer `loadComponent` for single-page features.
- Prefer `loadChildren` for larger feature areas.
- Keep shared shell layout minimal and eagerly loaded.

## 4) Defer Non-Critical UI with `@defer`

Delay heavy parts until user needs them:

```html
<h2>Product details</h2>

@defer (on interaction) {
<app-recommendations />
} @placeholder {
<p>Tap to load recommendations</p>
} @loading {
<p>Loading...</p>
}
```

Good candidates:

- Charts, maps, rich editors
- Optional widgets
- Below-the-fold sections

## 5) Load Heavy Libraries on Demand

Do not import expensive libraries at top-level if used rarely.

```ts
async openReportChart(canvas: HTMLCanvasElement) {
  const { Chart } = await import("chart.js/auto");
  new Chart(canvas, {
    type: "line",
    data: { labels: [], datasets: [] },
  });
}
```

This shifts chart code from initial bundle to an async chunk.

## 6) Keep Services Tree-Shakable

Use tree-shakable providers:

```ts
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PricingService {}
```

> [!TIPS]
> A provider is tree-shakable when Angular + the bundler can remove it from the final bundle if nothing injects/uses it.
> The key is: don’t register providers in a module’s providers: [] unless you must.

Avoid unnecessary global providers in root config when a service is feature-only.

## 7) Avoid CommonJS Dependencies

CommonJS packages often reduce tree-shaking effectiveness.

Check build warnings and replace with ESM alternatives where possible.

Example:

- Prefer `lodash-es` over `lodash`.
- Prefer direct function imports over whole-library imports.

## 8) Optimize Images and Static Assets

Use optimized images and avoid oversized files.

```html
<img ngSrc="assets/products/camera.webp" width="640" height="360" priority alt="Camera" />
```

Use `NgOptimizedImage` and modern formats (`webp`, `avif`) when possible.

## 9) Minimize Global Styles and Third-Party CSS

Large global CSS increases initial download and render cost.

Tips:

- Move feature CSS into component styles.
- Import only needed parts of UI libraries.
- Remove dead styles and unused icon/font packs.

## 10) Production Build Settings Checklist

Ensure production config enables optimization features:

```json
{
  "optimization": true,
  "buildOptimizer": true,
  "sourceMap": false,
  "namedChunks": false,
  "vendorChunk": false,
  "extractLicenses": true
}
```

If debugging production issues, temporarily enable source maps in a separate debug config, not normal production deploys.

## Common Problems and Fast Solutions

### Problem: Initial bundle is too large

Solutions:

- Lazy load routes/features.
- Move non-critical UI to `@defer`.
- Remove or defer heavy dependencies.
- Split large shared modules into smaller reusable pieces.

### Problem: Vendor chunk keeps growing

Solutions:

- Audit third-party packages in lock file.
- Replace large utility libraries with native APIs or smaller alternatives.
- Import only specific sub-modules/functions.

### Problem: Lazy chunk is still very heavy

Solutions:

- Defer nested heavy components inside that route.
- Convert eager imports inside feature services/components to dynamic imports.
- Split route into child routes.

### Problem: Bundle size regresses over time

Solutions:

- Add strict `budgets`.
- Fail CI on `maximumError`.
- Track build artifact size per PR/release.

## CI Example

Add a CI step to fail when production build exceeds budget:

```bash
ng build --configuration production
```

If budgets are configured, Angular CLI exits with non-zero status on budget error.

## Practical Checklist

- [ ] Production build uses optimization flags.
- [ ] Route-level lazy loading is in place.
- [ ] Non-critical UI uses `@defer`.
- [ ] Heavy libs loaded with dynamic `import()`.
- [ ] No avoidable CommonJS dependencies.
- [ ] Images and CSS are optimized.
- [ ] Budgets are enforced in CI.
