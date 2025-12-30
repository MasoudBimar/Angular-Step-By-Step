# Angular Decorators (Core)

Angular decorators add metadata to classes and class members so Angular can wire up inputs, outputs, DOM access, and content projection.

## Angular Decorator Categories

- Class Decorator
- Method Decorator
- Parameter Decorator
- Property Decorator

## Class decorators (high level)

Class decorators tell Angular how to treat a class at runtime.

- `@NgModule` groups related components, directives, pipes, and providers.
- `@Component` defines a UI building block with a template and styles.
- `@Injectable` marks a class as available for dependency injection.
- `@Directive` adds behavior to existing elements and components.
- `@Pipe` transforms data for display in templates.

## Parameter decorators (dependency injection)

Parameter decorators control how Angular resolves a dependency for a specific constructor parameter.

- `@Inject(TOKEN)` injects by token (useful for strings or custom injection tokens).
- `@Self()` resolves only from the current injector.
- `@SkipSelf()` skips the current injector and starts at the parent.
- `@Optional()` allows `null`/`undefined` when the token is not found.
- `@Host()` stops resolution at the host element boundary.

```ts
import { Component, Host, Inject, Optional, Self, SkipSelf } from "@angular/core";
import { LoggerService } from "./logger.service";
import { API_URL } from "./tokens";

@Component({
  selector: "app-panel",
  template: `<ng-content></ng-content>`,
  providers: [LoggerService],
})
export class PanelComponent {
  constructor(@Inject(API_URL) public apiUrl: string, @Self() private localLogger: LoggerService, @SkipSelf() @Optional() private parentLogger?: LoggerService, @Host() @Optional() private hostLogger?: LoggerService) {}
}
```

This page focuses on the most common member decorators:

- `@Input()` and `@Output()` for parent-child communication.
- `@HostBinding()` for binding to the host element.
- `@ViewChild()` / `@ViewChildren()` for view queries.
- `@ContentChild()` / `@ContentChildren()` for projected content queries.

## `@Input()` (property decorator, parent -> child data)

Use `@Input()` to accept data from a parent component. Angular updates the value whenever the parent binding changes.

When to use:

- Pass configuration or data into a reusable component.
- React to parent updates using `ngOnChanges`.

```ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user-card",
  template: `<h3>{{ name }}</h3>`,
})
export class UserCardComponent {
  @Input() name = "";
}
```

Parent usage:

```html
<app-user-card [name]="user.name"></app-user-card>
```

## `@Output()` (property decorator, child -> parent events)

Use `@Output()` with an `EventEmitter` to notify the parent about events or data changes.

When to use:

- Emit user actions (clicks, selections).
- Send results back to the parent.

```ts
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-counter",
  template: `<button (click)="increment()">+1</button>`,
})
export class CounterComponent {
  @Output() valueChange = new EventEmitter<number>();
  private value = 0;

  increment(): void {
    this.value += 1;
    this.valueChange.emit(this.value);
  }
}
```

Parent usage:

```html
<app-counter (valueChange)="onValueChanged($event)"></app-counter>
```

## `@HostBinding()` (property decorator, bind to host element)

Use `@HostBinding()` to bind a class, style, or attribute on the component's host element.

When to use:

- Toggle host CSS classes based on component state.
- Bind accessibility attributes.

```ts
import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "app-alert",
  template: `<ng-content></ng-content>`,
})
export class AlertComponent {
  @HostBinding("class.is-open") isOpen = true;
  @HostBinding("attr.role") role = "alert";
}
```

## `@HostListener()` (method decorator, listen on the host element)

Use `@HostListener()` to listen for DOM events on the component's host element (or on `window` / `document`).

When to use:

- React to host interactions like hover or key presses.
- Handle global events (resize, scroll) from within a component.

```ts
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-hotkey",
  template: `<p>Press "k" to open search.</p>`,
})
export class HotkeyComponent {
  @HostListener("window:keydown", ["$event"])
  onKeydown(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === "k") {
      console.log("Open search");
    }
  }
}
```

## `@ViewChild()` and `@ViewChildren()` (property decorator, query the component view)

Use view queries to get references to elements or child components declared in the component's template.

When to use:

- Access a DOM element (`ElementRef`) after render.
- Call methods on a child component.

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-search",
  template: `
    <input #term />
    <button (click)="focus()">Focus</button>
  `,
})
export class SearchComponent implements AfterViewInit {
  @ViewChild("term") input?: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.input?.nativeElement.focus();
  }

  focus(): void {
    this.input?.nativeElement.focus();
  }
}
```

`@ViewChildren()` returns a `QueryList` of matching children:

```ts
import { Component, QueryList, ViewChildren } from "@angular/core";

@Component({
  selector: "app-tabs",
  template: ` <app-tab *ngFor="let tab of tabs"></app-tab> `,
})
export class TabsComponent {
  @ViewChildren("app-tab") tabComponents?: QueryList<unknown>;
}
```

## `@ContentChild()` and `@ContentChildren()` (property decorator, query projected content)

Use content queries to access elements or components projected with `ng-content`.

When to use:

- Coordinate with projected child components.
- Read data or call methods on projected content.

```ts
import { AfterContentInit, Component, ContentChild } from "@angular/core";

@Component({
  selector: "app-panel",
  template: `
    <section class="panel">
      <ng-content></ng-content>
    </section>
  `,
})
export class PanelComponent implements AfterContentInit {
  @ContentChild("title") title?: HTMLElement;

  ngAfterContentInit(): void {
    this.title?.classList.add("is-highlighted");
  }
}
```

`@ContentChildren()` returns a `QueryList` of projected matches:

```ts
import { Component, ContentChildren, QueryList } from "@angular/core";

@Component({
  selector: "app-toolbar",
  template: ` <ng-content></ng-content> `,
})
export class ToolbarComponent {
  @ContentChildren("tool") tools?: QueryList<unknown>;
}
```

## Quick tips

- `@Input()` values are set after construction; use `ngOnInit` or `ngOnChanges`.
- `@ViewChild()` and `@ContentChild()` are available after `ngAfterViewInit` and `ngAfterContentInit`.
- Avoid heavy work in query hooks; use them to read DOM or call child APIs.
