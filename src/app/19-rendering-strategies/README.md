# Rendering strategies in Angular (CSR, SSR, SSG, SGA)

This note compares the common rendering strategies and gives quick commands/snippets. "SGA" is not an official Angular term; here it means *static generation with Angular* (a hybrid that can mix CSR/SSR/SSG per route). If you meant something else by SGA, tell me and I will adjust.

## Quick comparison

| Strategy | Where HTML is generated | Typical use | Available since |
| --- | --- | --- | --- |
| CSR (Client-Side Rendering) | Browser | Apps with rich client interactivity | Angular 2+ (default) |
| SSR (Server-Side Rendering) | Server on each request | SEO + faster first content | Angular Universal (Angular 4+); built-in `@angular/ssr` in Angular 17+ |
| SSG (Static Site Generation) | Server at build time | Content sites, docs, marketing pages | Angular Universal prerender (Angular 9+); built-in `prerender` target in Angular 17+ |
| SGA (Hybrid / per-route rendering) | Mix per route | Apps that need SSR for some routes and SSG/CSR for others | Angular 17+ (server routes + render modes) |

## CSR (Client-Side Rendering)

- What it is: The browser downloads JS, runs Angular, and renders everything on the client.
- Available since: Angular 2+ (default for all Angular apps).
- Command:

```sh
ng new my-app
ng serve
```

- Sample:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>{{ title }}</h1>`,
})
export class AppComponent {
  title = 'CSR only';
}
```

## SSR (Server-Side Rendering)

- What it is: Angular renders HTML on the server for each request, then the browser hydrates.
- Available since: Angular Universal (Angular 4+); first-class SSR via `@angular/ssr` in Angular 17+.
- Commands (Angular 17+):

```sh
ng new my-app --ssr
# or for an existing app
ng add @angular/ssr
```

- Command (Angular 16 and earlier):

```sh
ng add @nguniversal/express-engine
```

- Sample (Angular 17+ server config in `src/app/app.config.server.ts`):

```ts
import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

export const config: ApplicationConfig = {
  providers: [provideServerRendering()],
};
```

## SSG (Static Site Generation / Prerender)

- What it is: HTML is generated at build time and deployed as static files.
- Available since: Angular Universal prerender (Angular 9+); built-in `prerender` target in Angular 17+.
- Commands (Angular 17+ after `ng add @angular/ssr`):

```sh
ng run my-app:prerender
# or pick specific routes
ng run my-app:prerender --routes / /about /docs
```

- Sample (Angular 17+ server routes file, usually `src/app/app.routes.server.ts`):

```ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
];
```

## SGA (Hybrid / per-route rendering)

- What it is: Mix SSG, SSR, and CSR per route to optimize performance and cost.
- Available since: Angular 17+ with server routes and `RenderMode`.
- Sample (Angular 17+):

```ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender }, // SSG
  { path: 'product/:id', renderMode: RenderMode.Server }, // SSR
  { path: '**', renderMode: RenderMode.Client }, // CSR fallback
];
```

## Notes

- CSR is the simplest to set up but can be slower for first paint and SEO.
- SSR improves first content and SEO but adds server complexity.
- SSG is fastest at runtime but needs rebuilds when content changes.
- Hybrid rendering (SGA) is a good default for large apps with mixed needs.
