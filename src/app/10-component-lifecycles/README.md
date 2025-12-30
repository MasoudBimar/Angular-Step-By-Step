# Angular Component Lifecycle

Angular components and directives have lifecycle hooks that let you run code at specific moments (creation, input changes, view rendering, and destruction). Use these hooks to keep templates fast, manage subscriptions, and safely access the DOM.

## Lifecycle order (high level)

1. `constructor`
2. `ngOnChanges`
3. `ngOnInit`
4. `ngDoCheck`
5. `ngAfterContentInit`
6. `ngAfterContentChecked`
7. `ngAfterViewInit`
8. `ngAfterViewChecked`
9. `ngOnDestroy`

> [!TIP]
> `ngOnChanges` only runs when the component has `@Input` values and they change.

## What is `constructor` good for?

The constructor runs when Angular creates the class instance. It is best used for:

- Dependency injection (services, router, etc.).
- Simple field initialization.

Avoid heavy work here:

- No HTTP calls.
- No DOM access.
- Inputs are not set yet.

```ts
import { Component } from "@angular/core";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  template: `<p>{{ title }}</p>`,
})
export class UsersComponent {
  title = "Users";

  constructor(private users: UsersService) {}
}
```

## Common hooks, when to use them

### `ngOnInit`

Runs once after the first `ngOnChanges`. Use it for initialization that needs inputs to be set.

When to use:

- Start HTTP requests.
- Initialize derived state.
- Setup subscriptions.

```ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  template: `<p>{{ total }}</p>`,
})
export class UsersComponent implements OnInit {
  total = 0;

  ngOnInit(): void {
    this.total = 42;
  }
}
```

### `ngOnChanges`

Runs whenever an `@Input` reference changes.

When to use:

- React to parent-provided data changes.
- Recompute derived values when inputs update.

```ts
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-user-badge",
  template: `<p>{{ label }}</p>`,
})
export class UserBadgeComponent implements OnChanges {
  @Input() status = "";
  label = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["status"]) {
      this.label = this.status.toUpperCase();
    }
  }
}
```

### `ngDoCheck`

Custom change detection hook. Use sparingly.

When to use:

- You need to detect changes that Angular does not track (mutations inside objects/arrays).
- You need to run custom dirty-check logic.

> [!TIP]
> Prefer immutable updates over `ngDoCheck` when possible.

### `ngAfterContentInit` / `ngAfterContentChecked`

Runs after Angular projects content using `ng-content`.

When to use:

- You need access to projected content (content children).
- You need to run logic after projected content updates.

```ts
import { AfterContentInit, Component, ContentChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-panel",
  template: `
    <section class="panel">
      <ng-content></ng-content>
    </section>
  `,
})
export class PanelComponent implements AfterContentInit {
  @ContentChild("panelTitle") title?: ElementRef<HTMLElement>;

  ngAfterContentInit(): void {
    if (this.title) {
      this.title.nativeElement.style.textTransform = "uppercase";
    }
  }
}
```

### `ngAfterViewInit` / `ngAfterViewChecked`

Runs after the component view and child views are initialized.

When to use:

- Access `@ViewChild` and work with rendered elements.
- Integrate with DOM-dependent libraries.

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-chart",
  template: `<canvas #chart></canvas>`,
})
export class ChartComponent implements AfterViewInit {
  @ViewChild("chart") canvas?: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.canvas?.nativeElement.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "seagreen";
      ctx.fillRect(10, 10, 120, 60);
    }
  }
}
```

### `ngOnDestroy`

Runs just before Angular destroys the component.

When to use:

- Clean up subscriptions and timers.
- Detach event listeners.
- Cancel pending tasks.

```ts
import { Component, OnDestroy } from "@angular/core";

@Component({
  selector: "app-polling",
  template: `<p>Polling...</p>`,
})
export class PollingComponent implements OnDestroy {
  private timerId = window.setInterval(() => {}, 2000);

  ngOnDestroy(): void {
    window.clearInterval(this.timerId);
  }
}
```

## Render hooks (signals-friendly)

These helpers run after render and are useful when your template is driven by signals. They are functions, not class lifecycle methods.

### `afterRender()`

Runs after every render. Use it when you need the DOM now (measure, focus, or integrate with DOM-only libraries).

```ts
import { Component, ElementRef, afterRender, inject, signal } from "@angular/core";

@Component({
  selector: "app-panel",
  template: `
    <section class="panel" [class.open]="isOpen()">
      <h3>Panel</h3>
      <button (click)="toggle()">Toggle</button>
    </section>
  `,
})
export class PanelComponent {
  private host = inject(ElementRef<HTMLElement>);
  isOpen = signal(false);

  constructor() {
    afterRender(() => {
      const panel = this.host.nativeElement.querySelector(".panel");
      if (panel && this.isOpen()) {
        panel.setAttribute("tabindex", "-1");
        panel.focus();
      }
    });
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }
}
```

### `afterNextRender()`

Runs once after the next render. Use it when a signal or state change updates the DOM and you need to act after that update.

```ts
import { Component, ElementRef, afterNextRender, inject, signal } from "@angular/core";

@Component({
  selector: "app-messages",
  template: `
    <button (click)="add()">Add</button>
    <ul>
      <li *ngFor="let m of messages()">{{ m }}</li>
    </ul>
  `,
})
export class MessagesComponent {
  private host = inject(ElementRef<HTMLElement>);
  messages = signal<string[]>([]);

  add(): void {
    this.messages.update((list) => [...list, `Item ${list.length + 1}`]);
    afterNextRender(() => {
      const last = this.host.nativeElement.querySelector("li:last-child");
      last?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
}
```

> [!TIP]
> Use `afterRender`/`afterNextRender` inside an injection context (constructor or field initializer).

## Tips & tricks

- Use `ngOnInit` for data loading, not the constructor.
- Use `ngAfterViewInit` for `@ViewChild` access and DOM-dependent code.
- Avoid heavy work in `ngAfterViewChecked` and `ngAfterContentChecked` (they run often).
- Always unsubscribe in `ngOnDestroy` (or use `takeUntilDestroyed` in Angular 16+).

## Key points

- Lifecycle hooks provide predictable places to run code.
- `constructor` is for DI and lightweight setup.
- `ngOnInit` is the most common hook for initialization.
- Cleanup goes in `ngOnDestroy`.

> [!CAUTION]
> In Angular 21 (released in late 2025), traditional class-based lifecycle hooks (like ngOnInit) are still supported but are increasingly being replaced by modern, functional alternatives designed for a signal-driven and "Zoneless" ecosystem
