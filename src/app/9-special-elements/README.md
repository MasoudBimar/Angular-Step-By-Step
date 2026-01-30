# Angular Special Elements

## Table of contents

- [Angular Special Elements](#angular-special-elements)
  - [Table of contents](#table-of-contents)
  - [1) `ng-container`](#1-ng-container)
  - [2) `ng-content`](#2-ng-content)
  - [3) `ng-template`](#3-ng-template)
  - [Comparing ng-template and ng-container](#comparing-ng-template-and-ng-container)
  - [4) `ngTemplateOutlet`](#4-ngtemplateoutlet)
  - [Key points](#key-points)

Angular ships a few "special elements" that help you shape templates without adding extra DOM, reuse markup, and project content into components.

## 1) `ng-container`

`ng-container` is a logical wrapper that never renders an actual DOM element. It is ideal for grouping structural directives without extra markup.

When to use:

- You need multiple structural directives in one spot (wrap them in a container).
- You want to apply `*ngIf` or `*ngFor` without adding an extra `<div>` to the DOM.
- You want cleaner HTML output while keeping template logic.

```html
<ng-container>
  @if (items.length) { @for (item of items; track $index) {
  <li>{{ item }}</li>
  } } @else {
  <p>No items yet.</p>
  }
</ng-container>
```

> [!TIP] > `ng-container` keeps your DOM clean and avoids breaking layouts with extra wrapper elements.

## 2) `ng-content`

`ng-content` projects child content into a component template. This is how you build reusable wrappers (cards, panels, modals) that accept custom content.

When to use:

- You want to pass arbitrary HTML into a component.
- You want slots for different content regions (header/body/footer).
- You are building layout or UI primitives.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-card",
  template: `
    <div class="card">
      <header class="card__header">
        <ng-content select="[card-title]"></ng-content>
      </header>
      <section class="card__body">
        <ng-content></ng-content>
      </section>
    </div>
  `,
})
export class CardComponent {}
```

```html
<app-card>
  <h3 card-title>Profile</h3>
  <p>Reusable content projection.</p>
</app-card>
```

> [!TIP]
> Use `select` to create multiple slots with attribute or element selectors.

## 3) `ng-template`

`ng-template` defines a template fragment that is not rendered by default. Angular only renders it when a structural directive or outlet instantiates it.

When to use:

- You need an `else` block for `*ngIf`.
- You want to define reusable fragments for `ngTemplateOutlet`.
- You need a template that is conditionally rendered without a wrapper element.

```html
<ng-template #loading>
  <p>Loading...</p>
</ng-template>

@if (dataLoaded) {
<p>Data ready.</p>
} @else {
<ng-container [ngTemplateOutlet]="loading"></ng-container>
}
```

> [!TIP] > `ng-template` is lightweight; it only appears in the DOM when instantiated (wont rendered independently).

> [!TIP] > `ng-template` is usefull when we need to render a block of code multiple time and we need to make it reusable.

## Comparing ng-template and ng-container

- both are used for rendering elements in the DOM
- `ng-template` is used for defining elements as template which can be used again but it cannot be rendered by its own.
- `ng-container` is used for grouping multiple elements that we want to decide about them all together
- both of them wont render extra element inside the DOM just their content
-

## 4) `ngTemplateOutlet`

`ngTemplateOutlet` is a directive renders an `ng-template` dynamically and can pass a context object for use it we need an ng-container.

When to use:

- You want to reuse the same template in multiple places.
- You need dynamic templates selected at runtime.
- You want to customize repeated layouts without copying markup.

Basic ngTemplateOutlet usage without variable

```html
<ng-template #basicTemplate>
  <p>This is a template that need to be rendered by ngTemplateOutlet</p>
</ng-template>

<ng-container [ngTemplateOutlet]="basicTemplate"></ng-container>
```

The second example use default variable for passing data

```html
<ng-template #basicTemplate let-msg>
  <p>{{msg}}</p>
</ng-template>

<ng-container [ngTemplateOutlet]="basicTemplate" [ngTemplateOutletContext]="{ $implicit: 'This message was passed via ngTemplateOutlet' }"></ng-container>
```

> [!TIP] Context object can contain any properties inside the template like object, function or boolean value.

```ts
export class UsersComponent {
  selectedUser = { name: "Dana", role: "Admin" };
}
```

```html
<ng-template #userTemplate let-user="user">
  <p>{{ user.name }} ({{ user.role }})</p>
</ng-template>

<ng-container [ngTemplateOutlet]="userTemplate" [ngTemplateOutletContext]="{ user: selectedUser }"></ng-container>
```

> [!TIP]
> Using the key $implicit in the context object will set its value as default

The `$implicit` keyword can be used to provide an implicit value to a template without giving the aditional variable inside the context
it treat the value provided by `$implicit` as a default value

```html
<ng-template #userTemplate let-user>
  <p>{{ user.name }} ({{ user.role }})</p>
</ng-template>

<ng-container [ngTemplateOutlet]="userTemplate" [ngTemplateOutletContext]="{ $implicit: selectedUser }"></ng-container>
```

> [!TIP]
> Use `let-xxx` to expose context values inside the template (from `ngTemplateOutletContext`).

## Key points

- `ng-container` groups template logic without adding DOM.
- `ng-content` enables content projection and slots.
- `ng-template` defines inert markup until instantiated.
- `ngTemplateOutlet` renders templates dynamically with context.

Next Section: [Component Lifecycles](/src/app/10-component-lifecycles/README.md)
