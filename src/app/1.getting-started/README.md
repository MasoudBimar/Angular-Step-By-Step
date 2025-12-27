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

[Typescript Preliminaries](/src/app/2.typescript-preliminaries/README.md)
