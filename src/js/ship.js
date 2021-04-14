// @ts-check
import garbageManager from './garbageManager.js';
import collisionDetector from './collisionDetector.js';
import controller from './controller.js';
import Vector from './vector.js';
import Bullet from './bullet.js';

const ship = {
	size: 20,
	speed: null,
	position: null,
	acceleration: null,
	direction: 0,
	fireRateTimer: -1,
	fireRateTimerTreshold: 10,
	bullets: [],
	path : new Path2D(),
	
	canvas: null, // these kind of things aren't necessary (citation needed).
	canvasContext: null,
	
	init(canvas, canvasContext2D) {
		this.canvas = canvas;
		this.canvasContext = canvasContext2D;
		this.speed = new Vector(0, 0);
		this.position = new Vector(this.canvas.width / 2, this.canvas.height / 2);

		this.shape = [
			0, 
			-1.5 * (this.size / 2), 
			this.size / 2, 
			1.5 * (this.size / 2), 
			-this.size / 2, 
			1.5 * (this.size / 2)
		];
		
		controller.init();
		this.pathDrawing();
	},
	edgeDetect(position, canvas, size) {
			if (position.x > canvas.width + size) {
				position.x = -size;
			};
			if (position.x < -size) {
				position.x = canvas.width + size;
			};
			if (position.y > canvas.height + size) {
				position.y = -size;
			};
			if (position.y < -size) {
				position.y = canvas.height + size;
			};
	},
	keyHandling() {
		controller.activeKeys.forEach((activeKey) => {
			if (activeKey === 'ArrowUp' || activeKey === 'ArrowDown') {
				this.acceleration = Vector.fromAngle(this.direction);
				this.speed.add(this.acceleration);
				this.speed.multiply(controller.keys[activeKey]);
			} else if (activeKey === 'ArrowRight' || activeKey === 'ArrowLeft') {
				this.directionUpdate(controller.keys[activeKey] * 4); // returns 1 or -1
			} else if (activeKey === ' ') {
				this.fireRateTimer++;
				if (!(this.fireRateTimer % this.fireRateTimerTreshold)) {
					this.bullets.push(new Bullet());
				}
			} else {
				this.fireRateTimer = -1;
			}
		});
	},
	update() {
		this.keyHandling();
		
		this.speed.multiply(0.96);
		this.position.add(this.speed);

		this.canvasContext.fillStyle = '#FFF';
		this.bullets.forEach((bullet) => {
			bullet.update();
		});

		// edges looping //
		this.edgeDetect(this.position, this.canvas, this.size);

		this.draw();
	},
	directionUpdate(angle) {
		this.direction += angle * (Math.PI / 180);
	},
	draw() {
		this.canvasContext.save();
		this.canvasContext.translate(this.position.x, this.position.y);
		this.canvasContext.rotate(this.direction);
		// this.path.beginPath();
		this.canvasContext.stroke(this.path);
		this.canvasContext.restore();
	},
	pathDrawing() {
		// 30px high / 20px wide
		this.path.moveTo(this.shape[0], this.shape[1]);
		this.path.lineTo(this.shape[2], this.shape[3]);
		this.path.lineTo(this.shape[4], this.shape[5]);
		this.path.closePath();
	},
};

export default ship;
