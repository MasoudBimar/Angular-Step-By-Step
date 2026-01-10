# Interpolation, Property Binding and Event Binding

## Table of contents

- [Comparison of Property Binding vs Interpolation](#comparison-of-property-binding-vs-interpolation)
  **Interpolation** is an Angular template feature that renders component data inside the HTML using `{{ }}`. You can display properties, call methods, use simple expressions, and apply pipes for formatting.

**Event binding** lets you listen to DOM events and run component methods using `(event)="handler()"`. It is the primary way to react to user actions like clicks, input changes, and keyboard events.

**Property Binding** lets you set DOM properties from component data using `[property]="expression"`. Use it when you want to bind to an element property (like `disabled`, `src`, `value`) or a directive input. Interpolation `{{ }}` writes text, while property binding writes to a property.

**Attribute Binding** lets you set HTML attributes explicitly using `[attr.name]="expression"`. It is useful for attributes that do not have matching DOM properties or when you need to control presence of an attribute like `aria-*`, `colspan`, or `data-*`.

## Comparison of Property Binding vs Interpolation

Interpolation writes a string into the attribute, while property binding sets the real DOM property. For boolean properties like `disabled`, any attribute value (even `"false"`) disables the input.

> [!CAUTION]
> Using Interpolation to set properties can Lead to Unexpected behavior because interpolation always treats all the data types including boolean as a string.

> [!TIP]
> Property Binding is better way for setting DOM properties using non-string values like boolean, number, objects and arrays.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-binding-compare",
  template: `
    <!-- Property binding: false keeps the input enabled -->
    <input [disabled]="isDisabled" placeholder="Enabled input" />

    <!-- Interpolation: writes disabled="false", but the input is still disabled -->
    <input disabled="{{ isDisabled }}" placeholder="Still disabled" />
  `,
})
export class BindingCompareComponent {
  isDisabled: boolean = false;
}
```

Next Section: [Interpolation](/src/app/3-angular-fundamentals/Interpolation.md)

[Property Binding](/src/app/3-angular-fundamentals/Property-Binding.md)

[Event Binding](/src/app/3-angular-fundamentals/Event-Binding.md)

[Attribute Binding](/src/app/3-angular-fundamentals/Attribute-Binding.md)
