# Attribute Directives

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
        class3: hasClass3
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
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight = "gold";

  constructor(private elementRef: ElementRef<HTMLElement>) {}

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
import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight = "gold";

  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

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
