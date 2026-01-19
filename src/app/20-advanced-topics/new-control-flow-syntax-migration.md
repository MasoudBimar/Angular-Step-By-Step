# Migrating to Angular's New Control Flow Syntax

This guide walks through migrating from the legacy structural directives
(`*ngIf`, `*ngFor`, `*ngSwitch`) to the new block syntax
(`@if`, `@for`, `@switch`). It includes practical, step-by-step changes
and small but important details.

> [!NOTE]
> The `Control Flow Syntax` is available from Angular v17. The new syntax is baked into the template, so you don't need to import CommonModule anymore.

> [!TIP]
> This schematic migrates all existing code in your application to use new Control Flow Syntax. `ng generate @angular/core:control-flow`

## 1) Confirm your Angular version

The new control flow syntax is available in recent Angular versions.
If your project is not current, update first.

## 2) Learn the syntax mapping at a glance

Legacy quick map:

- `*ngIf="isReady"` -> `@if (isReady) { ... }`
- `*ngFor="let item of items; index as i; trackBy: trackById"` -> `@for (item of items; track trackById(item); let i = $index) { ... }`
- `[ngSwitch]="status"` + `*ngSwitchCase`/`*ngSwitchDefault` -> `@switch (status) { @case (...) { ... } @default { ... } }`

```html
<!-- Before -->
<div *ngIf="isReady">Ready</div>
<li *ngFor="let item of items; index as i; trackBy: trackById">{{ item }}</li>
<div [ngSwitch]="status">
  <p *ngSwitchCase="'ready'">Ready</p>
  <p *ngSwitchDefault>Unknown</p>
</div>
@if (isReady) {
<div>Ready</div>
} @for (item of items; track item.id; let i = $index) {
<li>{{ item }}</li>
} @switch (status) { @case ("ready") {
<p>Ready</p>
} @default {
<p>Unknown</p>
} }
```

Notes:

- `@if`, `@for`, and `@switch` are blocks, so the element moves inside the block.
- `track` replaces `trackBy`, and you can use `track item.id` or `track trackById(item)`.
- `let i = $index` replaces `index as i` inside `@for`.

## 3) Migrate `*ngIf` to `@if`

### Simple `*ngIf`

Legacy: `<section *ngIf="isLoggedIn">Welcome!</section>`

```html
<!-- Before -->
<section *ngIf="isLoggedIn">Welcome!</section>

<!-- After -->
@if (isLoggedIn) {
<section>Welcome!</section>
}
```

### `*ngIf` with `else`

Legacy: `<section *ngIf="isLoggedIn; else guest">Welcome!</section>` with `<ng-template #guest>Sign in</ng-template>`

```html
<!-- Before -->
<section *ngIf="isLoggedIn; else guest">Welcome!</section>
<ng-template #guest>Sign in</ng-template>

<!-- After -->
@if (isLoggedIn) {
<section>Welcome!</section>
} @else { Sign in }
```

Small detail: the `@else` block replaces the `ng-template`. You can include
any markup inside the `@else` block.

Or this way you can keep the ng-template:

```html
<!-- Before -->
<section *ngIf="isLoggedIn; else guest">Welcome!</section>
<ng-template #guest>Sign in</ng-template>

<!-- After -->
@if (isLoggedIn) {
<section>Welcome!</section>
} @else {
<ng-container [ngTemplateOutlet]="guest"></ng-container>
}

<ng-template #guest>Sign in</ng-template>
```

### `*ngIf` with `then` and `else`

Legacy: `<ng-container *ngIf="isLoggedIn; then signedIn; else signedOut"></ng-container>`

```html
<!-- Before -->
<ng-container *ngIf="isLoggedIn; then signedIn; else signedOut"></ng-container>
<ng-template #signedIn>Welcome back</ng-template>
<ng-template #signedOut>Please sign in</ng-template>

<!-- After -->
@if (isLoggedIn) { Welcome back } @else { Please sign in }
```

If the `then` and `else` templates are large, inline them into the blocks.

## 4) Migrate `*ngFor` to `@for`

### Basic list

Legacy: `<li *ngFor="let hero of heroes">{{ hero.name }}</li>`

