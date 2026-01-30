# Angular Template Variable

## Table of contents

- [Angular Template Variable](#angular-template-variable)
  - [Table of contents](#table-of-contents)
  - [Case 1 — Native DOM element (most basic)](#case-1--native-dom-element-most-basic)
  - [Case 2 — Component instance](#case-2--component-instance)
  - [Case 3 — Directive instance via exportAs](#case-3--directive-instance-via-exportas)
  - [Case 4 — Structural directive context (\*ngFor, \*ngIf)](#case-4--structural-directive-context-ngfor-ngif)
  - [Case 5 — ng-template explicit variables](#case-5--ng-template-explicit-variables)
  - [@let in Angular 17+](#let-in-angular-17)

Template variables give you a way to reference elements, components, or directive instances directly in the template using `#varName`.

Sample command:

```bash
ng generate component template-var-demo
```

## Case 1 — Native DOM element (most basic)

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-template-var-demo",
  template: `
    <input #nameInput placeholder="Name" />
    <button (click)="logValue(nameInput.value)">Log</button>
  `,
})
export class TemplateVarDemoComponent {
  logValue(value: string): void {
    console.log(value);
  }
}
```

## Case 2 — Component instance

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-template-var-demo",
  template: `
    <app-child #child></app-child>
    <button (click)="child.reset()">Reset Child</button>
  `,
})
export class TemplateVarDemoComponent {}
```

## Case 3 — Directive instance via exportAs

```ts
import { Component, Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
  exportAs: "highlight",
})
export class HighlightDirective {
  isOn = false;

  @HostListener("click")
  toggle(): void {
    this.isOn = !this.isOn;
  }
}

@Component({
  selector: "app-template-var-demo",
  template: `
    <p appHighlight #hl="highlight">Click to toggle</p>
    <span>Active: {{ hl.isOn }}</span>
  `,
})
export class TemplateVarDemoComponent {}
```

## Case 4 — Structural directive context (*ngFor, *ngIf)

Angular exposes context variables like `index`, `first`, and `last` in structural directives.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-template-var-demo",
  template: `
    <ul>
      @for (item of items; track $index; let i = $index; let isFirst = $first) {
        <li>
          {{ i }} - {{ item }}
          @if (isFirst) {
            <span>(first)</span>
          }
        </li>
      }
    </ul>
  `,
})
export class TemplateVarDemoComponent {
  items = ["one", "two", "three"];
}
```

## Case 5 — ng-template explicit variables

`ng-template` exposes values with `let-` syntax.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-template-var-demo",
  template: `
    <ng-template #row let-name let-index="idx">
      <div>{{ index + 1 }}. {{ name }}</div>
    </ng-template>

    @for (user of users; track $index; let i = $index) {
      <ng-container *ngTemplateOutlet="row; context: { $implicit: user, idx: i }"></ng-container>
    }
  `,
})
export class TemplateVarDemoComponent {
  users = ["Sara", "Omar", "Lina"];
}
```

## @let in Angular 17+

Angular 17 introduced `@let` to declare local template variables inside a block.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-template-var-demo",
  template: `
    @let total = price * quantity;
    <p>Total: {{ total }}</p>
  `,
})
export class TemplateVarDemoComponent {
  price = 25;
  quantity = 3;
}
```
