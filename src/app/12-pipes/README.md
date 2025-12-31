# Angular Pipes

Pipes are a lightweight way to transform data in Angular templates. They take an input value, run it through a transform function, and return a formatted value for display. Pipes keep templates clean and make display logic reusable.

## Basic example

### Template

```html
<p>Today: {{ today | date: 'fullDate' }}</p>
<p>Salary: {{ salary | currency: 'USD' }}</p>
<p>Name: {{ name | titlecase }}</p>
```

### Component

```ts
export class PipesComponent {
  today = new Date();
  salary = 82000;
  name = 'ava turner';
}
```

### Explanation
- `date` formats a `Date` instance for display.
- `currency` formats numbers as money.
- `titlecase` transforms a string to title case.

## Built-in pipes (common ones)

- `date` (format dates)
- `uppercase`, `lowercase`, `titlecase` (string casing)
- `number` (number formatting)
- `percent` (percent formatting)
- `currency` (money formatting)
- `json` (pretty-print JSON for debugging)
- `slice` (substrings or subarrays)
- `async` (subscribe to Observables/Promises)
- `keyvalue` (iterate object keys/values)
- `i18nSelect`, `i18nPlural` (basic i18n helpers)

## Different types of Angular pipes

- **Built-in pipes**: Provided by Angular (like `date`, `currency`, `async`).
- **Custom pipes**: Pipes you create for app-specific formatting or logic.
- **Pure pipes** (default): Re-run only when input reference changes.
- **Impure pipes**: Re-run on every change detection cycle; use sparingly due to cost.

## Do we still need pipes?

Short answer: yes, for display formatting and clean templates. Even with modern Angular features (signals, computed values, and template control flow), pipes remain the simplest way to apply reusable, declarative formatting in templates. Prefer pipes for UI formatting, and keep heavier logic in the component or a service.

## How to implement a custom pipe

### 1) Create the pipe

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryRange'
})
export class SalaryRangePipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 90000) {
      return 'High';
    }
    if (value >= 75000) {
      return 'Medium';
    }
    return 'Low';
  }
}
```

### 2) Declare it in a module

```ts
@NgModule({
  declarations: [SalaryRangePipe],
  exports: [SalaryRangePipe]
})
export class SharedModule {}
```

### 3) Use it in a template

```html
<td>{{ employee.salary | salaryRange }}</td>
```

### Optional: make it impure

```ts
@Pipe({
  name: 'filterByState',
  pure: false
})
```

Use `pure: false` only when the pipe depends on mutable data that changes without a new reference.
