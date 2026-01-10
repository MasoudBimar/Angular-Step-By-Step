# TypeScript preliminaries

## Table of contents

- [Typescript Language Basics](#typescript-language-basics)
- [Functions as values (callbacks)](#functions-as-values-callbacks)
- [fibunacci function — loops and recursion](#fibunacci-function-loops-and-recursion)
- [Inheritance — interfaces and polymorphism](#inheritance-interfaces-and-polymorphism)
- [4.class.ts — classes, access modifiers, inheritance](#4classts-classes-access-modifiers-inheritance)
- [Takeaways](#takeaways)
- [For more information and resources check this repository main README.md Angular-Step-BY-Step](#for-more-information-and-resources-check-this-repository-main-readmemd-angular-step-by-step)

## Typescript Language Basics

### TypeScript is a superset of JavaScript: compile with `tsc` and run with Node.

### All ts code is valid js code

```bash

tsc main.ts # transpile ts code to js

code main.js # opening js file in vs code

node main.js # run js code with node

```

### Type annotations: `let count: number = 5;`

```ts
# Variable Declarations with Type Annotations
var number = 1;
let count = 2; // let supported in ES6

function testVar() {
  if (true) {
   let x = 1;
  }
  console.log('>>>>> ', x)
}

```

### `var` vs `let`: `var` is function-scoped, `let` is block-scoped.

### Type annotations catch errors at compile time (assigning a boolean/string to a `number`).

```ts
# Type checking with Type Annotations:
let a: number;

# Error: type 'boolean' is not assignable to type 'number'.
a = false; // raise error

let b: number;

# Error: type 'string' is not assignable to type 'number'.
b = "test"; // raise error
```

### Typed function parameters: `function log(message: string)`.

```ts
function log(message: string) {
  console.log(message);
}

var message = "hello world";

log(message);
```

### Type assertions: `(<string>value)` or `value as string`.

```ts
type assertion

let message2: string;
message2 = 'abc';
let isEndWithC = message2.endsWith('c');
let isEndWithB1 = (<string>message2).endsWith('c');
let isEndWithB2 = (message2 as string).endsWith('c');
```

### Arrow functions: `const doLog = (message: string) => { ... }`.

```ts
let log2 = function (message: any) {
  console.log(message);
};

let doLog = (message: string) => {
  console.log(message);
};

doLog("string"); // Lambda Expression in C#
```

## Functions as values (callbacks)

- Functions can be passed as parameters and executed inside another function.
- This pattern is the base for callbacks and event handlers.

```ts
function myFunc(func: any) {
  func();
}
```

## fibunacci function — loops and recursion

- Iterative Fibonacci uses a loop and rolling variables (`old`, `older`).
- Recursive Fibonacci uses a base case and returns a `number`.
- Shows both `console.log` output and return values.

```ts
// f1 = 1;
// f2 = 1,
// f(i) = f(i-1)+f(i-2);

function fib(num: number) {
  let res: number = 0;
  let old: number = 1;
  let older: number = 1;
  if (num < 3) {
    console.log("res for " + num + " is ", 1);
  } else {
    for (let index = 1; index <= num - 2; index++) {
      res = old + older;
      older = old;
      old = res;
    }
    console.log("res for " + num + " is ", res);
  }
}

fib(16); // 987

function fib2(num: number): number {
  if (num < 3) {
    return 1;
  } else {
    return fib2(num - 1) + fib2(num - 2);
  }
}

let res2 = fib2(16); // 987
console.log("res for " + 16 + " is ", res2);

fib(1); // 1
fib(2); // 1
fib(3); // => f(2)+f(1) => 1+1 = 2
fib(4);

// 1,1,2,3,5,8,13,
```

## Inheritance — interfaces and polymorphism

- `interface shape` defines a contract (`draw`, `area`).
- `square` and `circle` implement the interface.
- A variable typed as `shape` can point to any implementing class.

## 4.class.ts — classes, access modifiers, inheritance

- `Person` uses a constructor with `protected` fields and instance methods.
- Methods include simple validation/guard logic.
- `Student` extends `Person`, calls `super`, and adds a public field.
- `override` shows intent when redefining inherited members.
- Definite assignment `!` (`ssn!: number`) tells TS a property will be set.

```ts
class Person {
  ssn: string = "";

  constructor(protected fname: string, protected lastName: string, protected age: number) {}

  setName(name: string) {
    if (name && name.length > 0) {
      this.fname = name;
    } else {
      console.log(" Value is not valid ");
    }
  }

  greeting() {
    console.log("hi i am ", this.fname);
  }

  divide(a: number, b: number) {
    if (b !== 0) {
      let res = a / b;
      console.log(a + "divide by " + b + "=" + res);
    } else {
      console.log("inputs are not valid");
    }
  }
}

class Student extends Person {
  constructor(protected override fname: string, protected override lastName: string, protected override age: number, public sNumber: number) {
    super(fname, lastName, age);
  }
}

let s1: Student = new Student("a", "b", 12, 1234567);
// s1.setName()

class person {
  ssn!: number;
}
```

```ts
interface shape {
  draw(): void;
  area(): void;
}

class square implements shape {
  draw() {
    console.log("drawwing");
  }

  area() {
    console.log("square calc area");
  }
}

class circle implements shape {
  draw() {
    console.log("drawwing");
  }

  area() {
    console.log("circle calc area");
  }
}

class circle extends shape {
  draw() {
    console.log("drawwing");
  }

  area() {
    console.log("circle calc area");
  }
}

let c: shape = new square();
c.area();
```

## Takeaways

- Type annotations and assertions improve safety without changing runtime behavior.
- Interfaces describe shape; classes implement behavior.
- Inheritance and access modifiers help model reusable object hierarchies.

## For more information and resources check this repository main README.md Angular-Step-BY-Step

[[Typescript-Step-BY-Step](src/app/1.getting-started//README.md)](https://github.com/MasoudBimar/Typescript-Step-by-Step)

Next Section : [Angular Fundamentals](/src/app/3-angular-fundamentals/README.md)


