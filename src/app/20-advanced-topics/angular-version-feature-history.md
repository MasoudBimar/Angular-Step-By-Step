# Angular Version Feature History

## Angular 2

Released: September 14, 2016. Angular 2 was a complete rewrite of AngularJS and based on ECMAScript 2015 (ES6).

Highlights:

- Semantic versioning
- Written entirely in TypeScript
- Server-side rendering (SSR)
- Angular Mobile Toolkit (AMT)
- Command-line interface (CLI)
- Components

## Angular 3 (skipped)

Angular 3 was skipped due to version mismatches between @angular/core, @angular/compiler, and @angular/router.

At the time, @angular/router was already in a 3.x version because of ongoing router work (for example, route preloading).

To avoid confusion, the team skipped version 3 and released 4.0.0 so the major versions would align.

## Angular 4

Released: March 23, 2017.

Version 3 was skipped entirely in order to unify the major versions of the Angular packages that had been developed separately until that date.

Highlights:

- Ahead-of-time (AOT) compilation
- Animations moved to a separate npm package
- Faster compilation
- Smaller generated code (around 60% in some cases)

## Angular 5

Released: November 1, 2017. Angular 5 featured TypeScript 2.3 support.

Highlights:

- New HttpClient API
- Universal State Transfer API and DOM support
- New router events for more granular control over the HTTP lifecycle
- Compiler improvements
- Build optimizer

## Angular 6

Released: May 2018. Angular 6 was mostly a maintenance release focused on improving the overall consistency of the framework and its toolchain.

Highlights:

- New CLI `ng add` and `ng update` commands, plus CLI workspaces
- Angular Elements
- Component Dev Kit (CDK)
- Angular Material, Schematics, library support, and RxJS 6
- Ivy renderer announced as the next-generation engine

## Angular 7

Released: October 2018. Angular 7 was a major update.

Highlights:

- CLI update and prompts
- Angular Material and CDK (virtual scrolling and drag and drop)
- Performance improvements and smaller bundles
- Updated dependencies (TypeScript 3.1, RxJS 6.3, and Node 10)

## Angular 8

Released: May 28, 2019.

This release was mostly about Ivy, the long-awaited new compiler/runtime.

Version 8 was the first one to officially offer a runtime switch to opt in to Ivy, which became the default runtime starting from Angular 9.

Highlights:

- Bazel support (build and test tool)
- Routing updates and new lazy-loading syntax (dynamic imports)
- Service workers
- Workspace API

## Angular 9

Released: February 2020 after a long streak of release candidates through 2019 Q4.

Highlights:

- Ivy compiler and runtime enabled by default
- Smaller bundle sizes and faster builds
- Improved debugging and build errors
- AOT on by default
- Improved internationalization
- TypeScript 3.7 support

## Angular 10

Released: June 2020. This is a smaller release compared to other major releases.

Highlights:

- Angular Material date range picker
- Warnings about CommonJS imports to avoid larger, slower bundles
- TypeScript 3.9 support

## Angular 11

Released: November 2020. This version shipped with bug fixes and some new features.

Highlights:

- Hot Module Replacement (HMR) updates
- Experimental webpack 5 support
- Faster builds
- TSLint deprecated
- Removed support for IE9, IE10, and IE Mobile

## Angular 12

Released: May 2021.

Highlights:

- Passing context to HTTP interceptors
- Tailwind CSS support
- Nullish coalescing in templates
- Ivy-based language service on by default
- IE11 support deprecated

## Angular 13

Released: November 2021.

Highlights:

- Dynamic component creation without ComponentFactoryResolver
- RxJS 7.4
- TypeScript 4.4 support
- Removal of View Engine (100% Ivy)

## Angular 14

Released: June 2022.

Highlights:

- Standalone components (developer preview)
- Typed forms

## Angular 15

Released: November 2022.

Highlights:

- Standalone APIs stabilized (components, directives, pipes, and bootstrap)
- Functional router guards and resolvers
- Directive composition API
- NgOptimizedImage stable
- MDC-based Angular Material components

## Angular 16

Released: May 2023.

Highlights:

- Signals (developer preview)
- Required inputs
- RxJS interoperability helpers
- Improved SSR with hydration (developer preview)
- TypeScript 5.0 support

## Angular 17 -- Angular Renaissance( french word means rebirth)

Released: November 2023.

Highlights:

- Built-in control flow (`@if`, `@for`, `@switch`)
- Deferrable views (`@defer`) for lazy loading
- New application builder using Vite and esbuild
- New projects default to standalone APIs
- SSR and hydration improvements

## Angular 18

Released: May 2024.

Highlights:

- Stabilizing the new control flow and deferrable views
- Build and tooling performance improvements
- SSR and hydration refinements

## Angular 19

Released: November 19, 2024.

Highlights:

- Signals as the default for state management
- Signal-based router integration
- Functional dependency injection with improved `inject()` capabilities
- New `linkedSignal()` for synchronized state
- Enhanced Resource API for data loading
- Improved Angular DevTools with signal debugging
- TypeScript 5.3+ support

## Angular 20

Released: May 28, 2025.

Highlights:

- Signal stability and performance enhancements
- New `linkedSignal()` and `resource()` APIs expanded
- Improved tree-shaking and bundle optimization
- Enhanced error messages and diagnostics
- Material 3 design system improvements
- Experimental zone-less change detection
- TypeScript 5.4+ support

## Angular 21

Released: November 19, 2025.

Highlights:

- Zone.js optional for better performance and smaller bundles
- Signal-driven Angular Material components
- Enhanced hydration for SSR applications
- New directives for improved accessibility
- Streamlined dependency injection patterns
- Unified signal and observable composition
- TypeScript 5.6+ support
- Improved developer experience with better compiler diagnostics
