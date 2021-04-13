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

		this.position = new Vector(this.canvas.width / 2, this.canvas.height / 2);
		this.scale = 6;

		this.update();
	}
	decompose() {

	}
	update() {
		this.draw();
	}
	draw() {
		this.canvasContext.save();
		this.canvasContext.translate(this.position.x, this.position.y);
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(this.shape[0] * this.scale, this.shape[1] * this.scale);
		// doing this since getting the length of an array can be expensive
		let i = 2;
		const shapeVerticesCount = this.shape.length;
		while (i < shapeVerticesCount) {
			this.canvasContext.lineTo(this.shape[i] * this.scale, this.shape[i + 1] * this.scale);
			i += 2;
		}
		this.canvasContext.closePath();
		this.canvasContext.stroke();
		this.canvasContext.restore();
	}
}

/*
Note to self :
++i increments i before reading it
i++ "consume" i before incrementing it
*/