# Structural Directives

## Table of contents

- [Structural Directives](#structural-directives)
  - [Table of contents](#table-of-contents)
  - [Migrating from older angular control flow syntax to the new one](#migrating-from-older-angular-control-flow-syntax-to-the-new-one)
  - [\*ngIf](#ngif)
    - [Using else with `*ngIf`](#using-else-with-ngif)
    - [New control flow syntax for `*ngIf`](#new-control-flow-syntax-for-ngif)
    - [comparing ngIf with display: none](#comparing-ngif-with-display-none)
    - [How to store the result of an ngIf condition in a template local variable](#how-to-store-the-result-of-an-ngif-condition-in-a-template-local-variable)
  - [\*ngFor](#ngfor)
    - [New control flow syntax for `*ngFor`](#new-control-flow-syntax-for-ngfor)
    - [How to optimize the rendering process](#how-to-optimize-the-rendering-process)
  - [\*ngSwitch](#ngswitch)
    - [New control flow syntax for `*ngSwitch`](#new-control-flow-syntax-for-ngswitch)
  - [Custom structural directive (idea)](#custom-structural-directive-idea)
  - [When use which `ngIf` vs `ngSwitch`](#when-use-which-ngif-vs-ngswitch)
  - [Key points](#key-points)

Structural directives change the DOM layout by adding, removing, or reusing elements. They use the `*` syntax, which Angular expands into an `ng-template` behind the scenes.

Sample command:

```bash
ng generate component structural-demo
```

## Migrating from older angular control flow syntax to the new one

Angular v17+ introduces new control flow syntax using `@if`, `@for`, and `@switch` to replace the older `*ngIf`, `*ngFor`, and `*ngSwitch` directives. This new syntax aims to provide a more intuitive and readable way to handle conditional rendering, iteration, and switch-case logic in Angular templates.

```bash
ng generate @angular/core:control-flow
```

## \*ngIf

Conditionally include or remove a block.

> [!NOTE]
> when ngIf remove an element it is not hidden, it is removed from the DOM completetly.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <button (click)="toggle()">Toggle</button>
    @if (isVisible) {
      <p>Now you see me</p>
    }
  `,
})
export class StructuralDemoComponent {
  isVisible = true;

  toggle(): void {
    this.isVisible = !this.isVisible;
  }
}
```

> [!TIP]
> ngIf is usefull for conditional renderting of elements of DOM.

### Using else with `*ngIf`

Use the `else` syntax when you want a clear fallback template. Angular renders the `ngIf` block when the condition is true; otherwise it renders the `ng-template` referenced after `else`.

```html
<button (click)="toggle()">Toggle</button>

<div *ngIf="isVisible; else hiddenBlock">
  <p>Now you see me</p>
</div>

<ng-template #hiddenBlock>
  <p>Now you don't</p>
</ng-template>
```

```ts
export class StructuralDemoComponent {
  isVisible = true;

  toggle(): void {
    this.isVisible = !this.isVisible;
  }
}
```

### New control flow syntax for `*ngIf`

Angular v17+ introduces built-in control flow blocks. Use `@if` and `@else` to replace `*ngIf` when using the new syntax.

```html
<button (click)="toggle()">Toggle</button>

@if (isVisible) {
<p>Now you see me</p>
} @else {
<p>Now you don't</p>
}
```

> [!NOTE] > `@if` blocks are compiled by Angular and do not need `CommonModule`.

### comparing ngIf with display: none

`*ngIf` adds or removes the element from the DOM. When the condition is false, the component and its template are destroyed, subscriptions are cleaned up, and state is lost. When it becomes true again, Angular recreates everything and lifecycle hooks run again.

`display: none` keeps the element in the DOM but hides it with CSS. The component stays alive, its state is preserved, and it still participates in change detection. This is useful when you want to toggle visibility without recreating the component.

Use `*ngIf` for heavy or optional sections because keeping elements in the DOM may consume memory & processing power, and `display: none` (or a CSS class) when you need to keep state and toggle often.

### How to store the result of an ngIf condition in a template local variable

> [!TIP]
> Creating local variable in template using `as` keyword

```html
@if (user; as userName) {
<div>
  <h1>hello, {{ userName }}</h1>
</div>
}
```

## \*ngFor

Render a list by iterating an Array or Object and get context variables like `index`, `first`, and `last`.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <ul>
      <li *ngFor="let item of items; let i = index; let isFirst = first; let isOdd = odd; let isEven = even">{{ i + 1 }}. {{ item }} <span *ngIf="isFirst">(first)</span></li>
    </ul>
  `,
})
export class StructuralDemoComponent {
  items = ["One", "Two", "Three"];
}
```

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <ul>
      <li *ngFor="let item of items; index as i; first as isFirst; odd as isOdd; even as isEven">{{ i + 1 }}. {{ item }} <span *ngIf="isFirst">(first)</span></li>
    </ul>
  `,
})
export class StructuralDemoComponent {
  items = ["One", "Two", "Three"];
}
```

### New control flow syntax for `*ngFor`

Use `@for` to iterate over a list with built-in context variables like `$index`, `$first`, `$odd`, and `$even`.

```html
<ul>
  @for (item of items; track item; let i = $index; let isFirst = $first) {
  <li>
    {{ i + 1 }}. {{ item }} @if (isFirst) {
    <span>(first)</span>
    }
  </li>
  } @empty {
  <li>No items found.</li>
  }
</ul>
```

> [!TIP] > `track` in `@for` plays the same role as `trackBy` in `*ngFor`.

### How to optimize the rendering process

trackBy function helps Angular to identify each item uniquly, so the affected items ar re-rendered in an optimized way.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <ul>
      @for (item of items; track trackByFn(item); let i = $index; let isFirst = $first) {
        <li>
          {{ i + 1 }}. {{ item.name }}
          @if (isFirst) {
            <span>(first)</span>
          }
        </li>
      }
    </ul>
  `,
})
export class StructuralDemoComponent {
  items = [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
  ];

  trackByFn(item: { id: number }) {
    return item.id;
  }
}
```

## \*ngSwitch

Display one of several blocks based on a value. so it choose bettwen a list of switch options to conditionally render a view based on a given expression.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <div [ngSwitch]="status">
      <p *ngSwitchCase="'loading'">Loading...</p>
      <p *ngSwitchCase="'ready'">Ready</p>
      <p *ngSwitchDefault>Unknown</p>
    </div>
  `,
})
export class StructuralDemoComponent {
  status: "loading" | "ready" | "unknown" = "ready";
}
```

### New control flow syntax for `*ngSwitch`

Use `@switch` with `@case` and `@default` for a cleaner multi-branch template.

```html
@switch (status) { @case ("loading") {
<p>Loading...</p>
} @case ("ready") {
<p>Ready</p>
} @default {
<p>Unknown</p>
} }
```

> [!NOTE]
> Angular will only render the first matching switchCase & rest cases will be ignored

> [!CAUTION]
> for using any Structural Directive we need to import CommonModule or in newer version of angular the directive should be imported directly

## Custom structural directive (idea)

Custom structural directives let you define your own `*myDirective` syntax.

```ts
import { Directive, Input, TemplateRef, ViewContainerRef, inject } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  @Input() set appUnless(condition: boolean) {
    this.viewContainer.clear();
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
```

## When use which `ngIf` vs `ngSwitch`

Use `*ngIf` when you have a single condition or need to toggle one block on/off. It is ideal for simple yes/no cases or guarding optional sections.

Use `*ngSwitch` when you are choosing between multiple mutually exclusive views based on the same value (status, role, step, mode). It keeps templates readable and avoids long chains of `*ngIf` / `else if`.

If you only have two outcomes, `*ngIf` is usually clearer. If you expect the list of cases to grow, start with `*ngSwitch`.

## Key points

- Structural directives reshape the DOM, not just style or behavior.
- `*` syntax is sugar for `<ng-template>`.
- Use `ngIf`, `ngFor`, and `ngSwitch` for most layout logic.

Next Section: [Attribute Directives](/src/app/6-attribute-directives/README.md)

[Component Directives](/src/app/7-component-directives/README.md)

[Custom Directives](/src/app/8-custom-directives/README.md)
