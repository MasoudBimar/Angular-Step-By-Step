# Attribute Directives

## Table of contents

- [Attribute Directives](#attribute-directives)
  - [Table of contents](#table-of-contents)
  - [Built-in attribute directives](#built-in-attribute-directives)
  - [ngClass](#ngclass)
    - [Apply multiplecss class using ngClass](#apply-multiplecss-class-using-ngclass)
    - [Apply list of css class using ngClass](#apply-list-of-css-class-using-ngclass)
    - [Apply css classes using object conditionally](#apply-css-classes-using-object-conditionally)
  - [ngStyle](#ngstyle)
  - [ngModel](#ngmodel)
  - [Custom attribute directive](#custom-attribute-directive)
    - [Renderer2 version (platform-safe)](#renderer2-version-platform-safe)
  - [Key points](#key-points)
  - [Attribute vs structural directives](#attribute-vs-structural-directives)

Attribute directives change the appearance or behavior of an existing element without adding or removing it. They are applied as attributes (no `*`) and typically respond to inputs or events.

## Built-in attribute directives

Common examples:

- `ngClass` applies classes conditionally.
- `ngStyle` applies inline styles conditionally.
- `ngModel` enables two-way binding (FormsModule required).

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-attr-directive-demo",
  template: `
    <p [ngClass]="{ active: isActive, error: hasError }">Status</p>
    <p [ngStyle]="{ color: isActive ? 'green' : 'gray' }">Styled text</p>
  `,
})
export class AttrDirectiveDemoComponent {
  isActive = true;
  hasError = false;
}
```

## ngClass

> [!CAUTION]
> Deprecation: ngStyle and ngClass were officially marked as deprecated starting with Angular 19.1.

> [!NOTE]
> Angular has moved towards encouraging native [style] and [class] bindings over the ngStyle and ngClass directives for better performance and simplicity. However, ngStyle and ngClass are still available for use in existing applications.

Use `ngClass` to toggle classes based on component state.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngclass-demo",
  template: `
    <button (click)="isActive = !isActive">Toggle</button>
    <p [ngClass]="{ active: isActive, muted: !isActive }">Status</p>
    <p [ngClass]="['chip', isActive ? 'chip--on' : 'chip--off']">Badge</p>
  `,
})
export class NgClassDemoComponent {
  isActive = true;
}
```

### Apply multiplecss class using ngClass

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngclass-demo",
  template: ` <p [ngClass]="'class1 class2 class3'">Status</p> `,
})
export class NgClassDemoComponent {
  isActive = true;
}
```

### Apply list of css class using ngClass

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngclass-demo",
  template: ` <p [ngClass]="'class1 class2 class3'">Status</p> `,
})
export class NgClassDemoComponent {
  isActive = true;
}
```

### Apply css classes using object conditionally

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngclass-demo",
  template: `
    <p
      [ngClass]="{
        class1: hasClass1,
        class2: hasClass2,
        class3: hasClass3,
      }"
    >
      Status
    </p>
  `,
})
export class NgClassDemoComponent {
  isActive: boolean = true;
  hasClass1: boolean = true;
  hasClass2: boolean = false;
  hasClass3: boolean = true;
}
```

## ngStyle

Use `ngStyle` to set inline styles from expressions.
BY using ngStyle we can apply styles based on some condition values that could change dynamically.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngstyle-demo",
  template: `
    <p [ngStyle]="{ color: color, fontSize: size + 'px' }">Styled text</p>
    <button (click)="toggle()">Toggle Style</button>
  `,
})
export class NgStyleDemoComponent {
  color = "seagreen";
  size = 18;

  toggle(): void {
    this.color = this.color === "seagreen" ? "crimson" : "seagreen";
    this.size = this.size === 18 ? 22 : 18;
  }
}
```

Passing styles as an object

> [!TIP]
> CSS keys can be either kebab-case with single quotes or camelCase without quotes.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngstyle-demo",
  template: ` <p [ngStyle]="styleValues">Styled text</p> `,
})
export class NgStyleDemoComponent {
  styleValues = {
    color: "blue",
    "font-style": "italic",
    "font-size": "35px",
  };
}
```

Passing a function with a parameter value to the ngStyle directive is also possible & valid.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngstyle-demo",
  template: ` <p [ngStyle]="{ color: getColor() }">Styled text</p> `,
})
export class NgStyleDemoComponent {
  color = "seagreen";
  size = 18;

  getColor(): void {
    return "white";
  }
}
```

## ngModel

Use `ngModel` for two-way binding in template-driven forms. You must import `FormsModule` in the module that declares the component.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-ngmodel-demo",
  template: `
    <input [(ngModel)]="name" placeholder="Your name" />
    <p>Hello, {{ name }}</p>
  `,
})
export class NgModelDemoComponent {
  name = "Sara";
}
```

## Custom attribute directive

Create a directive that changes the host element.

```ts
import { Directive, ElementRef, HostListener, Input, inject } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight = "gold";

  private elementRef = inject(ElementRef<HTMLElement>);

  @HostListener("mouseenter")
  onEnter(): void {
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener("mouseleave")
  onLeave(): void {
    this.elementRef.nativeElement.style.backgroundColor = "";
  }
}
```

Usage:

```html
<p [appHighlight]="'lightblue'">Hover me</p>
```

### Renderer2 version (platform-safe)

Using `Renderer2` avoids direct DOM access, which is safer for server-side rendering and Web Workers.

```ts
import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight = "gold";

  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  @HostListener("mouseenter")
  onEnter(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", this.appHighlight);
  }

  @HostListener("mouseleave")
  onLeave(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, "backgroundColor");
  }
}
```

## Key points

- Attribute directives modify existing elements.
- Use inputs to configure directive behavior.
- Prefer `Renderer2` for DOM changes when you need platform safety.

## Attribute vs structural directives

- Attribute directives modify an element (style, behavior) and keep it in the DOM.
- Structural directives change the DOM layout by adding/removing elements (`*ngIf`, `*ngFor`).

Next Section: [Component Directives](/src/app/7-component-directives/README.md)

[Custom Directives](/src/app/8-custom-directives/README.md)
