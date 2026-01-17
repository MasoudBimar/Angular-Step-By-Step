# Reactive Programming with RxJS

RxJS is the library Angular uses for handling asynchronous data. It models values
over time as streams so you can compose, transform, and coordinate events with
clear, declarative code.

> [!NOTE]
> RxJS stands for Reactive Extension for Javascript and Observable is a class Interface that is provided by RxJS to handle asynchronous data streams.

## Asynchronous Data Streams

An Observable represents a stream of values that arrive over time (HTTP
responses, user input, timers, websockets).

> [!TIP]
> Observer is a consumer of the Observable stream. It defines callback functions to handle the data, error, and completion events emitted by the Observable.

```ts
import { Observable, interval } from "rxjs";
import { map, take } from "rxjs/operators";

const ticks$ = interval(1000).pipe(
  map((count) => `Tick ${count + 1}`),
  take(3),
);

const subscription = ticks$.subscribe((value) => {
  console.log(value);
});

subscription.unsubscribe();
```

> [!CAUTION]
> the `unsubscribe` method is used to cancel the subscription and stop receiving values from the Observable. preventing memory leaks and unnecessary processing.

> [!NOTE]
> Observer has three methods: `next`, `error`, and `complete`. Use next to emit values, error to signal an error, and complete to indicate the stream is finished.

In Angular templates, prefer `async` pipe so subscriptions are managed for you.
with async pipe you dont need to manually unsubscribe from the Observable.

```html
<!-- component.html -->
<p>Last tick: {{ ticks$ | async }}</p>
```

```ts
// component.ts
ticks$ = interval(1000).pipe(map((count) => `Tick ${count + 1}`));
```

> [!TIP]
> The `async` pipe automatically subscribes to an `Observable or Promise` and returns the latest value it has emitted. When the component is destroyed, the `async` pipe unsubscribes automatically to prevent memory leaks.

## Observables and Observers

An Observable produces values; an Observer consumes them via `next`, `error`,
and `complete`.

```ts
import { Observable } from "rxjs";

const data$ = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

data$.subscribe({
  next: (value) => console.log("value", value),
  error: (err) => console.error("error", err),
  complete: () => console.log("done"),
});
```

Use `HttpClient` to create Observables from HTTP calls.

```ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly http = inject(HttpClient);

  loadUsers() {
    return this.http.get<User[]>("/api/users");
  }
}
```

Showing fetched data as Observable using async pipe in template:

```html
  <!-- for iterating over observable data we need the aliasing with 'as' keyword -->
  ng-container *ngIf="data$ | async as data; else loading">
    <p>Data: {{ data }}</p>
  </ng-container>
  <ng-template #loading>
    <p>Loading...</p>
  </ng-template>
```

## Operators and Transformations

Operators let you transform, filter, and combine streams.

- Creation Operators: `of`, `from`, `interval`, `fromEvent`, `empty`
- Transformation Operators: `map`, `filter`, `scan`
- Combination Operators: : `merge`, `concat`, `combineLatest`, `withLatestFrom`
- Higher-Order Mapping Operators: `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`
- Utility Operators: `tap`, `delay`, `debounceTime`, `distinctUntilChanged`
- Error Handling Operators: `catchError`, `retry`
- Multicasting Operators: `share`, `shareReplay`
- Conditional and Boolean Operators: `every`, `find`, `defaultIfEmpty`

### Creation Operators

Creation operators produce Observables from values, collections, timers, or DOM events.

> [!CAUTION]
> the `empty` operator is deprecated and `EMPTY` is available, `EMPTY` Just emits 'complete', and nothing else.

```ts
import { EMPTY, from, fromEvent, interval, of } from "rxjs";
import { map, take } from "rxjs/operators";

const empty$ = EMPTY;
const status$ = of("draft", "review", "published");
const ids$ = from([101, 102, 103]);
const ticks$ = interval(1000).pipe(take(3));
const clicks$ = fromEvent<MouseEvent>(document, "click").pipe(map((event) => ({ x: event.clientX, y: event.clientY })));
```

- `of` emits the provided values in order.
- `from` turns an array, iterable, or Promise into a stream.
- `interval` emits on a timer.
- `fromEvent` wraps DOM events into a stream.
- `EMPTY` completes immediately without emitting.

### Transformation Operators

Transformation operators change the shape or values within a stream.

> [!NOTE]
> RxJS Operators is Pipable funcions means that they can be used inside the pipe method of an Observable.

```ts
import { from } from "rxjs";
import { filter, map, scan } from "rxjs/operators";

const numbers$ = from([1, 2, 3, 4, 5]);

const totals$ = numbers$.pipe(
  filter((value) => value % 2 === 1),
  map((value) => value * value),
  scan((total, value) => total + value, 0),
);

totals$.subscribe((total) => console.log("running total", total));
```

- `map` transforms each value.
- `filter` keeps only values that match a condition.
- `scan` accumulates state and emits the running result.

### Combination Operators

Combination operators merge or synchronize multiple streams.

```ts
import { combineLatest, concat, fromEvent, merge, of } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";

const saveClicks$ = fromEvent(document, "click");
const formState$ = of({ valid: true, value: { name: "Ada" } });

const save$ = saveClicks$.pipe(withLatestFrom(formState$));
const name$ = combineLatest([of("Ada"), of("Lovelace")]).pipe(map(([first, last]) => `${first} ${last}`));
const sequential$ = concat(of("init"), of("ready"));
const parallel$ = merge(of("ui"), of("data"));
```

