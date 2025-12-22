// code main.ts

// =============================================

function log(message: string) {
  console.log(message);

}



var message = "hello world";

log(message);

// ============================================= all ts code is valid js code

// tsc main.ts

// code main.js

// node main.js

// ============================================= Variable Declaration

var number = 1;
let count = 2; // let supported in ES6

function testVar() {

  if (true) {
    var x = 1;
  }

  console.log('>>>>> ', x)

}


// ============================================= Type Annotations

let a: number;

a = false;  // raise error

let b: number;

b = 'test'; // raise error

// =============================================type assertion

let message2: string;
message2 = 'abc';
let isEndWithC = message2.endsWith('c');
let isEndWithB1 = (<string>message2).endsWith('c');
let isEndWithB2 = (message2 as string).endsWith('c');

// =============================================arrow function


let log2 = function (message: any) {
  console.log(message);
}

let doLog = (message: string) => {
  console.log(message);
}

doLog('string'); // Lambda Expression in C#

// ============================================= Interfaces

// create interface for object parrameter


//================================================== class


//================================================== class => new Person();

//================================================== class => constructor();

//================================================== class => constructor(); nullable params

//================================================== class => Access Modifiers {public, private, protected}

//================================================== class => Access Modifiers in Cons Param {public, private, protected}

//================================================== class => Properties get & set

//================================================== class => Export / Module













