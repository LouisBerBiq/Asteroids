// @ts-check
import garbageManager from './garbageManager.js';
import ship from './ship.js';
import Vector from './vector.js';
import asteroidModels from './asteroidModels.js';
export default class Asteroid {
	constructor(canvasContext, canvas) {
		this.canvasContext = canvasContext;
		this.canvas = canvas;

		const possibleShapes = asteroidModels.length;
		const i = Math.floor(Math.random() * possibleShapes);
		this.shape = asteroidModels[i];
		this.path = new Path2D();
		
		this.position = new Vector(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
		this.scale =  (4 + Math.random() * 10);
		this.direction = Math.random() * Math.PI * 2;
		this.speed = new Vector(0, 0);
		this.acceleration = Vector.fromAngle(this.direction, .5 + Math.random() * 2);
		this.speed.add(this.acceleration);
		
		this.pathDrawing();
		this.update();
	}
	edgeDetect(position, canvas, size) {
		const sizeOffset = 50;
		if (position.x > canvas.width + sizeOffset) {
			position.x = -sizeOffset;
		};
		if (position.x < -sizeOffset) {
			position.x = canvas.width + sizeOffset;
		};
		if (position.y > canvas.height + sizeOffset) {
			position.y = -sizeOffset;
		};
		if (position.y < -sizeOffset) {
			position.y = canvas.height + sizeOffset;
		};
	}
	decompose() {

	}
	update() {
		this.position.add(this.speed);
		this.draw();

		this.edgeDetect(this.position, this.canvas, this.scale);
	}
	draw() {
		this.canvasContext.save();
		this.canvasContext.translate(this.position.x, this.position.y);
		this.canvasContext.rotate(this.direction);
		this.canvasContext.stroke(this.path);
		this.canvasContext.restore();
	}
	pathDrawing() {
		this.path.moveTo(this.shape[0] * this.scale, this.shape[1] * this.scale);
		// doing this since getting the length of an array can be expensive
		let i = 2;
		const shapeVerticesCount = this.shape.length;
		while (i < shapeVerticesCount) {
			this.path.lineTo(this.shape[i] * this.scale, this.shape[i + 1] * this.scale);
			i += 2;
		}
		this.path.closePath();
	}
}

/*
Note to self :
++i increments i before reading it
i++ "consume" i before incrementing it
*/