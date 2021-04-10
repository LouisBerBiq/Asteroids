// @ts-check

import ship from './ship.js';
import Vector from './vector.js';

export default class Bullet {
	constructor() {
		this.canvasContext = ship.canvasContext;
		this.position = new Vector(ship.position.x, ship.position.y); //because Vector is an object, when you assign it, you're making a reference and not a new value.
		this.direction = ship.direction;
		this.speed = new Vector(ship.speed.x, ship.speed.y);
		this.acceleration = Vector.fromAngle(this.direction, 10);

		this.size = 10;
	}
	update() {
		this.speed.add(this.acceleration);
		this.position.add(this.speed);

		this.draw();
	}
	draw() {
		this.canvasContext.save();
		this.canvasContext.translate(this.position.x, this.position.y);
		this.canvasContext.rotate(this.direction);
		this.canvasContext.beginPath();
		this.canvasContext.fillRect(-this.size/2, -this.size/2, this.size/2, this.size/2);
		this.canvasContext.closePath();
		this.canvasContext.stroke();
		this.canvasContext.restore();
	}
}