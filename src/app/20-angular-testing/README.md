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
describe;
```