```html
<!-- Before -->
<li *ngFor="let hero of heroes">{{ hero.name }}</li>

<!-- After -->
@for (hero of heroes) {
<li>{{ hero.name }}</li>
}
```

### Index and odd/even

Legacy: `<li *ngFor="let hero of heroes; index as i; odd as isOdd">...</li>`

```html
<!-- Before -->
<li *ngFor="let hero of heroes; index as i; odd as isOdd">{{ i }} - {{ hero.name }} - odd: {{ isOdd }}</li>

<!-- After -->
@for (hero of heroes; let i = $index; let isOdd = $odd) {
<li>{{ i }} - {{ hero.name }} - odd: {{ isOdd }}</li>
}
```

Small detail: `$index`, `$odd`, `$even`, `$first`, `$last`, `$count` are the
built-in `@for` context variables.

### `trackBy` to `track`

Legacy: `<li *ngFor="let hero of heroes; trackBy: trackById">{{ hero.name }}</li>`

```html
<!-- Before -->
<li *ngFor="let hero of heroes; trackBy: trackById">{{ hero.name }}</li>

<!-- After -->
@for (hero of heroes; track trackById(hero)) {
<li>{{ hero.name }}</li>
}
```

If you used `trackBy` with index:

Legacy: `<li *ngFor="let hero of heroes; trackBy: trackByIndex">{{ hero.name }}</li>`

```html
<!-- Before -->
<li *ngFor="let hero of heroes; trackBy: trackByIndex">{{ hero.name }}</li>

<!-- After -->
@for (hero of heroes; track $index) {
<li>{{ hero.name }}</li>
}
```

## 5) Migrate `*ngSwitch` to `@switch`

Legacy: `[ngSwitch]="status"` with `*ngSwitchCase` and `*ngSwitchDefault`

```html
<!-- Before -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'ready'">Ready</p>
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchDefault>Unknown</p>
</div>

<!-- After -->
@switch (status) { @case ("ready") {
<p>Ready</p>
} @case ("loading") {
<p>Loading...</p>
} @default {
<p>Unknown</p>
} }
```

Small detail: `@case` and `@default` are blocks; wrap all the markup inside them.

## 6) Combine blocks and containers cleanly

Legacy: `<ng-container *ngIf="isReady">...</ng-container>`

```html
<!-- Before -->
<ng-container *ngIf="isReady">
  <app-dashboard></app-dashboard>
</ng-container>

<!-- After -->
@if (isReady) {
<app-dashboard></app-dashboard>
}
```

## 7) Use `@empty` for empty lists

The new syntax adds a built-in empty state.

```html
@for (hero of heroes; track hero.id) {
<li>{{ hero.name }}</li>
} @empty {
<li>No heroes yet</li>
}
```

## 8) Update nested and mixed directives

### Nested `*ngIf` + `*ngFor`

Legacy: `<div *ngIf="isReady"><li *ngFor="let hero of heroes">...</li></div>`

```html
<!-- Before -->
<div *ngIf="isReady">
  <li *ngFor="let hero of heroes">{{ hero.name }}</li>
</div>

<!-- After -->
@if (isReady) { @for (hero of heroes; track hero.id) {
<li>{{ hero.name }}</li>
} }
```

### `*ngIf` with `*ngFor` inside a component

Legacy: `<app-hero *ngIf="selectedHero">...</app-hero>` and `<ul *ngIf="heroes?.length">...</ul>`

```html
<!-- Before -->
<app-hero *ngIf="selectedHero" [hero]="selectedHero"></app-hero>
<ul *ngIf="heroes?.length">
  <li *ngFor="let hero of heroes">{{ hero.name }}</li>
</ul>

<!-- After -->
@if (selectedHero) {
<app-hero [hero]="selectedHero"></app-hero>
} @if (heroes?.length) { @for (hero of heroes; track hero.id) {
<li>{{ hero.name }}</li>
} }
```

## 9) Verify behavior and templates

Checklist:

- Ensure `track` expressions still point at a unique, stable id.
- Ensure `$index` and other loop variables are referenced correctly.
- Ensure `@else` or `@default` blocks contain all required markup.

## 10) Optional: Use the Angular migration schematic

Angular provides a migration to automate many of these changes. If you use it,
always review the results and adjust any complex templates manually.

---

If you want, share a specific template and I can propose a precise migration.
