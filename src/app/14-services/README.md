# Angular Services

Angular services are classes that hold reusable logic (data access, state, utilities)
and are shared across components through dependency injection (DI).

## Generate a service

```bash
ng generate service users
```

> [!TIP]
> The CLI creates `users.service.ts` and marks it with `@Injectable()`. Add
> `providedIn: 'root'` for a singleton service.

## When to define a service

- Shared state or logic across multiple components.
- API calls and data mapping.
- Cross-cutting concerns like logging, caching, or auth.
- Utilities that should be testable without a component.

> [!CAUTION]
> Avoid storing component-only state in a root service. Prefer component-level
> state unless multiple components need it.

## Service example

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
}

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users");
  }
}
```

Usage in a component:

```ts
import { Component, OnInit } from "@angular/core";
import { UsersService, User } from "./users.service";

@Component({
  selector: "app-users",
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `,
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
```

## Dependency injection

**Provide**: Tell Angular how to create a service (register a provider).
**Inject**: Ask Angular for an instance of that service.

An `Injectable` can be a `service`, `function` or event a `pipe`.

Common ways to provide:

- `@Injectable({ providedIn: "root" })`: app-wide singleton.
- `providers` in `@Component`: new instance per component tree.
- `providers` in `@NgModule`: module-level scope.
- `providers` in a route config: instance per route tree (Angular 15+).

> [!NOTE] `providedIn` is the preferred approach because it enables tree-shaking.

## Providers Level

- Module level
- Root Level: singleton
- Component level: new instance per component

## Levels of injection (hierarchy)

Angular uses a hierarchical injector tree:

1. **Platform injector**: shared across multiple Angular apps on the page.
2. **Root injector (environment injector)**: app-level singleton services.
3. **Module injector**: created for NgModules with `providers`.
4. **Element injector**: created for components/directives with `providers`.

If a provider is not found at one level, Angular searches up the tree.

## Injection tokens

Tokens tell Angular what dependency to look up. The most common token is a
class type (like `UsersService`), but you can also use custom tokens for values
that are not classes (strings, config objects, or interfaces).

### Injecting tokens

Angular Injecting tokens are created with the `InjectionToken` class.
With tokens acts like a unique key to register and retrieve dependencies.
By this keys Angular can differentiate between different dependencies of the same type.

> [!NOTE]
> Tokens are usefull when we have multiple dependecies and we want to decide which one to Inject and use in out component or service.

> [!NOTE]
> The Providers Array takes an object with two properties, `provide` for the token and `useValue, useClass, useExisting, useFactory` for which dependecy we want to use.

> [!NOTE]
> Token can be of three types: `Type token`, `String token`, `Injection token object`.

```ts
import { Component, Inject } from "@angular/core";
import { InjectionToken } from "@angular/core";

export const API_URL = new InjectionToken<string>("API_URL");

@Component({
  selector: "app-users",
  template: "Users",
  providers: [{ provide: API_URL, useValue: "/api" }],
})
export class UsersComponent {
  constructor(@Inject(API_URL) private apiUrl: string) {}
}
```

Correct way to inject with `inject()` in standalone components:

```ts
import { Component, inject } from "@angular/core";
import { API_URL } from "./api-url.token";

@Component({
  selector: "app-example",
  template: `{{ apiUrl }}`,
  providers: [{ provide: API_URL, useValue: "/api" }],
})
export class ExampleComponent {
  readonly apiUrl = inject(API_URL);
}
```

> [!CAUTION] Angular does not complains if two similar token get provided in the sampe scope.
> The last one will override the previous one without any warning.

### String tokens (legacy)

This injection token is defined by pairing a string key with a use\* provider (e.g., `useValue`, `useClass`, `useFactory`, `useExisting`) so the dependency can be provided and resolved via that string key.

> [!CAUTION]
> String tokens are supported but discouraged because they are not type-safe and
> can collide. Prefer `InjectionToken`.

```ts
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-legacy",
  template: "Legacy",
  providers: [{ provide: "API_URL", useValue: "/api" }],
})
export class LegacyComponent {
  readonly apiUrl = inject<string>("API_URL");

  // constructor(@Inject("API_URL") private apiUrl: string) {}
}
```

### Object injection token

Use an interface plus `InjectionToken` for structured config. Object injection token is used as a provider token for non-class dependecies.

```ts
import { InjectionToken } from "@angular/core";

export interface ApiConfig {
  baseUrl: string;
  timeoutMs: number;
}

export const API_CONFIG = new InjectionToken<ApiConfig>("API_CONFIG");
```

> [!NOTE] The string `API_CONFIG` provides an optional description for the token's purpose.

Provide it and inject the config:

```ts
import { Injectable, Inject } from "@angular/core";
import { API_CONFIG, ApiConfig } from "./api-config.token";

@Injectable({ providedIn: "root" })
export class ApiService {
  readonly config = inject<ApiConfig>(API_CONFIG);

  // constructor(@Inject(API_CONFIG) private config: ApiConfig) {}
}
```

### Provider approaches for tokens

Angular supports multiple ways to provide a token:

- `useValue`: supply a constant value.
- `useClass`: map a token to a class type.
- `useExisting`: alias one token to another.
- `useFactory`: compute a value with a factory function.

Examples:

```ts
import { InjectionToken } from "@angular/core";

export const API_URL = new InjectionToken<string>("API_URL");
export const LOGGER = new InjectionToken<Logger>("LOGGER");

export interface Logger {
  log(message: string): void;
}

export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

export class FancyLogger implements Logger {
  log(message: string): void {
    console.log("[Fancy]", message);
  }
}

export const providers = [
  { provide: API_URL, useValue: "/api" }, // useValue is mostly used for runtime configurations
  { provide: LOGGER, useClass: ConsoleLogger },
  // connect this provide rule to the above for providing the dependency using another existing dependecy rule defined.
  { provide: "LEGACY_LOGGER", useExisting: LOGGER },
  {
    provide: API_URL,
    useFactory: (env: EnvironmentService) => env.apiUrl,
    deps: [EnvironmentService],
  },
];
```

### `useValue` vs `useClass`

useValue responsible for providing constant value as a dependecy but useClass provides a class type to be instantiated as a dependency (instantialte new instance each time).

### `useFactory` and `deps` for provider dependencies

The useFactory is to specify a function (factory function) that supposed to be invoked to create an instance of a dependecy like an instance of service and add extra processing we need to preapre proper dependecy using the instance

When using `useFactory`, you can explicitly list dependencies with `deps`. This
is useful when the factory needs services or when you want to avoid a class
just to compute a value.

```ts
import { InjectionToken } from "@angular/core";

export const FEATURE_FLAGS = new InjectionToken<Record<string, boolean>>("FEATURE_FLAGS");

export const providers = [
  {
    provide: FEATURE_FLAGS,
    useFactory: (env: EnvironmentService, user: UserService) => ({
      beta: env.enableBeta && user.isAdmin(),
    }),
    deps: [EnvironmentService, UserService],
  },
];
```

### When to use each approach

- `useValue`: environment constants, hard-coded flags, test doubles.
- `useClass`: swap an implementation behind an interface-like token.
- `useExisting`: alias for backward compatibility or shared instances.
- `useFactory`: values derived from other services or runtime state which is not a direct class instance.
- `InjectionToken` vs string: use `InjectionToken` for type safety and to avoid
  collisions; strings only for legacy code.

> [!TIP]
> we use `useExisting` whenever we need to provide an existing service via an alias. this way we share one dependecy among different tokens.

## `inject()` method

`inject()` lets you get a dependency without using a constructor. It can only be
called in an injection context (e.g., class field initializers, factory
functions, or inside providers).

```ts
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts() {
    return this.http.get("/api/products");
  }
}
```

> [!TIP]
> Use `inject()` in small utility services or when you want to avoid a long
> constructor signature.

## Cleaning up observers in services

Best practice is to **return Observables** from services and subscribe in the
component. When a service _must_ subscribe internally, clean up properly.

### `DestroyRef` + `takeUntilDestroyed` (Angular 16+)

```ts
import { DestroyRef, Injectable, inject } from "@angular/core";
import { fromEvent } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class KeyboardService {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    fromEvent<KeyboardEvent>(window, "keydown")
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        console.log(event.key);
      });
  }
}
```

> [!CAUTION]
> If a service is provided in `root`, it is destroyed only when the app is
> destroyed. Use component-level providers for short-lived services.

### `OnDestroy` + `Subject`

```ts
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable()
export class PollingService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  start(): void {
    interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log("polling");
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

Usage with a component provider (so the service is destroyed with the component):

```ts
@Component({
  selector: "app-dashboard",
  template: "...",
  providers: [PollingService],
})
export class DashboardComponent {
  constructor(private polling: PollingService) {
    this.polling.start();
  }
}
```

> [!TIP]
> If you track multiple subscriptions, use a `Subscription` container and
> call `unsubscribe()` in `ngOnDestroy`.
