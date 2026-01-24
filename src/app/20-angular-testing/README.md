## Why we test software

Software testing exists to build confidence that the system behaves correctly for
users and other systems. The goal is to verify behavior, not to lock in a
specific implementation. Good tests focus on **inputs and outputs**, **observable
effects**, and **contracts** (public APIs, UI text, HTTP requests), so that the
code can be refactored without breaking tests as long as behavior stays the same.

Key purposes of testing:

- Catch defects early and reduce regressions.
- Document expected behavior in executable form.
- Enable safe refactoring and faster change cycles.
- Improve design by forcing clear inputs/outputs and boundaries.

## Core testing terms (requested)

1. **Automated testing**
   - Tests executed by tools without human interaction.
   - Fast feedback, repeatable, and ideal for CI pipelines.

2. **Manual testing**
   - A human executes test steps, explores UI flows, and validates UX.
   - Useful for exploratory testing, usability, and visual checks.

3. **Unit testing**
   - Verifies a single unit (function, class, or component) in isolation.
   - Uses mocks/stubs for dependencies to focus on one behavior.

4. **Integration testing**
   - Validates that multiple units work together (service + HTTP client,
     component + template + dependency injection).
   - Typically tests real wiring between parts, but may still mock external
     systems.

5. **End-to-end (E2E) testing**
   - Exercises the full application from the user perspective.
   - Runs in a real or headless browser and validates complete flows.

6. **Test-driven development (TDD)**
   - Write a failing test first, implement the simplest code to pass it,
     then refactor.
   - Promotes small, focused designs and rapid feedback loops.

7. **Test-later development**
   - Code is written first, tests are added afterwards.
   - Often faster at first but risks missing edge cases and discourages
     refactoring if tests become too coupled to implementation.

## Basics: structures and building blocks in tests

Common building blocks across test frameworks:

- **Test suite**: A group of related tests (e.g., `describe` block).
- **Test case**: A single behavior check (e.g., `it` or `test`).
- **Arrange / Act / Assert**: A simple structure for each test.
- **Setup / Teardown**: Create and clean resources before/after tests.
- **Test doubles**: Mocks, stubs, fakes, and spies for dependencies.
- **Assertions**: The checks that confirm expected outcomes.

Angular-specific building blocks you will see often:

- **TestBed**: Configures a testing module for components/services.
- **ComponentFixture**: Controls a component instance + DOM rendering.
- **fakeAsync / tick**: Manage async timing in a deterministic way.
- **HttpTestingController**: Intercepts HTTP calls in tests.
- In Angular 18, the testing utility previously known as async has been replaced by `waitForAsync`, not strictly by `fakeAsync`.

## TestBed and ComponentFixture (with configureTestingModule)

Angular testing revolves around the **TestBed** (a test-only Angular module) and
the **ComponentFixture** (a handle to the component instance and its DOM).

### What they do

- **TestBed**: Creates a testing module that mirrors how Angular wires up
  providers, imports, and declarations.
- **configureTestingModule**: Sets up the TestBed with components, providers,
  and module imports needed by the unit under test.
- **ComponentFixture**: Gives access to the component instance, DOM element,
  and change detection.

### Common methods you will use

- `TestBed.configureTestingModule(...)`: Configure the testing module.
- `TestBed.createComponent(...)`: Create a component and its fixture.
- `TestBed.inject(...)`: Get a service instance from the test injector.
- `fixture.componentInstance`: Access the component class instance.
- `fixture.nativeElement`: Access the rendered DOM.
- `fixture.detectChanges()`: Trigger change detection and render updates.

### Example: component test

```ts
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MyComponent } from "./my.component";

describe("MyComponent", () => {
  let fixture: ComponentFixture<MyComponent>;
  let component: MyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyComponent], // standalone component
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("renders the title", () => {
    const title = fixture.debugElement.query(By.css("h1")).nativeElement;
    expect(title.textContent).toContain("Hello");
  });
});
```

### Example: service test

```ts
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it("calls the API", () => {
    service.getUsers().subscribe();
    http.expectOne("/api/users");
  });
});
```

### Best practices

- Keep `configureTestingModule` minimal to reduce test setup cost.
- Prefer **standalone** component imports (`imports: [MyComponent]`) when possible.
- Always call `fixture.detectChanges()` after creating a component.
- Use `TestBed.inject(...)` instead of manually constructing services.
- Clean up async or HTTP resources in `afterEach` (for example `http.verify()`).

## Setup and teardown hooks (beforeEach, beforeAll, afterEach, afterAll)

These hooks help you organize test setup and cleanup in a predictable way.
They run at different times in a test suite:

- **beforeAll**: Runs once before all tests in a `describe` block.
- **beforeEach**: Runs before every test in that `describe` block.
- **afterEach**: Runs after every test in that `describe` block.
- **afterAll**: Runs once after all tests in a `describe` block.

### Common use cases

- **beforeAll**: Heavy setup that can be shared (e.g., build a fixture once).
- **beforeEach**: Fresh state per test (reset objects, create new component).
- **afterEach**: Cleanup per test (reset spies, clear DOM, reset mocks).
- **afterAll**: Global cleanup (disconnect test server, restore globals).

### Example (Jasmine)

```ts
describe("UserService", () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeAll(() => {
    // One-time setup (rare for Angular TestBed).
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no pending HTTP calls are left.
    http.verify();
  });

  afterAll(() => {
    // One-time cleanup if needed.
  });

  it("fetches users", () => {
    service.getUsers().subscribe();
    http.expectOne("/api/users");
  });
});
```

## Best practices for hooks

- Prefer **beforeEach** for TestBed configuration to keep tests isolated.
- Use **beforeAll/afterAll** only for truly shared, expensive setup/cleanup.
- Keep hook logic minimal; complex logic belongs in helper functions.
- Always reset or verify mocks/spies in **afterEach** to avoid leaking state.
- Do not mutate shared objects across tests unless intentionally reset.

## Test runners vs test engines (frameworks)

- **Test runner**: Orchestrates test execution and reports results.
  - Examples: Karma, Jest (also includes an engine).
- **Test engine / framework**: Provides `describe/it`, assertions, and matchers.
  - Examples: Jasmine, Jest (also includes a runner).

## Testing tools commonly used in Angular projects

Historically, Angular CLI projects were created with **Karma** (runner) and
**Jasmine** (framework). Many teams now use **Jest** as an alternative because it
is fast and provides a runner + framework in one tool.

So far, the commonly used tools in Angular testing include:

- **Karma**: Test runner.
- **Jasmine**: Test framework and assertion library.
- **Jest**: Alternative runner + framework.

> [!NOTE]
> Jasmine is an open sourece javascript framewoek for writing unit & integration tests

> [!NOTE]
> Karma is a tool (Test Runner) that executes the source code against the tests written using Jasmine & display the results (passing/failing)

```json
// devDependencies
    "@types/jasmine": "~4.0.0",
    "jasmine-core": "~4.2.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.0.0",
```

In practice you might also encounter:

- **Cypress** or **Playwright** for E2E testing.
- **Testing Library** for a user-focused testing style.

```ts
export function sum(a: number, b: number) {
  return a + b;
}
```

```ts
import { sum } from "./sample";

describe("gettingSum", () => {
  it("should retuns the sum of two numbers", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
```

If the process inside the beforeEach is asynchronoud we need to use async for calling the beforeEach process:

```ts
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [RouterTestingModule, AppComponent],
  }).compileComponents();
});
```
