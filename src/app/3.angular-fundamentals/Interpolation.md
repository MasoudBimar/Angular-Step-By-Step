# Interpolation

Interpolation is an Angular template feature that renders component data inside the HTML using `{{ }}`. You can display properties, call methods, use simple expressions, and apply pipes for formatting.

## Show data

Use a component property and bind it in the template.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-interpolation-demo",
  template: `
    <h1>{{ title }}</h1>
    <p>Version: {{ version }}</p>
  `,
})
export class InterpolationDemoComponent {
  title = "Angular Fundamentals";
  version = 17;
}
```

## Call methods

You can call parameterless methods from the template. Keep them fast because they run during change detection.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-interpolation-demo",
  template: ` <p>Greeting: {{ getGreeting() }}</p> `,
})
export class InterpolationDemoComponent {
  name = "Sara";

  getGreeting(): string {
    return `Hello ${this.name}`;
  }
}
```

## Use expressions

Interpolation supports simple expressions like math and string concatenation.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-interpolation-demo",
  template: `
    <p>Total: {{ price * quantity }}</p>
    <p>User: {{ firstName + " " + lastName }}</p>
    <p>Enabled: {{ isActive ? "yes" : "no" }}</p>
  `,
})
export class InterpolationDemoComponent {
  price = 25;
  quantity = 3;
  firstName = "Ava";
  lastName = "Lee";
  isActive = true;
}
```

## Use pipes

Pipes transform values for display without changing the underlying data.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-interpolation-demo",
  template: `
    <p>Upper: {{ name | uppercase }}</p>
    <p>Date: {{ createdAt | date : "yyyy-MM-dd" }}</p>
    <p>Price: {{ amount | currency : "USD" }}</p>
    <p>Percent: {{ ratio | percent : "1.0-2" }}</p>
  `,
})
export class InterpolationDemoComponent {
  name = "angular";
  createdAt = new Date(2024, 0, 15);
  amount = 1234.5;
  ratio = 0.835;
}
```