- `combineLatest` emits when any input emits, using the latest value of all.
- `merge` interleaves values as they arrive.
- `concat` runs streams in order, waiting for each to complete.
- `withLatestFrom` samples the latest value from another stream when the source emits.

### Higher-order Operators

Higher-order operators map values to inner Observables and control concurrency.

```ts
import { FormControl } from "@angular/forms";
import { concatMap, exhaustMap, mergeMap, switchMap } from "rxjs/operators";

const termControl = new FormControl("");

const latestOnly$ = termControl.valueChanges.pipe(switchMap((term) => this.http.get(`/api/search?q=${term}`)));

const queued$ = termControl.valueChanges.pipe(concatMap((term) => this.http.get(`/api/search?q=${term}`)));

const parallel$ = termControl.valueChanges.pipe(mergeMap((term) => this.http.get(`/api/search?q=${term}`), 2));

const ignoreWhileBusy$ = termControl.valueChanges.pipe(exhaustMap((term) => this.http.get(`/api/search?q=${term}`)));
```

- `switchMap` cancels the previous inner stream and keeps only the latest.
- `concatMap` queues inner streams and runs them one at a time.
- `mergeMap` runs inner streams in parallel (optional concurrency limit).
- `exhaustMap` ignores new values until the current inner stream completes.

```ts
import { fromEvent } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";

const search$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  debounceTime(300),
  map((event) => (event.target as HTMLInputElement).value.trim()),
  filter((term) => term.length >= 2),
);

search$.subscribe((term) => console.log("Search term", term));
```

When chaining async calls, pick the operator that matches the behavior you want.

```ts
import { FormControl } from "@angular/forms";
import { switchMap } from "rxjs/operators";

const termControl = new FormControl("");
const results$ = termControl.valueChanges.pipe(switchMap((term) => this.http.get(`/api/search?q=${term}`)));
```

- `switchMap` cancels the previous request and keeps only the latest. `latest wins, cancel previous`
- `concatMap` queues requests in order. `queue (one at a time, in order)`
- `mergeMap` runs requests in parallel. `do them all (concurrent)`
- `exhaustMap` ignores new values until the current request finishes. `ignore while busy (drop new until complete)`

> [!TIP]
> The `mergeMap` is used for flattening the Nested Observables & that is why it is also known as `flatMap`. practically it maps each emitted value from base obs to a new obs and then it flattens both the observables into a single observable.

### Common Transformational Operators Usecaces

- **Search field**: switchMap (cancel stale)
- **Save button**: concatMap (queue saves) or exhaustMap (ignore double clicks)
- **Analytics logging**: mergeMap (parallel), set concurrency if needed
- **Route param changes**: switchMap (only current route matters)
- Latest only → switchMap
- All, concurrent → mergeMap (optionally with concurrency)
- All, sequential, ordered → concatMap
- First only while running → exhaustMap

## Cold Observable

We call an Observable “cold” when the data is produced inside the Observable.

- Observables are lazy. Observables are lazy in the sense that they only execute values when something subscribes to it.
- For each subscriber the Observable starts a new execution, resulting in the fact that the data is not shared.
- If your Observable produces a lot of different values it can happen that two Observables that subscribe at more or less the same receive two different values.
- We call this behavior “unicasting”.

## Hot Observable

- An Observable is cold when data is produced inside the Observable and the Observable is hot when the data is produced outside the Observable.
- As we just saw the hot Observable is able to share data between multiple subscribers.
- We call this behavior “multicasting”.

### Cold vs Hot Observable

- In Cold Observable Value producer created inside the observable **while** In Hot Value producer created inside the observable
- In Cold Observable We have One observer per execution **While** Shared producer allows for multiple observers
- Cold Observable is Unicast **while** Hot observable is Multicast
- Example include interval, ajax **while** Examples include Observables that wrap DOM events, WebSockets

## Subjects and Multicasting

Subjects are both Observables and Observers, useful for multicasting values to
many subscribers.

```ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CartService {
  private readonly countSubject = new BehaviorSubject<number>(0);
  readonly count$ = this.countSubject.asObservable();

  addItem() {
    const nextCount = this.countSubject.value + 1;
    this.countSubject.next(nextCount);
  }
}
```

Use `BehaviorSubject` when you need the latest value on subscription and
`ReplaySubject` when you want to replay multiple past values.

## Error Handling

Use `catchError` to recover and `retry` when it is safe to repeat.

```ts
import { of } from "rxjs";
import { catchError, retry } from "rxjs/operators";

this.http.get("/api/orders").pipe(
  retry(2),
  catchError((error) => {
    this.logger.error("Load orders failed", error);
    return of([]);
  }),
);
```

Use `finalize` for cleanup even on error or cancellation.

```ts
import { finalize } from "rxjs/operators";

this.http.get("/api/profile").pipe(finalize(() => (this.isLoading = false)));
```

## Schedulers and Concurrency

Schedulers control when work runs. `asyncScheduler` pushes work to the macro
task queue, which can help avoid blocking UI updates.

```ts
import { asyncScheduler, of } from "rxjs";
import { observeOn } from "rxjs/operators";

of("a", "b", "c")
  .pipe(observeOn(asyncScheduler))
  .subscribe((value) => console.log(value));
```

Concurrency is controlled by how you combine streams and which mapping operator
you use (`mergeMap`, `concatMap`, `switchMap`, `exhaustMap`).

```ts
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";

const ids$ = from([1, 2, 3]);
const users$ = ids$.pipe(mergeMap((id) => this.http.get(`/api/users/${id}`), 2));
```

Here the second argument `2` limits concurrency to two in-flight requests.
