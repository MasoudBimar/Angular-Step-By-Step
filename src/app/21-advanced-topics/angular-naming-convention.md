# Angular Consistent Naming Convention

This guide defines a single, consistent naming convention for Angular projects so teams can scan code quickly and avoid ambiguity.

---

## 1) General Rules (All Code)

- **Be consistent:** Pick one pattern and use it everywhere in the repo.
- **Be descriptive:** Names should reveal intent (not implementation).
- **Prefer full words:** Avoid abbreviations unless widely accepted (e.g., `id`, `url`, `api`).
- **Avoid noise words:** Do not repeat context when the scope already provides it.

---

## 2) Case Styles (Core)

- **PascalCase**: Classes, types, interfaces, enums, decorators, Angular entities (components, directives, pipes, services), and filenames for those entity types.
- **camelCase**: Variables, class fields, methods, functions, parameters, local variables.
- **UPPER_SNAKE_CASE**: Enum members and file-level constants.
- **kebab-case**: Angular selector names, HTML templates, styles, and most filenames.

---

## 3) File & Folder Naming

- **Folders**: `kebab-case`, use nouns and domain language.  
  Example: `movie-manager`, `user-profile`, `shared`, `core`, `features`.

- **Files**: `kebab-case` and include the Angular type suffix.  
  Examples:
  - `movie-manager.component.ts`
  - `movie-manager.component.html`
  - `movie-manager.component.scss`
  - `movie-manager.service.ts`
  - `movie-manager-routing.module.ts`

---

> [!CAUTION] Type postfixes (suffixes) like `.component`, `.service`, and `.directive` were removed as the default naming convention in Angular version 20.
> Following the release of a new Style Guide for 2025, the Angular CLI now defaults to shorter, more intentional file names:
> Components: `user-profile.component.ts` became `user-profile.ts`.
> Services: `auth.service.ts` became `auth.ts` or was renamed based on intent, such as `auth-api.ts`.
> Pipes & Directives: Similarly, the `.pipe` and `.directive` dots were removed from the default generation.

## 4) Angular Specific Naming

### Components

- **Class**: `PascalCase` + `Component`  
  Example: `MovieManagerComponent`
- **Selector**: `kebab-case` with feature prefix  
  Example: `app-movie-manager`
- **File**: `kebab-case` + `.component.ts`  
  Example: `movie-manager.component.ts`

### Directives

- **Class**: `PascalCase` + `Directive`  
  Example: `AutoFocusDirective`
- **Selector**: `camelCase` (attribute selector)  
  Example: `[autoFocus]`
- **File**: `kebab-case` + `.directive.ts`  
  Example: `auto-focus.directive.ts`

### Pipes

- **Class**: `PascalCase` + `Pipe`  
  Example: `DurationPipe`
- **Name**: `camelCase`  
  Example: `duration`
- **File**: `kebab-case` + `.pipe.ts`  
  Example: `duration.pipe.ts`

### Services

- **Class**: `PascalCase` + `Service`  
  Example: `MovieService`
- **File**: `kebab-case` + `.service.ts`  
  Example: `movie.service.ts`

### Modules

- **Class**: `PascalCase` + `Module`  
  Example: `MovieManagerModule`
- **File**: `kebab-case` + `.module.ts`  
  Example: `movie-manager.module.ts`

### Guards

- **Class**: `PascalCase` + `Guard`  
  Example: `AuthGuard`
- **File**: `kebab-case` + `.guard.ts`  
  Example: `auth.guard.ts`

### Interceptors

- **Class**: `PascalCase` + `Interceptor`  
  Example: `AuthInterceptor`
- **File**: `kebab-case` + `.interceptor.ts`  
  Example: `auth.interceptor.ts`

### Resolvers

- **Class**: `PascalCase` + `Resolver`  
  Example: `MovieResolver`
- **File**: `kebab-case` + `.resolver.ts`  
  Example: `movie.resolver.ts`

### Validators

- **Class**: `PascalCase` + `Validator`  
  Example: `EmailValidator`
- **File**: `kebab-case` + `.validator.ts`  
  Example: `email.validator.ts`

### NgRx (If Used)

- **Actions file**: `feature.actions.ts`
- **Reducer file**: `feature.reducer.ts`
- **Effects file**: `feature.effects.ts`
- **Selectors file**: `feature.selectors.ts`
- **State interface**: `FeatureState`
- **Action types**: `FeatureActionTypes`

---

## 5) Variables, Methods, and Functions

- **Variables**: `camelCase`  
  Example: `movieCount`, `isLoading`, `hasPermission`
- **Boolean variables**: prefix with `is`, `has`, `can`, `should`  
  Example: `isActive`, `hasError`, `canSave`, `shouldRetry`
- **Methods**: `camelCase` and verb-based  
  Example: `loadMovies()`, `saveMovie()`, `calculateTotal()`
- **Event handlers**: prefix with `on`  
  Example: `onSave()`, `onCancel()`, `onMovieSelected()`
- **Observables**: suffix with `$`  
  Example: `movies$`, `isLoading$`

---

## 6) Types, Interfaces, Enums, and Classes

- **Interfaces**: `PascalCase`  
  Example: `Movie`, `UserProfile`
- **Types**: `PascalCase`  
  Example: `MovieId`, `UserRole`
- **Enums**: `PascalCase`  
  Example: `UserStatus`, `MovieCategory`
- **Enum members**: `UPPER_SNAKE_CASE`  
  Example: `ACTIVE`, `ARCHIVED`
- **Classes**: `PascalCase`  
  Example: `Movie`, `MovieRepository`, `MovieManagerComponent`

---

## 7) Constants

- **File-level constants**: `UPPER_SNAKE_CASE`  
  Example: `DEFAULT_PAGE_SIZE`, `API_BASE_URL`
- **Readonly class properties**: `camelCase`  
  Example: `readonly maxItems = 10;`

---

## 8) Templates and Styles

- **Template variables**: `camelCase`  
  Example: `let movie of movies`, `#movieForm="ngForm"`
- **CSS classes**: `kebab-case`  
  Example: `.movie-card`, `.movie-card__title`
- **CSS ids**: `kebab-case`  
  Example: `#movie-list`

---

## 9) Naming Anti-Patterns (Avoid)

- **Do not** use prefixes on interfaces (e.g., `IMovie`) or classes (e.g., `CUser`).
- **Do not** use Hungarian notation or type in the name (e.g., `strName`).
- **Do not** use vague words like `data`, `value`, or `info` without a domain noun.

---

## 10) Quick Reference Table

| Item               | Case/Pattern               | Example                      |
| ------------------ | -------------------------- | ---------------------------- |
| Component class    | `PascalCase` + `Component` | `MovieManagerComponent`      |
| Component selector | `kebab-case`               | `app-movie-manager`          |
| Service class      | `PascalCase` + `Service`   | `MovieService`               |
| Directive selector | `camelCase` attribute      | `[autoFocus]`                |
| Pipe name          | `camelCase`                | `duration`                   |
| Interface          | `PascalCase`               | `Movie`                      |
| Enum member        | `UPPER_SNAKE_CASE`         | `ACTIVE`                     |
| Observable         | `camelCase` + `$`          | `movies$`                    |
| File name          | `kebab-case` + suffix      | `movie-manager.component.ts` |
