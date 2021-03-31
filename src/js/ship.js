// @ts-check
import controller from "./controller.js";
import Vector from "./vector.js";

const ship = {
	size: 20,
	speed: null,
	position: null,
	acceleration: null,
	direction: 0,
	canvas: null, // these kind of things aren't necessary
	canvasContext: null,

	init(canvas, canvasContext2D) {
		this.canvas = canvas;
		this.canvasContext = canvasContext2D;
		this.speed = new Vector(0, 0);
		this.position = new Vector(this.canvas.width / 2, this.canvas.height / 2);
		this.acceleration = new Vector(5, 5);

		controller.init();
	},
	update() {
		controller.activeKeys.forEach((activeKey) => {
			if (activeKey === 'ArrowUp' || activeKey === 'ArrowDown') {
				this.speed.add(this.acceleration) * controller.keys[activeKey];
				console.log('up down');
			} else if (activeKey === 'ArrowRight' || activeKey === 'ArrowLeft') {
				this.directionUpdate(controller.keys[activeKey]); // returns 1 or -1
				console.log('left right');
			}
		});
		this.position.add(this.speed);

		// edges looping //
		if (this.position.x > this.canvas.width + this.size) {
			this.position.x = -this.size;
		};
		if (this.position.x < -this.size) {
			this.position.x = this.canvas.width + this.size;
		};
		if (this.position.y > this.canvas.height + this.size) {
			this.position.y = -this.size;
		};
		if (this.position.y < -this.size) {
			this.position.y = this.canvas.height + this.size;
		};

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