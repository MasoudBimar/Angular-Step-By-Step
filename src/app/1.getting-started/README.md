# Angular component structure

An Angular component is built from four main files that work together to render UI, style it, and test it. These files usually share the same base name.

## Files and responsibilities

- `getting-started.component.ts` is the component class. It holds state, handles events, and defines metadata that links the other files.
- `getting-started.component.html` is the template. It renders the view and binds to the component class.
- `getting-started.component.scss` is the stylesheet. It styles the template, usually scoped to this component.
- `getting-started.component.spec.ts` is the test file. It verifies the component behavior and template interaction.

## The TypeScript decorator

Angular uses the `@Component` decorator in the `.ts` file to describe how the component should be created and connected to its view and styles.

Example:

```ts
@Component({
  selector: "app-getting-started",
  templateUrl: "./getting-started.component.html",
  styleUrls: ["./getting-started.component.scss"],
})
export class GettingStartedComponent {
  // component state and logic
}
```

What the decorator does:

- `selector` defines the HTML tag used to place the component.
- `templateUrl` connects the class to the HTML file.
- `styleUrls` connects the class to the SCSS/CSS file.
- The class name becomes the backing controller for the template.

## How the four parts relate

- The `.ts` class provides data and methods.
- The `.html` template reads and updates that data using bindings like `{{ }}`, `[prop]`, and `(event)`.
- The `.scss` styles target the template elements and are scoped to this component by Angular.
- The `.spec.ts` tests create the component, render the template, and assert behavior or output.

In short, the decorator links the `.ts` class to the `.html` view and `.scss` styles, and the `.spec.ts` validates that the component works as expected.

## Setup environments

Install Node.js (LTS) and npm, then install the Angular CLI globally.

```bash
node --version
npm --version
npm install -g @angular/cli
ng version
```

Optional tools:

- Git for source control.
- A modern editor like VS Code.

## Create our first project

Generate a new project with routing and SCSS, then run it.

```bash
ng new my-app --routing --style=scss
cd my-app
ng serve -o
```

## Angular Project Structure

Key folders and files you will see:

- `src/` application source code.
- `src/main.ts` bootstraps the root module.
- `src/app/` root module, components, and features.
- `src/assets/` static files like images.
- `angular.json` workspace configuration.
- `package.json` dependencies and scripts.

## Angular Architecture

Angular apps are built from:

- Components: UI building blocks.
- Templates: HTML views for components.
- Services: reusable business logic.
- Modules: group related components and services.
- Routing: navigation between views.

## Angular Modules

Modules organize features and declare which components belong together.

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Angular Templates

Templates use HTML plus Angular syntax for binding and logic.

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-hello",
  template: `
    <h1>{{ title }}</h1>
    <button (click)="count = count + 1">Clicked {{ count }}</button>
  `,
})
export class HelloComponent {
  title = "Hello Angular";
  count = 0;
}
```

## Angular Metadata

Angular uses decorators (metadata) to describe how classes should behave.

```ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  template: `<h2>{{ heading }}</h2>`,
})
export class CardComponent {
  @Input() heading = "";
}
```

## Angular CLI

Common CLI commands:

```bash
ng generate component users
ng generate module admin --route admin --module app.module
ng generate service data/user
ng test
ng build
```

## Essential Extensions

Recommended VS Code extensions:

- Angular Language Service
- ESLint
- Prettier
- EditorConfig

Next Section: [Typescript Preliminaries](/src/app/2.typescript-preliminaries/README.md)
