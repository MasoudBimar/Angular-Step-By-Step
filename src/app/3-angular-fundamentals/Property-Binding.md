# Property Binding

## Table of contents

- [Property Binding](#property-binding)
  - [Table of contents](#table-of-contents)
  - [Basic property binding](#basic-property-binding)
  - [Property binding with expressions](#property-binding-with-expressions)
  - [Binding to styles and classes](#binding-to-styles-and-classes)
  - [Using pipes in property binding](#using-pipes-in-property-binding)
  - [Property binding vs interpolation](#property-binding-vs-interpolation)

Property binding lets you set DOM properties from component data using `[property]="expression"`. Use it when you want to bind to an element property (like `disabled`, `src`, `value`) or a directive input. Interpolation `{{ }}` writes text, while property binding writes to a property.

## Basic property binding

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-property-binding-demo",
  template: `
    <button [disabled]="isSaving">Save</button>
    <img [src]="imageUrl" [alt]="altText" />
  `,
})
export class PropertyBindingDemoComponent {
  isSaving = true;
  imageUrl = "assets/logo.png";
  altText = "Company logo";
}
```

## Property binding with expressions

You can use simple expressions, math, and ternaries inside the binding.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-property-binding-demo",
  template: `
    <progress [value]="current" [max]="max"></progress>
    <input [value]="firstName + ' ' + lastName" />
    <span [title]="isActive ? 'Active user' : 'Inactive user'">Status</span>
  `,
})
export class PropertyBindingDemoComponent {
  current = 35;
  max = 100;
  firstName = "Ava";
  lastName = "Lee";
  isActive = false;
}
```

## Binding to styles and classes

You can bind to style and class properties using `style` and `class`.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-property-binding-demo",
  template: `
    <p [style.color]="isError ? 'crimson' : 'seagreen'">Status message</p>
    <div [class.highlight]="isHighlighted">Box</div>
  `,
})
export class PropertyBindingDemoComponent {
  isError = true;
  isHighlighted = false;
}
```

## Using pipes in property binding

Pipes can transform values before they are assigned to a property.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-property-binding-demo",
  template: `
    <input [value]="name | uppercase" />
    <span [title]="createdAt | date: 'yyyy-MM-dd'">Created</span>
  `,
})
export class PropertyBindingDemoComponent {
  name = "angular";
  createdAt = new Date(2024, 0, 15);
}
```

## Property binding vs interpolation

- Use interpolation `{{ }}` to render text content.
- Use property binding `[prop]` to set DOM properties or directive inputs.

Next Section : [Event Binding](/src/app/3-angular-fundamentals/Event-binding.md)
