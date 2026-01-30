# Angular Decorators (Core)

## Table of contents

- [Angular Decorators (Core)](#angular-decorators-core)
  - [Table of contents](#table-of-contents)
  - [Angular Decorator Categories](#angular-decorator-categories)
  - [Class decorators (high level)](#class-decorators-high-level)
  - [Parameter decorators (dependency injection)](#parameter-decorators-dependency-injection)
  - [Property Decorator](#property-decorator)
  - [`@Input()` (property decorator, parent -\> child data)](#input-property-decorator-parent---child-data)
  - [`@Output()` (property decorator, child -\> parent events)](#output-property-decorator-child---parent-events)
  - [`@HostBinding()` (property decorator, bind to host element)](#hostbinding-property-decorator-bind-to-host-element)
  - [`@ViewChild()` and `@ViewChildren()` (property decorator, query the component view)](#viewchild-and-viewchildren-property-decorator-query-the-component-view)
    - [Accessing different DOM elements using `ViewChild`](#accessing-different-dom-elements-using-viewchild)
  - [`@ContentChild()` and `@ContentChildren()` (property decorator, query projected content)](#contentchild-and-contentchildren-property-decorator-query-projected-content)
  - [`@HostListener()` (method decorator, listen on the host element)](#hostlistener-method-decorator-listen-on-the-host-element)
  - [Quick tips](#quick-tips)

Angular decorators add metadata to classes and class members so Angular can wire up inputs, outputs, DOM access, and content projection.

## Angular Decorator Categories

- Class Decorator
- Parameter Decorator
- Property Decorator
- Method Decorator

## Class decorators (high level)

Class decorators tell about a prticular class in Angular and how to treat a class at runtime (component or module).

- `@NgModule` groups related components, directives, pipes, and providers.
- `@Component` defines a UI building block with a template and styles.
  - selector
  - imports(Array)
  - templateUrl/template
  - styleUrl(Array)/style
  - animation(Array)
  - directives(Array)
  - pipes(Array)
- `@Injectable` marks a class as available for dependency injection.
- `@Directive` adds behavior to existing elements and components.
- `@Pipe` transforms data for display in templates.

> [!CAUTION]
> the `@NGModule` decorator no longer used from the Angular version 17th because Angular introduced standalone component by default for applications.

## Parameter decorators (dependency injection)

Parameter decorators control how Angular resolves a dependency for a specific constructor parameter.

> [!CAUTION]
> Angular since v14+ and very explicitly by v16–21 — has been re-centering DI around functions, not constructors.
> This matters because once you move DI out of the constructor, parameter decorators lose their central role

- `@Inject(TOKEN)` injects by token (useful for strings or custom injection tokens).
- `@Self()` resolves only from the current injector.
- `@SkipSelf()` skips the current injector and starts at the parent.
- `@Optional()` allows `null`/`undefined` when the token is not found.
- `@Host()` stops resolution at the host element boundary.

```ts
import { Component, Host, Inject, Optional, Self, SkipSelf } from "@angular/core";
import { LoggerService } from "./logger.service";
import { API_URL } from "./tokens";

/* eslint-disable @angular-eslint/prefer-inject */
@Component({
  selector: "app-panel",
  template: `<ng-content></ng-content>`,
  providers: [LoggerService],
})
export class PanelComponent {
  constructor(
    @Inject(API_URL) public apiUrl: string,
    @Self() private localLogger: LoggerService,
    @SkipSelf() @Optional() private parentLogger?: LoggerService,
    @Host() @Optional() private hostLogger?: LoggerService,
  ) {}
}
/* eslint-enable @angular-eslint/prefer-inject */
```

## Property Decorator

Let's focus on the most common Property Decorators:

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

> [!NOTE]
> Both primitive types and reference types like objects including arrays can be passed to a component through angular `@input`
> Angular tracks changes to primitive types becuase they are passed by value.
> For objects angular detect changes only when the reference to the object changes

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

> [!NOTE]
> Host Element is the element on which we attach out component or directive.

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
  @HostBinding("style.backgroundColor") bgColor = "#fff000";
}
```

Using HostBinding in a Directive:

```ts
import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @HostBinding("style.backgroundColor") bgColor = "#fff000";
  @HostBinding("style.color") color = "#111004ff";
}
```

Usage:

```html
<div appHighlight>Lorem Ipsum</div>
```

## `@ViewChild()` and `@ViewChildren()` (property decorator, query the component view)

Use view queries to get references to elements or child components declared in the component's template.
So `@ViewChild` decorator is used to get the reference of the DOM element in the component.

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

### Accessing different DOM elements using `ViewChild`

> [!CAUTION]
> When we are dealing with DOM manipulation, its better to implement the `ngAfterViewInit` hook and access it there.

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-search",
  template: `
    <input />
    <button #btnFocus (click)="focus()">Focus</button>
    <app-child></app-child>
  `,
})
export class SearchComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent?: ChildComponent; // Accessing angular Component, has no value in initial state
  @ViewChild("btnFocus") btnFocusRef?: ElementRef<HTMLButtonElement>; // ElementRef: this class used for dealing DOM elements

  ngAfterViewInit(): void {
    if (this.btnFocusRef?.nativeElement) {
      this.btnFocusRef?.nativeElement.innerHtml = "new button label";
    }
  }
}
```

> [!TIP]
> The `ElementRef` class acts as a wrapper around the native elements of DOM.

`@ViewChildren()` returns a `QueryList` of matching children:

```ts
import { Component, QueryList, ViewChildren } from "@angular/core";

@Component({
  selector: "app-tabs",
  template: `
    @for (tab of tabs; track $index) {
      <app-tab></app-tab>
    }
  `,
})
export class TabsComponent {
  @ViewChildren("app-tab") tabComponents?: QueryList<unknown>;
}
```

## `@ContentChild()` and `@ContentChildren()` (property decorator, query projected content)

Use content queries to access elements or components projected with `ng-content`.
So with `@ViewCHild` we get the reference of any DOM elements in the component, with `@ContentChild()` we get the refernce of the content projected into the components view.

Again what is the `Content Projection`?

It is a wa in angular to pass the html content from parent component to the child component's html using `ng-content`.

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
  @ContentChild("anotherOne") itemRef?: ElementRef;

  ngAfterContentInit(): void {
    // to manipolate the DOm using content child we have to used `ngAfterContentInit` hook
    this.title?.classList.add("is-highlighted");
    const content = this.itemRef?.nativeElement;
    content.style.color = `#afeeee`;
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

## `@HostListener()` (method decorator, listen on the host element)

Use `@HostListener()` to listen for DOM events on the component's host element (or on `window` / `document`).

So with `HostListener` we let Angular knowthat when an event on the host happens, the decorated method should be called on that event.

> [!NOTE]
> HostListener binds the class method to an event of Host Element.

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

Using HostListener in a Directive:

```ts
import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @HostBinding("style.backgroundColor") bgColor = "#fff000";
  @HostBinding("style.color") color = "#111004ff";

  @HostListener("click") onToggle() {
    if (this.bgColor === "#fff000") {
      // change the background color and color on click
    } else {
      // reset it to the default values
      this.bgColor = "#fff000";
      this.color = "#111004ff";
    }
  }
}
```

## Quick tips

- `@Input()` values are set after construction; use `ngOnInit` or `ngOnChanges`.
- `@ViewChild()` and `@ContentChild()` are available after `ngAfterViewInit` and `ngAfterContentInit`.
- Avoid heavy work in query hooks; use them to read DOM or call child APIs.

Next Section: [Angular Pipes](/src/app/12-pipes/README.md)
