# Angular component structure

## Table of contents

- [Angular component structure](#angular-component-structure)
  - [Table of contents](#table-of-contents)
  - [Files and responsibilities](#files-and-responsibilities)
  - [The TypeScript decorator](#the-typescript-decorator)
  - [How the four parts relate](#how-the-four-parts-relate)
  - [Setup environments](#setup-environments)
  - [Create our first project](#create-our-first-project)
  - [Angular Project Structure](#angular-project-structure)
  - [Angular Architecture](#angular-architecture)
  - [Angular Modules](#angular-modules)
  - [Angular Templates](#angular-templates)
  - [Angular Metadata](#angular-metadata)
  - [Angular CLI](#angular-cli)
  - [Essential Extensions](#essential-extensions)

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

Install [Node.js](https://nodejs.org/en) (LTS) and npm, then install the Angular CLI globally.

Angular-Nodejs-TypeScript-RxJS Compatibility versions:

| Angular            | Node.js                              | TypeScript     | RxJS               |
| ------------------ | ------------------------------------ | -------------- | ------------------ |
| 17.3.x             | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.5.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.1.x \|\| 17.2.x | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.4.0 | ^6.5.3 \|\| ^7.4.0 |
| 17.0.x             | ^18.13.0 \|\| ^20.9.0                | >=5.2.0 <5.3.0 | ^6.5.3 \|\| ^7.4.0 |
| 16.1.x \|\| 16.2.x | ^16.14.0 \|\| ^18.10.0               | >=4.9.3 <5.2.0 | ^6.5.3 \|\| ^7.4.0 |
| 16.0.x             | ^16.14.0 \|\| ^18.10.0               | >=4.9.3 <5.1.0 | ^6.5.3 \|\| ^7.4.0 |
| 15.1.x \|\| 15.2.x | ^14.20.0 \|\| ^16.13.0 \|\| ^18.10.0 | >=4.8.2 <5.0.0 | ^6.5.3 \|\| ^7.4.0 |
| 15.0.x             | ^14.20.0 \|\| ^16.13.0 \|\| ^18.10.0 | ~4.8.2         | ^6.5.3 \|\| ^7.4.0 |
| 14.2.x \|\| 14.3.x | ^14.15.0 \|\| ^16.10.0               | >=4.6.2 <4.9.0 | ^6.5.3 \|\| ^7.4.0 |
| 14.0.x \|\| 14.1.x | ^14.15.0 \|\| ^16.10.0               | >=4.6.2 <4.8.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.3.x \|\| 13.4.x | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | >=4.4.3 <4.7.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.1.x \|\| 13.2.x | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | >=4.4.3 <4.6.0 | ^6.5.3 \|\| ^7.4.0 |
| 13.0.x             | ^12.20.0 \|\| ^14.15.0 \|\| ^16.10.0 | ~4.4.3         | ^6.5.3 \|\| ^7.4.0 |
| 12.2.x             | ^12.14.0 \|\| ^14.15.0               | >=4.2.3 <4.4.0 | ^6.5.3 \|\| ^7.0.0 |
| 12.1.x             | ^12.14.0 \|\| ^14.15.0               | >=4.2.3 <4.4.0 | ^6.5.3             |
| 12.0.x             | ^12.14.0 \|\| ^14.15.0               | ~4.2.3         | ^6.5.3             |
| 11.2.x             | ^10.13.0 \|\| ^12.11.0               | >=4.0.0 <4.2.0 | ^6.5.3             |
| 11.1.x             | ^10.13.0 \|\| ^12.11.0               | >=4.0.0 <4.2.0 | ^6.5.3             |
| 11.0.x             | ^10.13.0 \|\| ^12.11.0               | ~4.0.0         | ^6.5.3             |
| 10.2.x             | ^10.13.0 \|\| ^12.11.0               | >=3.9.0 <4.1.0 | ^6.5.3             |
| 10.1.x             | ^10.13.0 \|\| ^12.11.0               | >=3.9.0 <4.1.0 | ^6.5.3             |
| 10.0.x             | ^10.13.0 \|\| ^12.11.0               | ~3.9.0         | ^6.5.3             |
| 9.1.x              | ^10.13.0 \|\| ^12.11.0               | >=3.6.0 <3.9.0 | ^6.5.3             |
| 9.0.x              | ^10.13.0 \|\| ^12.11.0               | >=3.6.0 <3.8.0 | ^6.5.3             |

Verify installations & install Angular CLI globally:

```bash
node --version
npm --version
npm install -g @angular/cli
ng version
```

Node Package Manager (npm) is needed to install Angular CLI ( `@angular/cli`) also npm has a lightweight web server to host the Angular applications locally.

Optional tools:

- [Git](https://git-scm.com/) for source control.
- A modern editor like [VS Code](https://code.visualstudio.com/).

## Create our first project

Generate a new project with routing and CSS/SCSS, CSR/SSR then run it.

```bash
ng new my-app --routing --style=scss
cd my-app
ng serve -o
```

## Angular Project Structure

Key folders and files you will see:

- `node_modules` Containing all the third party libs which angular application depends upon
- `src/` application source code.
- `src/main.ts` entry point for client-side application responsible for bootstrapping the application.
- `src/main.server.ts` bootstraps the root module for server-side rendering.
- `src/app/` root module, components, and features.
- `src/assets/` static files like images.
- `index.html` main HTML page plus all external scripts and styles.
- `styles.scss` application global styles.
- `tsconfig.json` TypeScript configuration.
- `angular.json` workspace/project configuration.
- `package.json` dependencies and scripts.
- `.gitignore` files and folders to ignore in Git.
- `server.ts` Node.js Express server (setup & configuration) for SSR.

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
