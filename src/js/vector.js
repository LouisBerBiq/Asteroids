// @ts-check
export default class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	multiply(factor) {
		this.x *= factor;
		this.y *= factor;
	}
	static fromAngle(angle, magnitude) { 
		/* note for self: this is a class method, contrary to instance methods, it doesn't modify properties of the objects being passed.
	 static = is not bundled with each instance ??
	 note for later, learn -> and :: in php */
		let magn = 1;
		if (magnitude !== undefined) {
			magn = magnitude;
		}

		return new Vector(magn * Math.cos(angle - Math.PI/2), magn * Math.sin(angle - Math.PI/2));
	}
}