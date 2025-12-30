# Attribute Binding

Attribute binding lets you set HTML attributes explicitly using `[attr.name]="expression"`. It is useful for attributes that do not have matching DOM properties or when you need to control presence of an attribute like `aria-*`, `colspan`, or `data-*`.

## Basic attribute binding

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-attribute-binding-demo",
  template: `
    <button [attr.aria-label]="saveLabel">Save</button>
    <td [attr.colspan]="colSpan">Total</td>
  `,
})
export class AttributeBindingDemoComponent {
  saveLabel = "Save changes";
  colSpan = 3;
}
```

## Conditional attributes

Set the attribute to `null` to remove it from the DOM.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-attribute-binding-demo",
  template: `
    <input [attr.placeholder]="showHint ? 'Type here' : null" />
    <a [attr.href]="isExternal ? url : null">Docs</a>
  `,
})
export class AttributeBindingDemoComponent {
  showHint = true;
  isExternal = false;
  url = "https://angular.dev";
}
```

## Data and ARIA attributes

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-attribute-binding-demo",
  template: ` <div [attr.data-id]="itemId" [attr.aria-live]="statusRole">Status</div> `,
})
export class AttributeBindingDemoComponent {
  itemId = "item-42";
  statusRole = "polite";
}
```

## Attribute binding vs property binding

- Use `[attr.name]` for attributes like `aria-*`, `data-*`, and `colspan`.
- Use `[property]` for real DOM properties like `value`, `checked`, and `disabled`.

Next Section : [Event Binding](/src/app/4-components-and-templates/README.md)
