class Person {
	ssn:string='';

	constructor(protected fname: string,protected lastName:string,protected age: number){

	}

	setName(name:string){
		if (name && name.length > 0) {
			this.fname = name;
		} else{
			console.log("مقدار وارد شده معتبر نمی باشد" );
		}
	}

	greeting(){
		console.log("hi i am ", this.fname );
	}

	divide(a:number, b:number) {
		if (b !== 0) {
			let res =  a/b;
			console.log(a + "divide by " + b +"=" + res );
		} else {
			console.log("inputs are not valid" );
		}
	}
}


class Student extends Person {

	constructor(protected override fname: string,protected override lastName:string,protected override age: number,public sNumber:number){
		super(fname, lastName, age);
	}
}

let s1 : Student = new Student("a", "b", 12, 1234567);
// // s1.setName()

class person {
  ssn!: number;
}
