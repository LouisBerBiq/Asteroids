// @ts-check
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
	shootingSound: new Audio('../sounds/bullet.wav'),
	canvas: null, // these kind of things aren't necessary (citation needed).
	canvasContext: null,

	init(canvas, canvasContext2D) {
		this.canvas = canvas;
		this.canvasContext = canvasContext2D;
		this.speed = new Vector(0, 0);
		this.position = new Vector(this.canvas.width / 2, this.canvas.height / 2);

		controller.init();
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
	DiscardBullets(bullet) {
		this.bullets.splice(this.bullets.indexOf(bullet), 1);
	},
	keyHandling() {
		controller.activeKeys.forEach((activeKey) => {
			if (activeKey === 'ArrowUp' || activeKey === 'ArrowDown') {
				this.acceleration = Vector.fromAngle(this.direction);
				this.speed.add(this.acceleration);
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
		// 30px high / 20px wide
		this.canvasContext.save();
		this.canvasContext.translate(this.position.x, this.position.y);
		this.canvasContext.rotate(this.direction);
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(0, -1.5 * (this.size / 2));
		this.canvasContext.lineTo(this.size / 2, 1.5 * (this.size / 2));
		this.canvasContext.lineTo(-this.size / 2, 1.5 * (this.size / 2));
		this.canvasContext.closePath();
		this.canvasContext.stroke();
		this.canvasContext.restore();
	},
};

export default ship;
