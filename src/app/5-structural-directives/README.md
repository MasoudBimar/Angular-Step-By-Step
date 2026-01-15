# Structural Directives

## Table of contents

- [Structural Directives](#structural-directives)
  - [Table of contents](#table-of-contents)
  - [\*ngIf](#ngif)
    - [comparing ngIf with display: none](#comparing-ngif-with-display-none)
    - [How to store the result of an ngIf condition in a template local variable](#how-to-store-the-result-of-an-ngif-condition-in-a-template-local-variable)
  - [\*ngFor](#ngfor)
    - [How to optimize the rendering process](#how-to-optimize-the-rendering-process)
  - [\*ngSwitch](#ngswitch)
  - [Custom structural directive (idea)](#custom-structural-directive-idea)
  - [When use which `ngIf` vs `ngSwitch`](#when-use-which-ngif-vs-ngswitch)
  - [Key points](#key-points)

Structural directives change the DOM layout by adding, removing, or reusing elements. They use the `*` syntax, which Angular expands into an `ng-template` behind the scenes.

Sample command:

```bash
ng generate component structural-demo
```

## \*ngIf

Conditionally include or remove a block.

> [!NOTE]
> when ngIf remove a n element it is not hidden, it is removed from the DOM completetly.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <button (click)="toggle()">Toggle</button>
    <p *ngIf="isVisible">Now you see me</p>
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

### comparing ngIf with display: none

`*ngIf` adds or removes the element from the DOM. When the condition is false, the component and its template are destroyed, subscriptions are cleaned up, and state is lost. When it becomes true again, Angular recreates everything and lifecycle hooks run again.

`display: none` keeps the element in the DOM but hides it with CSS. The component stays alive, its state is preserved, and it still participates in change detection. This is useful when you want to toggle visibility without recreating the component.

Use `*ngIf` for heavy or optional sections because keeping elements in the DOM may consume memory & processing power, and `display: none` (or a CSS class) when you need to keep state and toggle often.

### How to store the result of an ngIf condition in a template local variable

> [!TIP]
> Creating local variable in template using `as` keyword

```html
<div *ngIf="user as userName">
  <h1>hello, {{userName}}</h1>
</div>
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

### How to optimize the rendering process

trackBy function helps Angular to identify each item uniquly, so the affected items ar re-rendered in an optimized way.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-demo",
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{{ i + 1 }}. {{ item }} <span *ngIf="isFirst">(first)</span></li>
    </ul>
  `,
})
export class StructuralDemoComponent {
  items = [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
  ];

  trackBy(item: any) {
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

> [!NOTE]
> Angular will only render the first matching switchCase & rest cases will be ignored

> [!CAUTION]
> for using any Structural Directive we need to import CommonModule or in newer version of angular the directive should be imported directly

## Custom structural directive (idea)

Custom structural directives let you define your own `*myDirective` syntax.

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef) {}

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
