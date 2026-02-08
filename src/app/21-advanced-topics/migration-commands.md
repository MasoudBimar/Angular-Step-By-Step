# Angular Migration Commands (Old Structures -> New APIs)

This page lists the migration commands and what each migration changes.

> [!NOTE]
> Run migrations on a clean branch and commit after each step.
> Most schematics support `--path` and `--dry-run`.

## 1) Migrate to standalone components

Command (recommended 3-step flow):

```bash
ng generate @angular/core:standalone --mode=convert-to-standalone
ng generate @angular/core:standalone --mode=prune-ng-modules
ng generate @angular/core:standalone --mode=standalone-bootstrap
```

What changes:

- Converts components/directives/pipes to `standalone: true`.
- Moves dependencies from NgModules into component/directive `imports`.
- Removes unnecessary NgModules.
- Switches bootstrapping from module-based bootstrap to standalone bootstrap APIs.

## 2) Migrate to new control flow syntax

Command:

```bash
ng generate @angular/core:control-flow
```

What changes:

- Rewrites `*ngIf` to `@if` blocks.
- Rewrites `*ngFor` to `@for` blocks.
- Rewrites `*ngSwitch`/`*ngSwitchCase`/`*ngSwitchDefault` to `@switch`/`@case`/`@default`.
- Updates related template syntax (`trackBy` patterns, loop variables, etc.) where needed.

## 3) Migrate from constructor injection to `inject()`

Command:

```bash
ng generate @angular/core:inject
```

What changes:

- Replaces constructor parameter DI with field initializers using `inject(...)`.
- Preserves DI semantics such as `@Inject(...)` tokens and `@Optional()` behavior.
- Removes constructor parameters that were only used for injection when possible.

## 4) Migrate from `@Input()` to `input()` signals

Command:

```bash
ng generate @angular/core:signal-input
```

What changes:

- Replaces `@Input()` properties with signal inputs (`input(...)` / `input.required(...)`).
- Updates references in TypeScript and templates to read input values as signals.
- Keeps aliases/required-ness semantics where supported by the migration.

## 5) Migrate from `@Output()` to `output()`

Command:

```bash
ng generate @angular/core:outputs
```

What changes:

- Replaces `@Output()` + `EventEmitter` patterns with `output()` declarations.
- Updates emit and subscription references related to migrated outputs.
- Preserves output aliases when present.

## 6) Migrate template query decorators to signal queries

Command:

```bash
ng generate @angular/core:signal-queries
```

What changes:

- Replaces `@ViewChild`, `@ViewChildren`, `@ContentChild`, `@ContentChildren` with signal query APIs.
- Updates all usages to call/read query values as signals.
- Applies updates in templates, host bindings, and TypeScript references.

## 7) Migrate to self-closing tags

Command:

```bash
ng generate @angular/core:self-closing-tag
```

What changes:

- Converts eligible empty component tags from `<my-cmp></my-cmp>` to `<my-cmp />`.
- Leaves non-empty tags unchanged.

## 8) Migrate from `[ngClass]` to `[class]`

Command:

```bash
ng generate @angular/core:ngclass-to-class
```

What changes:

- Converts safe `[ngClass]` usages to `[class]` / `[class.someClass]` bindings.
- Reduces dependency on the `NgClass` directive.
- May skip complex/unsafe patterns unless you enable migration options.

## 9) Migrate from `[ngStyle]` to `[style]`

Command:

```bash
ng generate @angular/core:ngstyle-to-style
```

What changes:

- Converts safe `[ngStyle]` usages to `[style]` bindings.
- Reduces dependency on the `NgStyle` directive.
- May skip object-reference patterns unless best-effort options are enabled.

## Practical execution order

```bash
# 1) Standalone first
ng generate @angular/core:standalone --mode=convert-to-standalone
ng generate @angular/core:standalone --mode=prune-ng-modules
ng generate @angular/core:standalone --mode=standalone-bootstrap

# 2) Template syntax migrations
ng generate @angular/core:control-flow
ng generate @angular/core:self-closing-tag
ng generate @angular/core:ngclass-to-class
ng generate @angular/core:ngstyle-to-style

# 3) Class API migrations
ng generate @angular/core:inject
ng generate @angular/core:signal-input
ng generate @angular/core:outputs
ng generate @angular/core:signal-queries
```

> [!TIP]
> If `ngclass-to-class` or `ngstyle-to-style` is not recognized in your current Angular version,
> update Angular first, then rerun these migrations.
