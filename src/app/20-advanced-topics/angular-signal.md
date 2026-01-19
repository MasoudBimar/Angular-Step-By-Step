# Angular Signals: History, Mechanism, and Version Review (16-21)

## A short history: how Angular got here

Angular's reactivity evolved in phases:

1. **AngularJS era (1.x):** Two-way binding and digest cycles were powerful but expensive at scale.
2. **Angular 2+ era:** Zone.js and change detection improved performance and structure, but change detection still often checked large parts of the tree.
3. **RxJS era:** Observables became a standard for async data, but state handling often required a lot of boilerplate and subscriptions.
4. **Signals era (Angular 16+):** Signals were introduced to bring fine-grained reactivity without requiring everyone to use RxJS for local state. They are a complement, not a replacement, for Observables.

Signals are Angular's answer to the same trend seen in other frameworks: push-based, fine-grained reactivity with explicit dependencies.

---

## What are Angular signals?

Signals are a fine-grained reactive primitive introduced to make state updates predictable, fast, and easy to reason about. A signal stores a value and tracks which parts of the app read it. When the value changes, only the dependent computations or templates update.

Signals are designed to:

- Reduce change-detection overhead by updating only what depends on the data.
- Make state flow explicit and deterministic.
- Improve debugging and performance by removing implicit dependencies.

---

## Core mechanism and mental model

Signals work through dependency tracking:

- **Read tracking:** When code reads a signal (directly or via a computed), Angular records that dependency.
- **Write updates:** When a signal is updated, Angular marks dependents as dirty and re-runs only those that depend on it.
- **Lazy recomputation:** Computed values recompute only when read and when their dependencies changed.

Think of signals as:

- **State containers** with automatic dependency tracking.
- **Computed values** that recalculate only when required.
- **Reactive effects** that run side effects when dependencies change.

This makes updates predictable and reduces the need for manual subscriptions.

---

> [!NOTE]
> Signals are a primitive reactive system in Angular. they are available eveywhere from component to services.

## Basic building blocks

### 1) signal()

Creates a writable reactive value.

```ts
import { signal } from "@angular/core";

const count = signal(0);
count.set(1); // changing the signal value
count.update((v) => v + 1);

changeValue(){
  this.count.set(5);
}

```

> [!TIP]
> For changing signals value we can use set method and the signals are by default writable so we can directly chnage the value of it.

Or using the generic type of signal:

```ts
import { signal } from "@angular/core";

countObj = signal<object>({});
count = signal<string>("");
countArray = signal<string[]>([]);
```

Update the signal value with changing the value of object:

```ts
user = signal({
  name: "Masoud",
  email: "masoudbimar@gmail.com",
});

ngOninit(): void{
  this.user.update((userDetail) => {
    ...userDetail,
    issueDate: "01-01-2020", // add new property
    name: 'MasoudBimmer' // update existing property

  })
}
```

Mutating the signal value: (available in angular 16)

```ts
  items = signal([
    {
      name: 'user1',
      email: 'a@b.com'
    }
  ]);
  ngOninit(): void{
  this.user.mutate((userdetails) => {
    userdetails.push({name: 'user2', email: 'x@y.com'})
  } );
  }
```

> [!Caution]
> The `.mutate` method is no longer available in ANgular Signals. It was officially removed from the public API during the developer preview phase, starting with Angular 17. In the current version of Angular (including Angular 18 and 19), signals strictly enforce an immutable approach to state updates

Why `.mutate` method was it removed?

The Angular team removed .mutate() to ensure consistency in the reactivity system. Signals rely on referential equality to detect changes. Mutating an object's internal properties without changing its reference would often fail to trigger downstream effects or UI updates because the signal "saw" the same object

Showing the value in template:

```html
<div>
  <button (click)="changeValue()">change the signal value</button>
  <p>{{count()}}</p>
</div>
```

### Update non-primitive data(objects, arrays, array of object) without mutating it

Signals rely on referential changes, so always return a new object/array/map/set from `set` or `update`. Avoid in-place edits like `push`, `splice`, or changing nested properties directly.

Best practices:

- Use `update` to derive the next value from the previous one.
- Copy only the levels you change (shallow copies are usually enough).
- For arrays, prefer `map`, `filter`, and spread (`[...]`) instead of mutation.
- For maps/sets, create a new instance and then apply changes to it.
- Keep derived data in `computed` rather than storing duplicates.

Object update (shallow + nested):

```ts
user.update((current) => ({
  ...current,
  name: "Masoud Bimmer",
  profile: {
    ...current.profile,
    city: "Tehran",
  },
}));
```

Array add/remove:

```ts
items.update((list) => [...list, { id: 4, title: "New" }]);
items.update((list) => list.filter((item) => item.id !== 2));
```

Array of objects (replace one item):

```ts
items.update((list) => list.map((item) => (item.id === 3 ? { ...item, done: true } : item)));
```

Map update:

```ts
selectedUsers.update((current) => {
  const next = new Map(current);
  next.set(5, { id: 5, name: "Sara" });
  return next;
});
```

