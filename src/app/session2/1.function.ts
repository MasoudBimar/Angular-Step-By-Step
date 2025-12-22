function myFunc(func: any) {
  func();
}


function anotherFunc() {
  console.log("hi im inside another func");
}

myFunc(anotherFunc);
