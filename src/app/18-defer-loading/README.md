# Lazy loading (modules and components)

Lazy loading splits your app into smaller bundles and loads them on demand. This keeps the initial bundle smaller and speeds up first load.

## Table of contents

- [Lazy loading (modules and components)](#lazy-loading-modules-and-components)
  - [Table of contents](#table-of-contents)
  - [Defer Loading (Angular 17)](#defer-loading-angular-17)
    - [Using `@defer` with `@placeholder`](#using-defer-with-placeholder)
    - [Using `@defer` with `@loading`](#using-defer-with-loading)
    - [Using `@defer` with `@error`](#using-defer-with-error)
    - [Using triggers to load specific content within `@defer` block](#using-triggers-to-load-specific-content-within-defer-block)

## Defer Loading (Angular 17)

An angular tremplate syntax that allows to load parts of a template or component when needed.

`@defer` lets you split a template into a deferrable view that is compiled into a separate bundle and loaded only when a trigger happens. It is component-level lazy loading, which complements route-based lazy loading.

Related concepts:

- Deferrable views: `@defer { ... }`
- Triggers: `on idle`, `on viewport`, `on interaction`, `on hover`, `on timer(2000)`, `when condition`
- Prefetching: `prefetch on idle|hover|interaction|viewport`
- Placeholders and fallbacks: `@placeholder`, `@loading`, `@error`

> [!NOTE]
> The `@defer` syntax allows two level of control: `Prefetching` and `Rendering`

**Prefetching**: Time of fetching data and code from the server & loading them in memory can be controlled

**Rendering**: The Time of appling the code seperately on the page can be controlled when needed

> [!TIP]
> With `@defer` we can define triggers to both level seperately.
> it acccept optional parapmeters inside the `@defer()` block which are used as trigger points

```html
<!-- product.component.html -->
@defer (on viewport; prefetch on idle) {
<app-reviews></app-reviews>
} @placeholder {
<app-reviews-skeleton></app-reviews-skeleton>
} @loading (minimum 300ms) {
<app-spinner></app-spinner>
} @error {
<p>Could not load reviews.</p>
}
```

> [!NOTE]
> Behind the scene angular create an separate bundle and extract the template from the main application bundle

### Using `@defer` with `@placeholder`

```html
@defer () {
<app-reviews></app-reviews>
} @placeholder {
<app-reviews-skeleton></app-reviews-skeleton>
}
```

- With placeholder and minimum parameter we can create intentional delay before rendering the main `@defer` block
- Any component, directive or pipes inside `@placeholder` block will load eagerly

```html
@defer () {
<app-reviews></app-reviews>
} @placeholder(minimum 5s) {
<h4>Content is getting loaded after some delay (passed as parameter to @plceholder)...</h4>
}
```

> [!NOTE]
> The `@placholder` displays the content before the @defer block is loaded

### Using `@defer` with `@loading`

Is the same as `@placholder` with a small difference in behaviour

> [!NOTE]
> The `@loading` displays the content while the @defer block is still in loading phase

The `@loading` get two parameter first `minimum in s or ms` Used to specify the minimum amount of time that the `@loading` block will be shown and `after in s or ms` indicate amount of time we should wait before showing the `@loading` block

```html
@defer () {
<app-reviews></app-reviews>
} @loading(after 1s; minimum 5s) {
<h4>Content is getting loaded after some delay (passed as parameter to @plceholder)...</h4>
}
```

> [!CAUTION]
> If the loading process takes less than the give `after` value which is the minimum requirement, then the `@loading` element will never be displayed

### Using `@defer` with `@error`

The `@error` block will render if something goes wrong while the bundle load wirh error

```html
@defer () {
<app-reviews></app-reviews>
} @loading(after 1s; minimum 5s) {
<h4>Content is getting loaded after some delay (passed as parameter to @plceholder)...</h4>
} @error{
<h2>Something went wong!</h2>
}
```

### Using triggers to load specific content within `@defer` block

List of declarative triggers:

- `on idle`
- `on viewport`:
- `on interaction`
- `on hover`
- `on immediate`
- `on timer`

**on idle** : will trigger the deferred loading once the browser has reached an idle state handled by `requestIdleCallback` API.

> [!NOTE]
> THe browser is idle when page is loaded and all content is fully rendered and all processes are stopped

```html
@defer (on idle) {
<app-reviews></app-reviews>
}
```

**on viewport** : one of the conditions for loading the deferred content is when it enters the viewport

> [!NOTE]
> This is a one time approach, it decrease the initial load time then load the content after scroll

There are two ways to use `on viewport` trigger

- one with `@placeholder` : viewport trigger with no parameter can only be placed on an @defer that has a @placeholder block

```html
@defer (on viewport) {
<app-reviews></app-reviews>
} @placeholder (minimum 1s){
<h3>Loading Reviews</h3>
}
```

- another way is passing a refernce of an element as a parameter to the viewport trigger

```html
<div #showReviews>
  @defer (on viewport(showReviews)) {
  <app-reviews></app-reviews>
  } @loading (minimum 1s){
  <h3>Loading Reviews</h3>
  }
</div>
```

**on interaction** : the `on interaction` will render the `@defer` block when the user interacts with an element through mouse or key events.

```html
<button #showReviews>show reviews</button>
@defer (on interaction(showReviews)) {
<app-reviews></app-reviews>
} @loading (minimum 1s){
<h3>Loading Reviews</h3>
}
```

> [!NOTE]
> The `on interaction` trigger is used when we want to load content based on an interaction that is made by user

**on hover** : the `on hover` will render the `@defer` block when the user hovers over an element of the page.

> [!NOTE]
> The `on interaction` trigger is used when we want to load content based on an interaction that is made by user (made by two event `mouseenter` and `focusin`)

Common use cases: - Below-the-fold content (reviews, comments, related products) - Heavy widgets (charts, maps, editors) - Expensive data fetches triggered by user intent - Optional experiences (marketing banners, A/B test variants)
