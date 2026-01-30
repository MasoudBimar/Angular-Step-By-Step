# Angular Component Lifecycle

## Table of contents

- [Angular Component Lifecycle](#angular-component-lifecycle)
  - [Table of contents](#table-of-contents)
  - [Lifecycle order (high level)](#lifecycle-order-high-level)
  - [General order of lifecycle hooks](#general-order-of-lifecycle-hooks)
  - [What is `constructor` good for?](#what-is-constructor-good-for)
  - [Common hooks, when to use them](#common-hooks-when-to-use-them)
    - [`ngOnInit`](#ngoninit)
    - [`ngOnChanges`](#ngonchanges)
    - [`ngDoCheck`](#ngdocheck)
    - [`ngAfterContentInit` / `ngAfterContentChecked`](#ngaftercontentinit--ngaftercontentchecked)
    - [`ngAfterViewInit` / `ngAfterViewChecked`](#ngafterviewinit--ngafterviewchecked)
    - [How to make sure changes in the 'ngAfterViewInit' won't cause **Expression has changed after it was checked**?](#how-to-make-sure-changes-in-the-ngafterviewinit-wont-cause-expression-has-changed-after-it-was-checked)
    - [`ngOnDestroy`](#ngondestroy)
  - [Render hooks (signals-friendly)](#render-hooks-signals-friendly)
    - [`afterRender()`](#afterrender)
    - [`afterNextRender()`](#afternextrender)
  - [Tips \& Tricks](#tips--tricks)
  - [Key points](#key-points)

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

> [!TIP] > `ngOnChanges` only runs when the component has `@Input` values and they change.

## General order of lifecycle hooks

Angular runs lifecycle hooks in a predictable sequence, but the exact set depends on whether it is the first render or a later change detection pass.

First render (component creation):

1. `constructor`
2. `ngOnChanges` (only if `@Input` values exist)
3. `ngOnInit`
4. `ngDoCheck`
5. `ngAfterContentInit`
6. `ngAfterContentChecked`
7. `ngAfterViewInit`
8. `ngAfterViewChecked`

Subsequent change detection passes:

1. `ngOnChanges` (only if `@Input` references changed)
2. `ngDoCheck`
3. `ngAfterContentChecked`
4. `ngAfterViewChecked`

Destruction:

1. `ngOnDestroy`

This hooks mainly used in the child components & DOM manipolation

1. `ngAfterContentInit`
2. `ngAfterContentChecked`
3. `ngAfterViewInit`
4. `ngAfterViewChecked`

## What is `constructor` good for?

The constructor runs when Angular creates the class instance. It is best used for:

- Dependency injection (services, router, etc.).
- Simple field initialization.

Avoid heavy work here:

- No HTTP calls.
- No DOM access.
- Inputs are not set yet.

> [!CATUON]
> If you try to access input properties in the constructor, they will be undefined.

```ts
import { Component, inject } from "@angular/core";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  template: `<p>{{ title }}</p>`,
})
export class UsersComponent {
  title = "Users";

  private users = inject(UsersService);
}
```

## Common hooks, when to use them

### `ngOnInit`

Runs once after the first `ngOnChanges`. Use it for initialization that needs inputs to be set.

This hook is called only once, after the first change detection cycle, when the component is initialized.

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

> [!TIP]
> When the ngOnInit calls Angular finished creating the component and setting up the inputs But its before rendering the view in the DOM.

### `ngOnChanges`

Runs whenever an `@Input` reference changes(evety time there is a change detected in input properties).

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

> [!TIP]
> Every time an `@Input` property changes, Angular passes change metadata to the `SimpleChanges` object, and the new value is reflected on the input property before `ngOnChanges` is called.

Simple Change Structure

```ts
export type SimpleChanges = Record<string, SimpleChange>;

export declare class SimpleChange {
  previousValue: unknown;
  currentValue: unknown;
  firstChange: boolean;
}
```

> [!CAUTION]
> Intermediate Updates that occur before the detection cycle are ignored by the `SimpleChanges`.

### `ngDoCheck`

Custom change detection hook. Use sparingly (not always).
This hook used for performing a custom change detection & responding to a change detection in the component.

When to use:

- You need to detect changes that Angular does not track (mutations inside objects/arrays).
- You need to run custom dirty-check logic.

> [!CAUTION]
> Never use `ngOnChanges` and `ngDoCheck` hooks together in the same component.

```ts
import { Component, DoCheck, Input } from "@angular/core";

@Component({
  selector: "app-user-badge",
  template: `<p>{{ label }}</p>`,
})
export class UserBadgeComponent implements DoCheck {
  @Input() user: { name: string } = { name: "" };
  private previousUserName: string | undefined;

  ngDoCheck(): void {
    if (this.user.name !== this.previousUserName) {
      this.previousUserName = this.user.name;
      console.log("ngDoCheck called");
    }
  }
}
```

> [!TIP]
> Prefer immutable updates over `ngDoCheck` when possible.

### `ngAfterContentInit` / `ngAfterContentChecked`

This hook `ngAfterContentInit` invoked when there is some content projected into the component.
So it runs after Angular projects content using `ng-content`.

What is [Content Projection](/src/app//5-structural-directives/README.md)?

Inputs (@Input) are great for data. Content projection is for structure and semantics.

We use projection when:

- The parent must control markup, not just values
- You want reusable layout components (cards, modals, tabs)
- Accessibility or semantics matter (headings, lists, buttons)

> [!NOTE] > `ngAfterContentInit` Calls only once throught the component lifecycle.

When to use `ngAfterContentInit`:

> [!TIP]
> There are two more child decorators that are used for trigering the `ngAfterContentInit` hook: `@ViewChild `& `@ContentChild`.

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

The `ngAfterContentChecked` hook checks for the content of the component on event change detection cycle.

### `ngAfterViewInit` / `ngAfterViewChecked`

the `ngAfterViewInit` hook runs after the component view and child views are initialized.
this hook calls when angular finishes the initialization of the view in the DOM.

> [!NOTE]
> The view has been Initialized means the component and its templatehave been rendered & ready to be used.

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

### How to make sure changes in the 'ngAfterViewInit' won't cause **Expression has changed after it was checked**?

This error happens when something changes after second phase of chnage detection performed by angular usually when change happens in this hook.

> [!NOTE]
> The `ngAfterViewChecked` hook calls after checking the component's view and child views.

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
  private timerId = window.setInterval(() => {
    console.log("polling...");
  }, 2000);

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
      @for (m of messages(); track $index) {
        <li>{{ m }}</li>
      }
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

## Tips & Tricks

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

Next Section: [Decorators](/src/app/11-decorators/README.md)
