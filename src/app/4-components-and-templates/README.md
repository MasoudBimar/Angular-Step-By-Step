# Components & Templates

## Table of contents

- [Components \& Templates](#components--templates)
  - [Table of contents](#table-of-contents)
  - [Component encapsulation](#component-encapsulation)
  - [Templates: inline or separate file](#templates-inline-or-separate-file)
  - [Styles: inline, separate, or global](#styles-inline-separate-or-global)
  - [Component selector](#component-selector)
  - [Change detection strategy](#change-detection-strategy)
  - [Component constructor](#component-constructor)
  - [Access modifiers and best practice](#access-modifiers-and-best-practice)
  - [Directives overview](#directives-overview)

This section covers how Angular components render templates, how styles are applied, and how directives extend the DOM.

Sample command:

```bash
ng generate component user-card
```

## Component encapsulation

Angular can scope component styles using view encapsulation.

```ts
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-user-card",
  template: `<p class="title">{{ name }}</p>`,
  styles: [
    `
      .title {
        color: #2a6;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UserCardComponent {
  name = "Ava";
}
```

- `Emulated` (default) scopes styles to the component.
- `None` makes styles global.
- `ShadowDom` uses the browser shadow DOM.

## Templates: inline or separate file

You can put templates inline with `template` or in a file with `templateUrl`.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-inline-template",
  template: `<h3>Inline template</h3>`,
})
export class InlineTemplateComponent {}
```

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-file-template",
  templateUrl: "./file-template.component.html",
})
export class FileTemplateComponent {}
```

## Styles: inline, separate, or global

Component styles can be inline with `styles`, external with `styleUrls`, or global via `src/styles.scss`.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-styled-card",
  templateUrl: "./styled-card.component.html",
  styleUrls: ["./styled-card.component.scss"],
  styles: [
    `
      .accent {
        font-weight: 600;
      }
    `,
  ],
})
export class StyledCardComponent {}
```

## Component selector

The `selector` defines the HTML tag used to place the component.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-alert",
  template: `<p class="alert">{{ message }}</p>`,
})
export class AlertComponent {
  message = "Saved";
}
```

Usage:

```html
<app-alert></app-alert>
```

## Change detection strategy

Change detection decides when the template should update.

```ts
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-fast-list",
  template: `<p>{{ count }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastListComponent {
  count = 0;
}
```

- `Default` checks every change detection cycle.
- `OnPush` checks when inputs change or events happen in the component.

## Component constructor

Use the constructor to inject dependencies, not to run heavy logic.

```ts
import { Component } from "@angular/core";
import { LoggerService } from "./logger.service";

@Component({
  selector: "app-logger-demo",
  template: `<p>Check the console</p>`,
})
export class LoggerDemoComponent {
  constructor(private logger: LoggerService) {
    this.logger.info("component created");
  }
}
```

## Access modifiers and best practice

Angular templates can access `public` and `protected` members, so keep UI-bound members public, use protected when subclasses should reuse members, and keep helper logic `private`.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-access-demo",
  template: `<p>{{ title }}</p>`,
})
export class AccessDemoComponent {
  public title = "Visible in template";

  private buildLabel(): string {
    return "internal";
  }
}
```

## Directives overview

One of the most core features of Angular is directives.
Directives extend HTML by adding behavior to elements.
A Directive is a set of classes used for addding some usefull behavior or some manipulations to the elements or components of the Angular application (adding, removing, changing element in/from the DOM).

Types of directives in Angular:

- **Component** directive (a directive responsible for controlling the rendering of the Angular components in the template).
- **Attribute** directive (changes appearance or behavior of html elements).
- **Structural** directive (responsible of changing DOM structureby adding/deleting or updating elements).
- **Custom Directive** user created directive by defining new behavior

This overview prepares for the next section where directives are covered in detail.

Next Section : [Structural Directives](/src/app/5-structural-directives/README.md)

[Attribute Directives](/src/app/6-attribute-directives/README.md)

[Component Directives](/src/app/7-component-directives/README.md)

[Custom Directives](/src/app/8-custom-directives/README.md)
