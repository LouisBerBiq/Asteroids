const ship = {
	size: 20,
	speed: 1,
	position: {
		x: 0,
		y: 0
	},
	canvas: null, // these kind of things aren't necessary
	canvasContext: null,

	init(canvas, canvasContext2D) {
		this.canvas = canvas;
		this.canvasContext = canvasContext2D;
		this.position.x = this.canvas.width / 2;
	},
	update() {
		this.position.x += this.speed;
		// if (this.position.x > canvas.width) {
			
		// }
		this.draw();
	},
	draw() {
		// 30px high / 20px wide
		this.canvasContext.save();
		this.canvasContext.translate(this.position.x, this.position.y);
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