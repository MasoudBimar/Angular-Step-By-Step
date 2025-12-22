// f1 = 1;
// f2 = 1,
// f(i) = f(i-1)+f(i-2);

function fib(num: number){

	let res:number = 0;
	let old: number = 1;
	let older: number = 1;
	if (num < 3) {
		console.log("res for "+num+" is ", 1 );
	} else {
		for (let index = 1; index <= num -2 ; index++) {   // first for									// second for
			res = old + older;							   // first for Old=1 & older = 1 => res = 2    // second for  res = 3
			older = old;								   // first for  older = 1 						// second for  older = 2
			old = res;									   // first for Old=2 							// second for old = 3
		}
		console.log("res for "+num+" is ", res );
	}


}

fib(16); // 987

function fib2(num: number): number{
	if (num < 3) {
		return 1;
	} else {
		return fib2(num-1) + fib2( num-2);
	}


}

let res2 = fib2(16); // 987
console.log("res for "+16+" is ",res2);

fib(1); // 1
fib(2); // 1
fib(3); // => f(2)+f(1) => 1+1 = 2
fib(4);

// 1,1,2,3,5,8,13,
