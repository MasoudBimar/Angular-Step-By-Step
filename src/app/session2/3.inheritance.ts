interface shape{
	draw():void;
	area(): void;

}

class square implements shape{

	draw(){
		console.log('drawwing');
	}

	area(){
		console.log('square calc area');
	}
}


class circle implements shape{
	draw(){
		console.log('drawwing');
	}

	area(){
		console.log('circle calc area');
	}
}

// class circle extends shape{
// 	draw(){
// 		console.log('drawwing');
// 	}

// 	area(){
// 		console.log('circle calc area');
// 	}
// }

let c : shape = new square();
c.area();
