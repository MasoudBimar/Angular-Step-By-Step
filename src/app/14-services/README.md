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

> [!NOTE] > `providedIn` is the preferred approach because it enables tree-shaking.

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
