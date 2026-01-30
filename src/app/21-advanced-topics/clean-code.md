# Clean Code Principles in Angular

## Naming Conventions

One-line rules with small examples for Angular naming.

1. **Meaningful Names**: use intention-revealing names (e.g., `loadMovies()` not `doWork()`).
2. **Avoid Mysterious Names**: avoid vague nouns (e.g., `movieList` not `data`).
3. **Avoid Encodings**: do not use Hungarian or type suffixes (e.g., `isValid` not `is_valid` or `strName`).
4. **Avoid Ambiguity**: name by meaning, not shape (e.g., `userId` not `nameId`).
5. **Avoid Noisy Names**: remove filler words (e.g., `customers` not `theCustomerList`).
6. **Be Consistent**: do not mix styles (e.g., choose `getCustomer()` or `loadCustomer()` and stick to one).

## Method Signatures & Responsibilities

1. **Group 3+ parameters**: pass a typed object (e.g., `saveMovie({ movie, userId, source })`).
2. **Avoid boolean parameters**: split intent (e.g., `showDetails()` / `hideDetails()`).
3. **Single responsibility**: one method should do one thing (e.g., `fetchMovieById(id)` vs `getMovieWithCache(id)`).
4. **Use explicit IDs**: name ID params clearly (e.g., `movieId: string`).

## Magic Numbers

1. **Replace with named constants**: use `const` for meaning (e.g., `const MAX_RETRIES = 3`).
2. **Use enums for fixed sets**: prefer enums over raw numbers (e.g., `Status.ACTIVE` not `1`).
3. **Centralize configuration**: keep shared values in one place (e.g., `environment.apiTimeoutMs`).

```ts
const MAX_PAGE_SIZE = 50;
if (pageSize > MAX_PAGE_SIZE) throw new Error('Page size too large');

enum UserStatus { ACTIVE = 1, INACTIVE = 2 }
const status = UserStatus.ACTIVE;
```

## Nested Conditionals

1. **Use guard clauses**: return early to reduce nesting (e.g., `if (!movie) return;`).
2. **Extract boolean helpers**: clarify intent (e.g., `if (shouldFetchFromServer(movie))`).
3. **Prefer clear ternaries only for simple cases**: keep one line (e.g., `label = isActive ? 'On' : 'Off'`).

```ts
if (!movieId) return;
if (isCached(movieId)) return this.cache.get(movieId);
return this.api.getMovie(movieId);
```

## Code Duplication

1. **Extract shared logic**: move repeated code to a helper (e.g., `formatMovieTitle()`).
2. **Centralize cross-feature logic**: use a service for shared rules (e.g., `PricingService`).
3. **Parameterize differences**: pass a strategy or options (e.g., `loadMovies({ source: 'cache' })`).

```ts
// Before: duplicate formatting
title = movie.name.toUpperCase().trim();
cardTitle = movie.name.toUpperCase().trim();

// After: shared helper
formatMovieTitle(movie: Movie) {
  return movie.name.toUpperCase().trim();
}
```

## Large Methods

1. **Extract steps into smaller methods**: each step has a clear name (e.g., `validateMovie()`).
2. **Keep one responsibility per method**: split fetch/transform/save into separate calls.
3. **Prefer readable flow**: main method should read like a summary.

```ts
saveMovie(movie: Movie) {
  this.validateMovie(movie);
  const normalized = this.normalizeMovie(movie);
  return this.persistMovie(normalized);
}
```
