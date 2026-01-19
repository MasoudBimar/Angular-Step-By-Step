# Angular Pipes

## Table of contents

- [Angular Pipes](#angular-pipes)
  - [Table of contents](#table-of-contents)
  - [Basic example](#basic-example)
    - [Template](#template)
    - [Component](#component)
    - [Explanation](#explanation)
  - [Built-in pipes (common ones)](#built-in-pipes-common-ones)
    - [Sample data (component)](#sample-data-component)
    - [Template samples](#template-samples)
  - [Different types of Angular pipes](#different-types-of-angular-pipes)
  - [Do we still need pipes?](#do-we-still-need-pipes)
  - [How to implement a custom pipe](#how-to-implement-a-custom-pipe)
    - [1) Create the pipe](#1-create-the-pipe)
    - [2) Declare it in a module](#2-declare-it-in-a-module)
    - [3) Use it in a template](#3-use-it-in-a-template)
    - [Optional: Defining pure \& impure pipes](#optional-defining-pure--impure-pipes)

Pipes are a lightweight way to transform data in Angular templates. They take an input value, run it through a transform function, and return a formatted value for display. Pipes keep templates clean and make display logic reusable.

> [!NOTE]
> We need Pipes to execute and perform transformation on the template data easily & effectively.

## Basic example

So Pipes are helpful for tasks like sorting & filtering operation on data or displaying data in a paginated format.

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
  name = "ava turner";
}
```

### Explanation

- `date` formats a `Date` instance for display.
- `currency` formats numbers as money.
- `titlecase` transforms a string to title case.

## Built-in pipes (common ones)

Below are common built-in pipes with a sample for each one.

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

### Sample data (component)

```ts
export class PipesComponent {
  today = new Date(2024, 5, 12, 9, 30);
  name = "ava turner";
  amount = 1280.5;
  taxRate = 0.0825;
  scores = { math: 92, science: 88 };
  items = ["apples", "bananas", "cherries", "dates"];
  statusPromise = Promise.resolve("Ready");
  profile = { id: 7, role: "Editor" };
  gender = "female";
  genderMap = {
    male: "Invite him",
    female: "Invite her",
    other: "Invite them",
  };
  messageCount = 3;
  messageMap = {
    "=0": "No messages",
    "=1": "One message",
    other: "# messages",
  };
}
```

### Template samples

```html
<!-- date -->
<p>Today: {{ today | date: "fullDate" }}</p>

<!-- uppercase / lowercase / titlecase -->
<p>Upper: {{ name | uppercase }}</p>
<p>Lower: {{ name | lowercase }}</p>
<p>Title: {{ name | titlecase }}</p>

<!-- number -->
<p>Number: {{ amount | number: "1.0-2" }}</p>

<!-- percent -->
<p>Percent: {{ taxRate | percent: "1.0-1" }}</p>

<!-- currency -->
<p>Currency: {{ amount | currency: "USD" }}</p>

<!-- json -->
<pre>{{ profile | json }}</pre>

<!-- slice -->
<p>Slice: {{ items | slice: 1:3 | json }}</p>

<!-- async (Promise or Observable) -->
<p>Status: {{ statusPromise | async }}</p>

<!-- keyvalue -->
<ul>
  @for (item of scores | keyvalue) {
    <li>{{ item.key }}: {{ item.value }}</li>
  }
</ul>

<!-- i18nSelect -->
<p>{{ gender | i18nSelect: genderMap }}</p>

<!-- i18nPlural -->
<p>{{ messageCount | i18nPlural: messageMap }}</p>
```

## Different types of Angular pipes

- **Built-in pipes**: Provided by Angular (like `date`, `currency`, `async`).
- **Custom pipes**: Pipes you create for app-specific formatting or logic.
- **Pure pipes** (default): Re-run only when input reference changes.
- **Impure pipes**: Re-run on every change detection cycle; use sparingly due to cost.

## Do we still need pipes?

Short answer: yes, for display formatting and clean templates. Even with modern Angular features (signals, computed values, and template control flow), pipes remain the simplest way to apply reusable, declarative formatting in templates. Prefer pipes for UI formatting, and keep heavier logic in the component or a service.

## How to implement a custom pipe

Run this command with desired pipe name

```bash
 ng  g p SalaryRangePipe # ng generate pipe SalaryRangePipe
```

### 1) Create the pipe

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "salaryRange",
})
export class SalaryRangePipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 90000) {
      return "High";
    }
    if (value >= 75000) {
      return "Medium";
    }
    return "Low";
  }
}
```

### 2) Declare it in a module

```ts
@NgModule({
  declarations: [SalaryRangePipe],
  exports: [SalaryRangePipe],
})
export class SharedModule {}
```

### 3) Use it in a template

```html
<td>{{ employee.salary | salaryRange }}</td>
```

### Optional: Defining pure & impure pipes

> [!NOTE]
> Pure Pipe transform the data whenever it detects the `pure change` in input value
> By Default every pipe in angular is pure

> [!TIP]
> A Pure change is just a simple change in the input value such as strin, boolean, number or change in the reference for object, arrays or functions

```ts
@Pipe({
  name: 'filterByState',
  pure: true # Default Bevavior
})
```

```ts
@Pipe({
  name: 'filterByState',
  pure: false # impure
})
```

> [!CAUTION]
> impure pipe is getting invoked on every change detection cycle

> [!TIP]
> Use `pure: false` only when the pipe depends on mutable data that changes without a new reference.

Sample usng impure pipe: if the sumeOfNumbers define as pure it wont get updated when pushing a number to array gets called, but when we define it as impure pipe it will check

```ts
export class AppComponent {
  numbers: number[] = [1, 2, 3];

  updateArray() {
    this.numbers.push(4);
  }
}
```

```html
<p>The sum of array is {{number | sumOfNumbers}}</p>
<button (click)="updateArray()">update the array</button>
```