Set update:

```ts
selectedIds.update((current) => {
  const next = new Set(current);
  next.add(5);
  next.delete(2);
  return next;
});
```

### 2) computed()

Creates a derived value that recalculates when dependencies change.
in other words the computed signal drives ites value from other signals.

> [!NOTE]
> The value of `computed` signal depends on other signals and cannot be `set`, `update`directly`.

```ts
import { computed, signal } from "@angular/core";

const first = signal("Ada");
const last = signal("Lovelace");

const fullName = computed(() => `${first()} ${last()}`);
```

### 3) effect()

Runs side effects whenever its dependencies change.

> [!NOTE]
> Effects runs at least once.

Side effect examples:

- Loggging to the console
- Making an HTTP Request
- Updating the DOM
- Timer related Events

> [!TIP]
> Efffects can be defined as private or protected properties in two places in a component: directly within the class body or inside the constructor. because effects need the injection context available in these locations.

```ts
import { effect, signal } from "@angular/core";

const count = signal(0);

private protected logEffect = effect(() => {
  console.log("Count changed:", count());
});
```

---

### 4) untracked()

Use `untracked()` to read signals inside `computed()` or `effect()` without creating a dependency. This is useful when you want a value only for logging, analytics, or a one-off read that should not trigger re-runs.

When to use it:

- Avoid accidental dependencies in an `effect`.
- Read a signal for logging or debugging without re-running the effect.
- Prevent a computed from depending on a value that you know should not drive it.

How to use it:

```ts
import { effect, signal, untracked } from "@angular/core";

const count = signal(0);
const debugMode = signal(false);

effect(() => {
  const value = count();
  if (untracked(() => debugMode())) {
    console.log("Debug count:", value);
  }
});
```

Another example with a computed:

```ts
import { computed, signal, untracked } from "@angular/core";

const selectedId = signal(1);
const cache = signal(new Map([[1, "Alpha"], [2, "Beta"]]));

const selectedLabel = computed(() => {
  const id = selectedId();
  const cached = untracked(() => cache());
  return cached.get(id) ?? "Unknown";
});
```

Be careful: when you use `untracked()`, changes to that signal will not trigger updates. Only use it when you are sure you do not want reactive updates.

---

## Signals and templates

In templates, signals can be read directly without `.value` or async pipes:

```html
<button (click)="count.update(v => v + 1)">Count: {{ count() }}</button>
```

Signals are reactive in templates because Angular tracks reads during rendering.

---

## Interop with RxJS

Signals do not replace Observables. Common patterns:

- Use Observables for async streams (HTTP, WebSocket, user input).
- Convert streams to signals when you need local synchronous state.
- Use signals for component state, computed values, and lightweight derivations.

---

## App-specific example: ServicesComponent user filter

This app already has a `ServicesComponent` that loads users via `users$`. Signals can add a small, local filter state without changing the data source.

Component excerpt:

```ts
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent {
  private jsonPlaceHolderUrl = "https://jsonplaceholder.typicode.com/users/";
  private readonly http = inject(HttpClient);

  readonly users$ = this.http.get<User[]>(this.jsonPlaceHolderUrl);
  readonly users = toSignal(this.users$, { initialValue: [] as User[] });

  readonly filter = signal("");
  readonly filteredUsers = computed(() => {
    const term = this.filter().trim().toLowerCase();
    return term ? this.users().filter((user) => user.name.toLowerCase().includes(term)) : this.users();
  });

  trackByUserId(index: number, user: User) {
    return user.id;
  }
}
```

Template excerpt:

```html
<input type="search" class="form-control form-control-sm" placeholder="Filter by name" (input)="filter.set($any($event.target).value)" />

<tr *ngFor="let user of filteredUsers(); trackBy: trackByUserId">
  ...
</tr>
```

This keeps the HTTP call as an Observable, but adds a signal-backed filter and computed list for fast, local updates.

---

## Version review: Angular 16 to 21

### Angular 16

- Signals introduced as a new reactive primitive.
- Core APIs: `signal`, `computed`, `effect`.
- Template usage allowed with direct signal reads.

### Angular 17

- Better integration in standalone + signal-first examples.
- Improved ergonomics for signals in component state.
- Continued optimizations for fine-grained updates.

### Angular 18

- Maturing APIs and stability improvements.
- Better developer guidance and ecosystem adoption.

### Angular 19

- Signals used more widely in official patterns and docs.
- Continued performance enhancements for reactive rendering.

### Angular 20

- Stronger integration with new rendering and hydration paths.
- Expanded usage patterns for state and derivations.

### Angular 21

- Signals considered a core part of Angular's state and reactivity story.
- More tooling and ecosystem alignment around signal-first patterns.

---

## Key takeaways

- Signals are for local, synchronous reactive state.
- They provide fine-grained updates and explicit dependencies.
- They complement RxJS rather than replace it.
- The API started in Angular 16 and stabilized/matured through 21.
